import {
    AcademicCapIcon,
    ArchiveBoxXMarkIcon,
    ChatBubbleLeftEllipsisIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    InformationCircleIcon,
    LightBulbIcon,
  } from "@heroicons/react/24/outline";
  import { message, Tabs, TabsProps } from "antd";
  import * as React from "react";
  import { Vega } from "react-vega";
  import { LoadBox } from "../../atoms";
  import { IStatus, IVizConfig } from "../../types";
  import { fetchJSON } from "../../utils";
  import ChartRasterView from "./chartraster";
  import CodeView from "./codeview";
  import ChartExplainer from "./chartexplainer";
  import ChartEvaluator from "./chartevaluator";
  import ChartRecommender from "./chartrecommender";
  
  const ChartView = ({
    vizspec,
    config,
  }: {
    vizspec: any;
    config: IVizConfig;
  }) => {
    const goal = config.goal;
    const serverUrl = process.env.GATSBY_API_URL;
    const [loadingRevision, setLoadingRevision] = React.useState<boolean>(false);
    const [error, setError] = React.useState<null | IStatus>(null);
    const [commands, setCommands] = React.useState<string[]>([]);
    // const [width, setWidth] = useState(300);
  
    const commandInputRef = React.useRef<HTMLInputElement>(null);
    const chartDivRef = React.useRef<HTMLDivElement>(null);
  
    const [vizData, setVizData] = React.useState<any | null>(vizspec);
  
    const spec = vizData.spec;
    const raster = vizData.raster;
  
    if (spec) {
      delete spec.config;
      spec.width = 300;
      spec.height = 320;
      spec["actions"] = false;
  
      if (!spec.data.url.includes("/api")) {
        spec.data.url = serverUrl + spec.data.url;
      }
      if (spec.title?.subtitle) {
        delete spec.title.subtitle;
      }
    }
  
    const commandsView = commands.map((command: string, i: number) => {
      return (
        <div className="" key={"commandsrow" + i}>
          <span className="text-xs">{command}</span>
        </div>
      );
    });
  
    const editVisualization = (command: string) => {
      setError(null);
      setLoadingRevision(true);
      let comms = Object.assign([], commands);
      comms.push(command);
      const payLoad = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          summary: config.summary,
          instructions: comms,
          code: vizspec.code,
          library: config.library,
          textgen_config: config.textgen_config,
        }),
      };
      // console.log(config.goal);
  
      const onSuccess = (data: any) => {
        if (data && data.status) {
          // setVizspecs(data.charts);
          // console.log("Edited data", data);
          setVizData(data.charts[0]);
          message.success(data.message);
          // setTimeout(() => {
          //   scrollToElement(vizDivRef);
          // }, 1000);
          commandInputRef.current?.value && (commandInputRef.current.value = "");
          setCommands(comms);
        } else {
          message.error(data.message);
          setError(data);
        }
        setLoadingRevision(false);
      };
      const onError = (err: any) => {
        message.error(err.message);
        setLoadingRevision(false);
        setError(err);
      };
      fetchJSON(`${serverUrl}/visualize/edit`, payLoad, onSuccess, onError);
    };
  
    const tabItems: TabsProps["items"] = [
      {
        key: "1",
        label: (
          <div>
            {" "}
            <ChatBubbleLeftEllipsisIcon className="inline-block h-4 mr-2" />
            Refine
          </div>
        ),
        children: (
          <div className="text-primary" style={{ minHeight: "300px" }}>
            <div className="text-sm text-primary mb-2">
              Modify Chart with Natural Language commands.
            </div>
            <div
              className={`relative mt-2 bg-secondary rounded-b-none rounded p-2 ${
                loadingRevision ? "pointer-event-none opacity-75" : ""
              } `}
            >
              <input
                ref={commandInputRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    // generate(commandInputRef.current?.value || "");
                    editVisualization(commandInputRef.current?.value || "");
                  }
                }}
                className="bg-white w-full text-gray-600 p-2 rounded"
                placeholder="Change x axis label to Meters per Second"
                type={"input"}
              />
              {loadingRevision && (
                <span className="absolute left-4 top-4 text-accent">
                  {" "}
                  <LoadBox className="" />
                </span>
              )}
              {
                <div className="text-sm text-orange-400 mt-1">
                  {error?.message}
                </div>
              }
            </div>
            <div className="text-xs p-2 border border-t-0 rounded border-secondary rounded-t-none">
              {commands && commands.length > 0 && (
                <div className="text-right">
                  <div
                    role={"button"}
                    onClick={() => {
                      setCommands([]);
                    }}
                    className="text-right border inline-block p-1 rounded hover:border-accent hover:text-accent duration-300"
                  >
                    {" "}
                    <ArchiveBoxXMarkIcon className="w-5 h-5 inline-block" /> Clear
                    Chat History{" "}
                  </div>
                </div>
              )}
              {commandsView}
            </div>
          </div>
        ),
      },
      {
        key: "2",
        label: (
          <div>
            {" "}
            <ChatBubbleOvalLeftEllipsisIcon className="inline-block h-4 mr-2" />
            Explain
          </div>
        ),
        children: (
          <>
            <div className="text-sm text-primary mb-2">
              Use the explain visualization button below to generate an
              explanation for the chart.
            </div>
            <ChartExplainer vizData={vizData} vizConfig={config} />
          </>
        ),
      },
      {
        key: "3",
        label: (
          <div>
            {" "}
            <AcademicCapIcon className="inline-block h-4 mr-2" />
            Evaluate
          </div>
        ),
        children: (
          <>
            <div className="text-sm text-primary mb-2">
              Use the evaluate visualization button below to generate
              self-evaluation scores for the chart.
            </div>
            <ChartEvaluator
              vizData={vizData}
              setVizData={setVizData}
              vizConfig={config}
            />
          </>
        ),
      },
      {
        key: "4",
        label: (
          <div>
            {" "}
            <LightBulbIcon className="inline-block h-4 mr-2" />
            Recommend!
          </div>
        ),
        children: (
          <>
            <div className="text-sm text-primary mb-2">
              Generate similar charts.
            </div>
            <ChartRecommender
              vizData={vizData}
              setVizData={setVizData}
              vizConfig={config}
            />
          </>
        ),
      },
    ];
  
    return (
      <div className="text-primary  " ref={chartDivRef}>
        <div className="mb-4 w-full  ">
          <div className="text-lg font-semibold">{goal?.question}</div>
          <span className="text-sm">{goal?.rationale}</span>{" "}
          {goal?.visualization && (
            <div className="text-sm text-accent">{goal?.visualization}</div>
          )}
        </div>
  
        <div className="md:flex gap-4   w-full">
          {spec && (
            <div className=" bg-white rounded p-2  ">
              <Vega spec={spec} actions={false} />
            </div>
          )}
          {raster && (
            <ChartRasterView
              raster={raster}
              library={config.library}
              goal={config.goal}
            />
          )}
          <div className="flex-1  md:mt-0 mt-4      gap-3 mb-4  ">
            <div className="  w-full">
              <div className="text-xs word-break: break-all text-primary mb-2">
                <InformationCircleIcon className="h-4 w-4 inline-block mr-1" />
                How was this visualization created? See the specifications and
                code below.
              </div>
              <CodeView
                spec={spec}
                code={vizData.code}
                error={vizData.error}
                status={vizData.status}
              />
            </div>
          </div>
        </div>
  
        <Tabs defaultActiveKey="1" items={tabItems} />
      </div>
    );
  };
  export default ChartView;
  