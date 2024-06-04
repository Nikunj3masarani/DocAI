import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { message } from "antd";
import * as React from "react";
import { IStatus, ITextGeneratorConfig, IVizConfig } from "../../types";
import { fetchJSON, getLocalStorage, scrollToElement } from "../../utils";
import DatasetSelectorView from "./upload/datasetupload";
import GeneratorControlsView from "./controls";

const GenerateView = () => {
  const [loading, setLoading] = React.useState(false);

  const initTextGenerationConfig: ITextGeneratorConfig = {
    temperature: 0,
    n: 1,
    model: "gpt-3.5-turbo-0301",
    max_tokens: null,
    provider: "openai",
  };

  const initModels = {
    openai: {
      name: "OpenAI",
      models: [
        {
          name: "gpt-3.5-turbo-0301",
          max_tokens: 4096,
        },
      ],
    },
  };
  const [models, setModels] = React.useState<{} | null>(initModels);
  const serverUrl = process.env.GATSBY_API_URL;

  const initVizConfig: IVizConfig = getLocalStorage("lida_viz_config") || {
    goal: null,
    summary: null,
    library: "seaborn",
    textgen_config: initTextGenerationConfig,
  };

  const summaryDivRef = React.useRef<HTMLDivElement>(null);

  // const [config, setConfig] = React.useState(initConfig);
  const [vizConfig, setVizConfig] = React.useState(initVizConfig);
  const [vizspecs, setVizspecs] = React.useState<[] | null>(null);
  const [error, setError] = React.useState<null | IStatus>(null);

  React.useEffect(() => {
    // console.log("vizconfig summary updated", vizConfig);
    if (vizConfig.summary === null) {
      scrollToElement(summaryDivRef);
      setVizspecs(null);
    }
  }, [vizConfig.summary]);

  const fetchModels = () => {
    setError(null);
    setLoading(true);
    const payLoad = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const onSuccess = (data: any) => {
      if (data && data.status) {
        // console.log("Models data", data);
        setModels(data.data);
      } else {
        // message.error(data.message);
        // setError(data);
        console.log("Error fetching models", data);
      }
      setLoading(false);
    };
    const onError = (err: any) => {
      // message.error(err.message);
      setLoading(false);
      // setError(err);
      console.log("Error fetching models", err);
    };
    fetchJSON(`${serverUrl}/models`, payLoad, onSuccess, onError);
  };

  React.useEffect(() => {
    fetchModels();
  }, []);

  return (
    <div className="">
      <GeneratorControlsView
        config={{
          vizConfig: vizConfig,
          setVizConfig: setVizConfig,
        }}
        models={models}
      />{" "}
      <div ref={summaryDivRef}>
        <DatasetSelectorView
          config={{
            vizConfig: vizConfig,
            setVizConfig: setVizConfig,
            error: error,
            setError: setError,
          }}
        />
      </div>
      {error && !error.status && (
        <div className="mt-6">
          {" "}
          <div className="font-semibold  pb-1 mb-2 text-red-400">
            <ExclamationCircleIcon className="inline-block h-6 w-6 -mt-1" /> An
            error occurred. Please try again later.
          </div>
          <div className="text-secondpary border-red-400 border rounded bg-secondary p-2 px-3">
            {" "}
            {error.message}.
          </div>
        </div>
      )}
    </div>
  );
};
export default GenerateView;
