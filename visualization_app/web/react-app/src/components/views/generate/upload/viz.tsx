import {
    ChartPieIcon,
    Cog6ToothIcon,
    ExclamationCircleIcon,
    PaperAirplaneIcon,
  } from "@heroicons/react/24/outline";
  import { Skeleton, message } from "antd";
  import * as React from "react";
  import { LaunchButton, LoadingBar } from "../../../atoms";
  import { IStatus, IVizConfig } from "../../../types";
  import { fetchJSON, scrollToElement } from "../../../utils";
  import VegaGalleryView from "../../chartview";
  
  const VizGenView = ({
    config,
  }: {
    config: {
      vizConfig: IVizConfig;
      setVizConfig: React.Dispatch<React.SetStateAction<IVizConfig>>;
    };
  }) => {
    const serverUrl = process.env.GATSBY_API_URL;
    const { vizConfig, setVizConfig } = config;
    const [vizspecs, setVizspecs] = React.useState<[] | null>(null);
    const [error, setError] = React.useState<null | IStatus>(null);
    const [loading, setLoading] = React.useState(false);
  
    const promptInputRef = React.useRef<HTMLInputElement>(null);
  
    const vizDivRef = React.useRef<HTMLDivElement>(null);
  
    React.useEffect(() => {
      if (promptInputRef.current) {
        promptInputRef.current.value = vizConfig.goal?.question || "";
      }
      if (vizConfig.summary && vizConfig.goal) {
        // setTimeout(() => {
        //   scrollToElement(vizDivRef);
        // }, 600);
        // fetchVisualization(vizConfig);
      }
      // console.log("Goal changed | library ", vizConfig.library);
    }, [vizConfig.goal]);
  
    React.useEffect(() => {
      if (vizConfig.summary && vizConfig.goal) {
        setTimeout(() => {
          scrollToElement(vizDivRef);
        }, 200);
        fetchVisualization(vizConfig);
        // console.log("library changed", vizConfig.library);
      }
    }, [vizConfig.library, vizConfig.goal]);
  
    const fetchVisualization = (config: IVizConfig) => {
      // console.log("fetching visualization");
  
      setError(null);
      setVizspecs(null);
      setLoading(true);
      const payLoad = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary: config.summary,
          goal: config.goal,
          library: vizConfig.library,
          textgen_config: vizConfig.textgen_config,
        }),
      };
      // console.log("text gen config", vizConfig.textgen_config);
  
      const onSuccess = (data: any) => {
        if (data && data.status) {
          setVizspecs(data.charts);
          // console.log(data);
          message.success(data.message);
          setTimeout(() => {
            scrollToElement(vizDivRef);
          }, 600);
        } else {
          message.error(data.message);
          setError(data);
        }
        setLoading(false);
      };
      const onError = (err: any) => {
        setError(err);
        message.error(err.message);
        setLoading(false);
      };
      fetchJSON(`${serverUrl}/visualize`, payLoad, onSuccess, onError);
    };
  
    return (
      <div className={` mt-10`}>
        {vizConfig.summary && (
          <>
            <div className="font-semibold text-xl  mb-2 text-secopndary">
              <ChartPieIcon className="inline-block h-5" /> Visualization
              Generation
            </div>
            <div className=" my-2 text-secondary text-xs">
              Select a goal above or describe a new visualization goal to generate
              a visualization.
            </div>
            <div
              className={`${
                !loading ? "" : " "
              } border border-secondary rounded p-3 flex gap-2`}
            >
              <input
                className={` w-full p-3 text-gray-700 flex-1 rounded border border-secondary inline-block  ${
                  loading ? "brightness-90 pointer-events-none" : ""
                }`}
                placeholder="Enter Prompt"
                type={"text"}
                defaultValue={vizConfig.goal?.question}
                ref={promptInputRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && promptInputRef.current && !loading) {
                    setVizConfig({
                      ...vizConfig,
                      goal: {
                        index: 0,
                        question: promptInputRef.current?.value,
                        visualization: promptInputRef.current?.value,
                        rationale: " ",
                      },
                    });
                  }
                }}
              />
  
              <LaunchButton
                onClick={() => {
                  if (promptInputRef.current) {
                    setVizConfig({
                      ...vizConfig,
                      goal: {
                        index: 0,
                        question: promptInputRef.current?.value,
                        visualization: promptInputRef.current?.value,
                        rationale: " ",
                      },
                    });
                  }
                }}
              >
                <div className="   flex relative">
                  {loading && (
                    <div className="inline-block   ">
                      <Cog6ToothIcon className="relative -pb-2  animate-spin  inline-flex rounded-full h-7 w-7" />
                    </div>
                  )}
                  {!loading && (
                    <span className="inline-block ">
                      {" "}
                      <PaperAirplaneIcon className="inline-block h-5 mr-2 -mt-1" />
                      {/* <Icon icon="app" size={6} /> */}
                      Generate
                    </span>
                  )}
                </div>{" "}
              </LaunchButton>
            </div>
          </>
        )}
  
        <div ref={vizDivRef}>
          {loading && (
            <>
              <LoadingBar>
                <> Working on generating interesting visualizations</>
              </LoadingBar>
              <Skeleton active className="mt-4" paragraph={{ rows: 12 }} />
            </>
          )}
          {vizConfig.summary && vizConfig.goal && (
            <div className="mt-4">
              {vizspecs && vizspecs.length > 0 && (
                <div className="mt-4  ">
                  <VegaGalleryView vizspecs={vizspecs} vizConfig={vizConfig} />
                </div>
              )}
            </div>
          )}
          {vizspecs && vizspecs.length === 0 && (
            <div className="mt-4 p-2 rounded border-accent border">
              {" "}
              <ExclamationCircleIcon className="inline-block h-5 mr-2" />
              No visualizations generated{" "}
            </div>
          )}
        </div>
      </div>
    );
  };
  export default VizGenView;
  