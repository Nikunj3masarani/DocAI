import * as React from "react";
import {
  AcademicCapIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { IStatus, IVizConfig } from "../../types";
import { Skeleton, message } from "antd";
import { fetchJSON, mapNumberToColor, scrollToElement } from "../../utils";
import { LoadBox } from "../../atoms";
import EvalRadarPlot from "./evalradar";

const ChartEvaluator = ({
  vizData,
  setVizData,
  vizConfig,
}: {
  vizData: any;
  setVizData: any;
  vizConfig: IVizConfig;
}) => {
  let initEval = [
    {
      dimension: "bugs",
      score: 3,
      rationale:
        "The code is free of any bugs, syntax errors, or typos. The code is well-structured and easy to read.",
    },
    {
      dimension: "transformation",
      score: 10,
      rationale:
        "The data is not transformed as it is already in the appropriate format for the histogram visualization.",
    },
    {
      dimension: "compliance",
      score: 6,
      rationale:
        "The code meets the specified visualization goals of showing the distribution of daily closing prices of the S&P 500 index.",
    },
    {
      dimension: "type",
      score: 10,
      rationale:
        "The histogram visualization is appropriate for showing the distribution of a single variable, which is the daily closing price of the S&P 500 index.",
    },
    {
      dimension: "encoding",
      score: 8,
      rationale:
        "The data is encoded appropriately for the histogram visualization, with the x-axis representing the daily closing price of the S&P 500 index and the y-axis representing the frequency of occurrence.",
    },
    {
      dimension: "aesthetics",
      score: 1,
      rationale:
        "The aesthetics of the visualization are appropriate for the histogram type, with the blue color representing the distribution of the data, and the red and green dashed lines representing the mean and median values, respectively. The labels and ticks are also appropriately placed and rotated for readability.",
    },
  ];
  initEval = [];
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loadingRepair, setLoadingRepair] = React.useState<boolean>(false);
  const [error, setError] = React.useState<null | IStatus>(null);
  const [evaluations, setEvaluations] = React.useState<any[]>(initEval);
  const serverUrl = process.env.GATSBY_API_URL;
  const [selectedEvaluation, setSelectedEvaluation] = React.useState<number>(0);

  const evaluationsDivRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setEvaluations(initEval);
    setSelectedEvaluation(0);
  }, [vizData]);

  const fetchEvaluation = () => {
    setError(null);
    setLoading(true);
    setEvaluations([]);
    setTimeout(() => {
      scrollToElement(evaluationsDivRef);
    }, 600);
    const data = {
      code: vizData.code,
      goal: vizConfig.goal,
      textgen_config: vizConfig.textgen_config,
      library: vizConfig.library,
    };
    const payLoad = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const onSuccess = (data: any) => {
      if (data && data.status) {
        // setVizspecs(data.charts);
        // console.log("Evaluation data", data);
        setEvaluations(data.evaluations);
        message.success(data.message);
        setTimeout(() => {
          scrollToElement(evaluationsDivRef);
        }, 400);
      } else {
        message.error(data.message);
        setError(data);
      }
      setLoading(false);
    };
    const onError = (err: any) => {
      message.error(err.message);
      setLoading(false);
      setError(err);
    };
    fetchJSON(`${serverUrl}/visualize/evaluate`, payLoad, onSuccess, onError);
  };

  const repairChart = () => {
    setError(null);
    setLoadingRepair(true);
    setTimeout(() => {
      scrollToElement(evaluationsDivRef);
    }, 600);
    const data = {
      code: vizData.code,
      feedback: evaluations,
      textgen_config: vizConfig.textgen_config,
      library: vizConfig.library,
      summary: vizConfig.summary,
      goal: vizConfig.goal,
    };
    const payLoad = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const onSuccess = (data: any) => {
      if (data && data.status) {
        // setVizspecs(data.charts);
        console.log("Repair data", data);
        // setEvaluations(data.evaluations);
        setVizData(data.charts[0]);
        message.success(data.message);
        setTimeout(() => {
          scrollToElement(evaluationsDivRef);
        }, 400);
      } else {
        message.error(data.message);
        setError(data);
      }
      setLoadingRepair(false);
    };
    const onError = (err: any) => {
      message.error(err.message);
      setLoadingRepair(false);
      setError(err);
    };
    fetchJSON(`${serverUrl}/visualize/repair`, payLoad, onSuccess, onError);
  };

  const getStarRating = (score: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < score) {
        stars.push(
          <StarIcon
            key={"starticon" + i}
            className="w-4 h-4 text-yellow-500 inline-block"
          />
        );
      } else {
        stars.push(
          <StarIcon
            key={"starticon" + i}
            className="w-4 h-4 text-gray-300 inline-block"
          />
        );
      }
    }
    return stars;
  };

  const evaluationsView = evaluations?.map((exp, i) => {
    const selected = selectedEvaluation === i;
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => setSelectedEvaluation(i)}
        // onMouseOver={() => setSelectedEvaluation(i)}
        className={`text-primary p-1 px-2 rounded border ${
          selected ? "border-accent  " : " border-transparent"
        }`}
        key={"evaluationsrow" + i}
      >
        <div className="   ">
          <div className="flex   gap-3  ">
            <div style={{ minWidth: "170px" }} className="  text-md">
              {" "}
              {getStarRating(exp.score / 2)}{" "}
              <span className="inline-block ml-2">{exp.dimension}</span>
            </div>
            <div className="my-2 flex-1 bg-gray-200 h-1 rounded">
              <div
                style={{
                  width: (exp.score * 10).toFixed(0) + "%",
                  backgroundColor: mapNumberToColor(exp.score, 1, 10),
                }}
                className="h-1 rounded"
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div style={{ minHeight: "200px" }} className="text-primary">
      <div
        onClick={() => fetchEvaluation()}
        role={"button"}
        className={`px-5 bg-accent duration-300 hover:brightness-110 text-white inline-block  rounded p-2 ${
          loading ? "opacity-50 pointer-events-none" : ""
        } `}
      >
        {!loading && <AcademicCapIcon className="w-5 h-5 mr-1  inline-block" />}
        {loading && <LoadBox className="text-white inline-block" />} Evaluate
        the chart.
      </div>
      {loading && (
        <div className="mt-4">
          <LoadBox
            className="text-accent"
            subtitle={"fetching evaluations .."}
          />
          <Skeleton active className="mt-4" paragraph={{ rows: 12 }} />
        </div>
      )}
      <div ref={evaluationsDivRef} className="mt-6">
        {evaluations && evaluations.length > 0 && (
          <>
            <div className="my-2">
              The visualization has been evaluated across multiple dimensions.
              Select a dimension to view rationale for the score{" "}
            </div>
            <div className=" w-full grid md:grid-cols-2 sm:grid-cols-1 gap-3 ">
              <div className="  w-full">
                {/* <div className="my-2">Evaluation Scores Radar Plot </div> */}
                <EvalRadarPlot data={evaluations} />
              </div>

              <div className=" mt-2  w-full">
                <div className="mt-2"> {evaluationsView}</div>

                <div className="border mt-2 rounded p-2">
                  <div className="my-2 capitalize">
                    {evaluations[selectedEvaluation].dimension}{" "}
                  </div>
                  <div className="flex">
                    <div
                      style={{
                        fontSize: "50px",
                        color: mapNumberToColor(
                          evaluations[selectedEvaluation].score,
                          1,
                          10
                        ),
                      }}
                      className="text-accent   mr-2"
                    >
                      {(evaluations[selectedEvaluation].score / 2).toFixed(1)}
                      <div className="text-sm text-center -mt-4 text-primary">
                        {" "}
                        out of 5{" "}
                      </div>
                    </div>
                    <div> {evaluations[selectedEvaluation].rationale}</div>
                  </div>
                </div>
              </div>

              {/* {evaluations && evaluations.length > 0 && (
            <div className="w-1/2">
              {evaluations[selectedEvaluation].rationale}
            </div>
          )} */}
            </div>
          </>
        )}
      </div>

      {evaluations && evaluations.length > 0 && (
        <div className="p-2   text-right">
          {" "}
          <div
            onClick={() => repairChart()}
            role={"button"}
            className={`px-5 bg-accent duration-300 hover:brightness-110 text-white inline-block  rounded p-2 ${
              loadingRepair ? "opacity-50 pointer-events-none" : ""
            } `}
          >
            {!loadingRepair && (
              <>
                {" "}
                <WrenchScrewdriverIcon className="w-5 h-5 mr-1  inline-block" />{" "}
                Auto Repair Chart.
              </>
            )}
            {loadingRepair && (
              <>
                <LoadBox className="text-white inline-block" />
                Repairing Chart ..{" "}
              </>
            )}{" "}
          </div>
        </div>
      )}
    </div>
  );
};
export default ChartEvaluator;
