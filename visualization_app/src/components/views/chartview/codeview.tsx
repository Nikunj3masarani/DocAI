import {
    ChartPieIcon,
    CodeBracketIcon,
    DocumentChartBarIcon,
    ExclamationTriangleIcon,
  } from "@heroicons/react/24/outline";
  import { Tabs } from "antd";
  import * as React from "react";
  import { Vega } from "react-vega";
  import { CodeBlock } from "./codeblock";
  import VegaVizView from "./chartview";
  
  const CodeView = ({ spec, code, error, status }: any) => {
    // delete spec.datasets;
  
    const tabs = [];
    if (spec !== null) {
      tabs.push({
        label: (
          <div>
            {" "}
            <DocumentChartBarIcon className="inline-block h-4" /> Vega-Lite Spec
          </div>
        ),
        key: "1",
        children: (
          <div className="w-full overflow-hidden">
            <CodeBlock
              code={JSON.stringify(spec, null, 2)}
              language="javascript"
              wrapLines={true}
              maxHeight="280px"
            />
          </div>
        ),
      });
    }
    tabs.push({
      label: (
        <div>
          {" "}
          <CodeBracketIcon className="inline-block h-4" /> Python Code
        </div>
      ),
      key: "2",
      children: (
        <div className="w-full overflow-hidden">
          <CodeBlock
            code={code}
            language="python"
            wrapLines={true}
            maxHeight="280px"
          />
        </div>
      ),
    });
  
    if (status === false && error) {
      tabs.push({
        label: (
          <div className="">
            {" "}
            <ExclamationTriangleIcon className="inline-block h-4 text-orange-400" />{" "}
            Error
          </div>
        ),
        key: "3",
        children: (
          <div className="w-full overflow-hidden">
            <div className="text-xs mb-2 text-primary mt-2 "> Error Message </div>
            <CodeBlock
              code={error.message}
              language="javascript"
              wrapLines={true}
            />
            <div className="text-xs mb-2 text-primary mt-2"> Traceback </div>
            <CodeBlock
              code={error.traceback}
              language="javascript"
              wrapLines={true}
            />
          </div>
        ),
      });
    }
  
    return (
      <div className="w-full p-3 border rounded  text-primary  ">
        <Tabs defaultActiveKey="1" onChange={() => {}} items={tabs} />
      </div>
    );
  };
  export default CodeView;
  