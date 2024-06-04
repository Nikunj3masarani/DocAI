import * as React from "react";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { IStatus, IVizConfig } from "../../types";
import { Skeleton, message } from "antd";
import { fetchJSON, scrollToElement } from "../../utils";
import { LoadBox } from "../../atoms";
import { CodeBlock } from "./codeblock";

const ChartRecommender = ({
  vizData,
  setVizData,
  vizConfig,
}: {
  vizData: any;
  setVizData: React.Dispatch<React.SetStateAction<any>>;
  vizConfig: IVizConfig;
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<null | IStatus>(null);
  const [recommendations, setRecommendations] = React.useState<any[]>([]);
  const serverUrl = process.env.GATSBY_API_URL;

  const recommendationsDivRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setRecommendations([]);
  }, [vizData]);

  const fetchRecommendation = () => {
    setError(null);
    setLoading(true);
    setRecommendations([]);
    setTimeout(() => {
      scrollToElement(recommendationsDivRef);
    }, 600);

    const textgen_config = Object.assign({}, vizConfig.textgen_config);
    textgen_config.n = 3;
    textgen_config.temperature = 0.6;

    const payLoad = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: vizData.code,
        library: vizConfig.library,
        summary: vizConfig.summary,
        textgen_config: textgen_config,
      }),
    };
    // console.log(config.goal);

    const onSuccess = (data: any) => {
      if (data && data.status) {
        // setVizspecs(data.charts);
        console.log("Recomendation data", data);
        setRecommendations(data.charts);
        message.success(data.message);
        setTimeout(() => {
          scrollToElement(recommendationsDivRef);
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
    fetchJSON(`${serverUrl}/visualize/recommend`, payLoad, onSuccess, onError);
  };

  const recommendationsView = recommendations?.map((exp, i) => {
    const isAccessibility = exp.section === "accessibility";
    return (
      <div className="mb-4" key={"recommendationsrow" + i}>
        <div className="font-semibold text-lg"> {exp.section}</div>
        <div className="flex gap-4">
          <div className={`${isAccessibility ? "" : " w-1/2"} `}>
            <img src={`data:image/png;base64,${exp.raster}`} />
          </div>
          {!isAccessibility && (
            <div className="w-1/2">
              <CodeBlock
                code={`${exp.code}`}
                language="python"
                // showLineNumbers={true}
                wrapLines={true}
              />
            </div>
          )}
        </div>
      </div>
    );
  });
  return (
    <div className="text-primary">
      <div
        onClick={() => fetchRecommendation()}
        role={"button"}
        className={`px-5 bg-accent duration-300 hover:brightness-110 text-white inline-block  rounded p-2 ${
          loading ? "opacity-50 pointer-events-none" : ""
        } `}
      >
        {!loading && (
          <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5 mr-1  inline-block" />
        )}
        {loading && <LoadBox className="text-white inline-block" />} Generate
        Recommendations
      </div>

      {/* {loading && (
        <span className=" text-accent">
          {" "}
          <LoadBox className="" /> loading recommendations
        </span>
      )} */}

      {loading && (
        <div className="mt-4">
          <LoadBox
            className="text-accent"
            subtitle={"loading recommendations .."}
          />
          <Skeleton active className="mt-4" paragraph={{ rows: 12 }} />
        </div>
      )}

      <div ref={recommendationsDivRef} className="mt-4">
        {recommendationsView}
      </div>
    </div>
  );
};
export default ChartRecommender;
