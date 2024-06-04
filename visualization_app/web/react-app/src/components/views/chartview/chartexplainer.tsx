import * as React from "react";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { IStatus, IVizConfig } from "../../types";
import { Skeleton, message } from "antd";
import { fetchJSON, scrollToElement } from "../../utils";
import { LoadBox } from "../../atoms";
import { CodeBlock } from "./codeblock";

const ChartExplainer = ({
  vizData,
  vizConfig,
}: {
  vizData: any;
  vizConfig: IVizConfig;
}) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<null | IStatus>(null);
  const [explanations, setExplanations] = React.useState<any[]>([]);
  const serverUrl = process.env.GATSBY_API_URL;

  const explanationsDivRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setExplanations([]);
  }, [vizData]);

  const fetchExplanation = () => {
    setError(null);
    setLoading(true);
    setExplanations([]);
    setTimeout(() => {
      scrollToElement(explanationsDivRef);
    }, 600);

    const payLoad = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: vizData.code,
        library: vizConfig.library,
        textgen_config: vizConfig.textgen_config,
      }),
    };
    // console.log(config.goal);

    const onSuccess = (data: any) => {
      if (data && data.status) {
        // setVizspecs(data.charts);
        console.log("Explanation data", data);
        setExplanations(data.explanations);
        message.success(data.message);
        setTimeout(() => {
          scrollToElement(explanationsDivRef);
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
    fetchJSON(`${serverUrl}/visualize/explain`, payLoad, onSuccess, onError);
  };

  const explanationsView = explanations?.map((exp, i) => {
    const isAccessibility = exp.section === "accessibility";
    return (
      <div className="mb-4" key={"explanationsrow" + i}>
        <div className="font-semibold text-lg"> {exp.section}</div>
        <div className="flex gap-4">
          <div className={`${isAccessibility ? "" : " w-1/2"} `}>
            {exp.explanation}
            {/* <div className="text-secondary text-sm mt-1">{exp.rationale}</div> */}
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
        onClick={() => fetchExplanation()}
        role={"button"}
        className={`px-5 bg-accent duration-300 hover:brightness-110 text-white inline-block  rounded p-2 ${
          loading ? "opacity-50 pointer-events-none" : ""
        } `}
      >
        {!loading && (
          <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5 mr-1  inline-block" />
        )}
        {loading && <LoadBox className="text-white inline-block" />} Explain the
        chart.
      </div>

      {/* {loading && (
        <span className=" text-accent">
          {" "}
          <LoadBox className="" /> loading explanations
        </span>
      )} */}

      {loading && (
        <div className="mt-4">
          <LoadBox
            className="text-accent"
            subtitle={"loading explanations .."}
          />
          <Skeleton active className="mt-4" paragraph={{ rows: 12 }} />
        </div>
      )}

      <div ref={explanationsDivRef} className="mt-4">
        {explanationsView}
      </div>
    </div>
  );
};
export default ChartExplainer;
