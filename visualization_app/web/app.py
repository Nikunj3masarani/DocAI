import json
import os
import logging
import requests
from fastapi import FastAPI, UploadFile
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import traceback

from llmx import llm, providers, TextGenerationConfig
from lida.datamodel import GoalWebRequest, SummaryUrlRequest, UploadUrl, VisualizeEditWebRequest, \
    VisualizeEvalWebRequest, VisualizeExplainWebRequest, VisualizeRecommendRequest, VisualizeRepairWebRequest, \
    VisualizeWebRequest, InfographicsRequest
from lida.components import Manager
from dotenv import load_dotenv


load_dotenv()

def get_app() -> FastAPI:
    # instantiate model and generator
    logger = logging.getLogger("lida_app")
    api_docs = os.environ.get("LIDA_API_DOCS", "False") == "True"
    models = [os.environ['MODEL_NAME']]
    text_gen = llm(
        provider="openai",
        api_type="azure",
        azure_endpoint=os.environ["OPENAI_API_BASE"],
        api_key=os.environ["OPENAI_API_KEY"],
        api_version=os.environ['OPENAI_API_VERSION']
    )

    lida = Manager(text_gen=text_gen)
    app = FastAPI()
    # allow cross origin requests for testing on localhost:800* ports only
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],

    )
    api = FastAPI(root_path="/api", docs_url="/docs" if api_docs else None, redoc_url=None)
    app.mount("/api", api)

    root_file_path = os.path.dirname(os.path.abspath(__file__))
    static_folder_root = os.path.join(root_file_path, "react-app/public")

    # TODO: Revert this to the original 'ui' once everything is fully functional
    files_static_root = os.path.join(root_file_path, "files/")
    data_folder = os.path.join(root_file_path, "files/data")
    os.makedirs(data_folder, exist_ok=True)
    os.makedirs(files_static_root, exist_ok=True)
    os.makedirs(static_folder_root, exist_ok=True)

    # mount lida_app front end UI files
    app.mount("/", StaticFiles(directory=static_folder_root, html=True), name="ui")
    api.mount("/files", StaticFiles(directory=files_static_root, html=True), name="files")

    # def check_model

    @api.post("/visualize")
    async def visualize_data(req: VisualizeWebRequest) -> dict:
        """Generate goals given a dataset summary"""
        try:
            # print(req.textgen_config)
            charts = lida.visualize(
                summary=req.summary,
                goal=req.goal,
                textgen_config=req.textgen_config if req.textgen_config else TextGenerationConfig(
                    model= models[0]
                ),
                library=req.library, return_error=True)
            print("found charts: ", len(charts), " for goal: ")
            if len(charts) == 0:
                return {"status": False, "message": "No charts generated"}
            return {"status": True, "charts": charts,
                    "message": "Successfully generated charts."}

        except Exception as exception_error:
            logger.error(f"Error generating visualization goals: {str(exception_error)}")
            return {"status": False,
                    "message": f"Error generating visualization goals. {str(exception_error)}"}

    @api.post("/visualize/edit")
    async def edit_visualization(req: VisualizeEditWebRequest) -> dict:
        """Given a visualization code, and a goal, generate a new visualization"""
        try:
            textgen_config = req.textgen_config if req.textgen_config else TextGenerationConfig(
                model=models[0]
            )
            charts = lida.edit(
                code=req.code,
                summary=req.summary,
                instructions=req.instructions,
                textgen_config=textgen_config,
                library=req.library, return_error=True)

            # charts = [asdict(chart) for chart in charts]
            if len(charts) == 0:
                return {"status": False, "message": "No charts generated"}
            return {"status": True, "charts": charts,
                    "message": f"Successfully edited charts."}

        except Exception as exception_error:
            logger.error(f"Error generating visualization edits: {str(exception_error)}")
            print(traceback.print_exc())
            return {"status": False,
                    "message": f"Error generating visualization edits."}

    @api.post("/visualize/repair")
    async def repair_visualization(req: VisualizeRepairWebRequest) -> dict:
        """ Given a visualization goal and some feedback, generate a new visualization that addresses the feedback"""

        try:

            charts = lida.repair(
                code=req.code,
                feedback=req.feedback,
                goal=req.goal,
                summary=req.summary,
                textgen_config=req.textgen_config if req.textgen_config else TextGenerationConfig(
                    model=models[0]
                ),
                library=req.library,
                return_error=True
            )

            if len(charts) == 0:
                return {"status": False, "message": "No charts generated"}
            return {"status": True, "charts": charts,
                    "message": "Successfully generated chart repairs"}

        except Exception as exception_error:
            logger.error(f"Error generating visualization repairs: {str(exception_error)}")
            return {"status": False,
                    "message": f"Error generating visualization repairs."}

    @api.post("/visualize/explain")
    async def explain_visualization(req: VisualizeExplainWebRequest) -> dict:
        """Given a visualization code, provide an explanation of the code"""
        textgen_config = req.textgen_config if req.textgen_config else TextGenerationConfig(
            n=1,
            temperature=0,
            model= models[0]
        )

        try:
            explanations = lida.explain(
                code=req.code,
                textgen_config=textgen_config,
                library=req.library)
            return {"status": True, "explanations": explanations[0],
                    "message": "Successfully generated explanations"}

        except Exception as exception_error:
            logger.error(f"Error generating visualization explanation: {str(exception_error)}")
            return {"status": False,
                    "message": f"Error generating visualization explanation."}

    @api.post("/visualize/evaluate")
    async def evaluate_visualization(req: VisualizeEvalWebRequest) -> dict:
        """Given a visualization code, provide an evaluation of the code"""

        try:
            evaluations = lida.evaluate(
                code=req.code,
                goal=req.goal,
                textgen_config=req.textgen_config if req.textgen_config else TextGenerationConfig(
                    n=1,
                    temperature=0,
                    model= models[0]
                ),
                library=req.library)[0]
            return {"status": True, "evaluations": evaluations,
                    "message": "Successfully generated evaluation"}

        except Exception as exception_error:
            logger.error(f"Error generating visualization evaluation: {str(exception_error)}")
            return {"status": False,
                    "message": f"Error generating visualization evaluation. {str(exception_error)}"}

    @api.post("/visualize/recommend")
    async def recommend_visualization(req: VisualizeRecommendRequest) -> dict:
        """Given a dataset summary, generate a visualization recommendations"""

        try:
            textgen_config = req.textgen_config if req.textgen_config else TextGenerationConfig(
                model=models[0]
            )
            charts = lida.recommend(
                summary=req.summary,
                code=req.code,
                textgen_config=textgen_config,
                library=req.library,
                return_error=True)

            if len(charts) == 0:
                return {"status": False, "message": "No charts generated"}
            return {"status": True, "charts": charts,
                    "message": "Successfully generated chart recommendation"}

        except Exception as exception_error:
            logger.error(f"Error generating visualization recommendation: {str(exception_error)}")
            return {"status": False,
                    "message": f"Error generating visualization recommendation."}

    @api.post("/text/generate")
    async def generate_text(textgen_config: TextGenerationConfig) -> dict:
        """Generate text given some prompt"""

        try:
            completions = text_gen.generate(textgen_config)
            return {"status": True, "completions": completions.text}
        except Exception as exception_error:
            logger.error(f"Error generating text: {str(exception_error)}")
            return {"status": False, "message": f"Error generating text."}

    @api.post("/goal")
    async def generate_goal(req: GoalWebRequest) -> dict:
        """Generate goals given a dataset summary"""
        try:
            textgen_config = req.textgen_config if req.textgen_config else TextGenerationConfig(
                model=models[0]
            )
            goals = lida.goals(req.summary, n=req.n, textgen_config=textgen_config)
            return {"status": True, "data": goals,
                    "message": f"Successfully generated {len(goals)} goals"}
        except Exception as exception_error:
            logger.error(f"Error generating goals: {str(exception_error)}")
            # Check for a specific error message related to context length
            if "context length" in str(exception_error).lower():
                return {
                    "status": False,
                    "message": "The dataset you uploaded has too many columns. Please upload a dataset with fewer columns and try again."
                }

            # For other exceptions
            return {
                "status": False,
                "message": f"Error generating visualization goals. {exception_error}"
            }

    @api.post("/summarize")
    async def upload_file(file: UploadFile):
        """ Upload a file and return a summary of the data """
        # allow csv, excel, json
        allowed_types = ["text/csv", "application/vnd.ms-excel", "application/json"]

        # print("file: ", file)
        # check file type
        if file.content_type not in allowed_types:
            return {"status": False,
                    "message": f"Uploaded file type ({file.content_type}) not allowed. Allowed types are: csv, excel, json"}

        try:

            # save file to files folder
            file_location = os.path.join(data_folder, file.filename)
            # open file without deleting existing contents
            with open(file_location, "wb+") as file_object:
                file_object.write(file.file.read())

            # summarize
            textgen_config = TextGenerationConfig(n=1, temperature=0, model= models[0])
            summary = lida.summarize(
                data=file_location,
                file_name=file.filename,
                summary_method="llm",
                textgen_config=textgen_config)
            return {"status": True, "summary": summary, "data_filename": file.filename}
        except Exception as exception_error:
            logger.error(f"Error processing file: {str(exception_error)}")
            return {"status": False, "message": f"Error processing file."}

    # upload via url
    @api.post("/summarize/url")
    async def upload_file_via_url(req: SummaryUrlRequest) -> dict:
        """ Upload a file from a url and return a summary of the data """
        url = req.url
        textgen_config = req.textgen_config if req.textgen_config else TextGenerationConfig(
            n=1, temperature=0, model= models[0])
        file_name = url.split("/")[-1]
        file_location = os.path.join(data_folder, file_name)

        # download file
        url_response = requests.get(url, allow_redirects=True, timeout=1000)
        open(file_location, "wb").write(url_response.content)
        try:

            summary = lida.summarize(
                data=file_location,
                file_name=file_name,
                summary_method="llm",
                textgen_config=textgen_config)
            return {"status": True, "summary": summary, "data_filename": file_name}
        except Exception as exception_error:
            # traceback.print_exc()
            logger.error(f"Error processing file: {str(exception_error)}")
            return {"status": False, "message": f"Error processing file."}

    # convert image to infographics

    @api.post("/infographer")
    async def generate_infographics(req: InfographicsRequest) -> dict:
        """Generate infographics using the peacasso package"""
        try:
            result = lida.infographics(
                visualization=req.visualization,
                n=req.n,
                style_prompt=req.style_prompt
                # return_pil=req.return_pil
            )
            return {"status": True, "result": result, "message": "Successfully generated infographics"}
        except Exception as exception_error:
            logger.error(f"Error generating infographics: {str(exception_error)}")
            return {"status": False,
                    "message": f"Error generating infographics. {str(exception_error)}"}

    # list supported models

    @api.get("/models")
    def list_models() -> dict:
        return {"status": True, "data": providers, "message": "Successfully listed models"}

    return app
