import {
    CalendarDaysIcon,
    CalendarIcon,
    ChatBubbleOvalLeftIcon,
    ClipboardDocumentCheckIcon,
    ClipboardDocumentIcon,
    DocumentChartBarIcon,
    HashtagIcon,
    TagIcon,
  } from "@heroicons/react/24/outline";
  import { Modal } from "antd";
  import * as React from "react";
  import { useState } from "react";
  import { CollapseBox } from "../../../atoms";
  import Icon from "../../../icons";
  import { IVizConfig } from "../../../types";
  import { CodeBlock } from "../../chartview/codeblock";
  
  const SummaryView = ({
    summaryConfig,
  }: {
    summaryConfig: {
      vizConfig: IVizConfig;
      setVizConfig: React.Dispatch<React.SetStateAction<IVizConfig>>;
      loadingSummary: any;
    };
  }) => {
    const { vizConfig, setVizConfig, loadingSummary } = summaryConfig;
    const summary = vizConfig?.summary;
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const getIcon = (dtype: string, size = 4) => {
      switch (dtype) {
        case "string" || "object":
          return (
            <ChatBubbleOvalLeftIcon
              title="string"
              className={`inline-block ${"w-" + size} ${"h-" + size}`}
            />
          );
        case "number":
          return (
            <HashtagIcon
              title="number"
              className={`inline-block ${"w-" + size} ${"h-" + size}`}
            />
          );
        case "date":
          return (
            <CalendarDaysIcon
              title="date"
              className={`inline-block ${"w-" + size} ${"h-" + size}`}
            />
          );
        case "category":
          return (
            <TagIcon
              title="category"
              className={`inline-block ${"w-" + size} ${"h-" + size}`}
            />
          );
  
        default:
          return (
            <DocumentChartBarIcon
              title="other"
              className={`inline-block ${"w-" + size} ${"h-" + size}`}
            />
          );
      }
    };
  
    const SamplesBox = ({ samples }: { samples: any }) => {
      const samplesView = samples.map((s: any, i: number) => {
        return (
          <span
            key={"samplesrow" + i}
            className="border-secondary   border rounded p-1 px-2 block"
          >
            {s}
          </span>
        );
      });
      return (
        <CollapseBox title="View samples" open={false}>
          <div className="inline-flex gap-2 flex-wrap">{samplesView}</div>
        </CollapseBox>
      );
    };
  
    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  
    const columnView = summary?.fields.map((prop: any, i: number) => {
      return (
        <div
          key={"colrow" + i}
          className="p-2 mb-3 boprder border-secondary bg-secondary rounded   break-inside-avoid "
        >
          <div>
            {" "}
            <span className="text-accent">
              {getIcon(prop.properties.dtype)}
            </span>{" "}
            <span className="capitalize font-semibold break-all">
              {" "}
              {prop.column}
            </span>
          </div>
          <div className="">
            <span title="atomic type">{prop.properties.dtype}</span> |{" "}
            <span title="semantic type">{prop.properties.semantic_type} </span>
          </div>
          <div className="text-xs text-secondary">
            {prop.properties.description}
          </div>
          <div className="text-xs text-secondary">
            # Unique values: {prop.properties.num_unique_values}{" "}
          </div>
          <div className="text-xs text-secondary">
            {prop.properties.min && " min: " + prop.properties.min}{" "}
            {prop.properties.max && " , max: " + prop.properties.max}{" "}
            {prop.properties.std && " | std: " + prop.properties.std.toFixed(3)}{" "}
          </div>
  
          <div className="  text-xs text-secondary border border-secondpary rounded mt-2">
            <SamplesBox samples={prop.properties.samples} />
          </div>
          {/* <div className=" " style={{ height: Math.random() * 8 + "px" }}></div> */}
        </div>
      );
    });
    return (
      <div className="">
        {summary && !loadingSummary && (
          <>
            <div className="font-semibold text-xl mt-6 mb-2">
              {" "}
              <ClipboardDocumentIcon className="inline-block h-5" /> Data Summary
            </div>
  
            <div className=" my-2 text-secondary text-xs">
              An enriched representation of the data (with predicted semantic
              types and descriptions)
            </div>
            <div className=" mb-2">
              <span className=""> {summary.name} </span>
              <span className="ml-1 text-xs text-secondary">
                {summary.dataset_description}
              </span>
            </div>
  
            <div
              // style={{ maxHeight: "180px" }}
              className="text-sm overflow-auto scroll"
            >
              {summary && (
                <CollapseBox title={`data summary | ${summary.name}`} open={true}>
                  <div>
                    <div className="columns-3 gap-3 md:columns-4 xl:columns-5 2xl:columns-6">
                      {columnView}
                    </div>
                    {/* {JSON.stringify(summary, null, 2)} */}
                  </div>
                </CollapseBox>
              )}
              {!summary && <div>Upload a dataset to begin</div>}
              {loadingSummary && (
                <div className="my-2 mt-4 text-xs">
                  {" "}
                  <span className="text-accent inline-block mr-2">
                    {" "}
                    <Icon icon={"loading"} size={5} />
                  </span>{" "}
                  Uploading and Summarizing the data ..{" "}
                </div>
              )}
              <div>
                <div
                  role={"button"}
                  onClick={showModal}
                  className="mt-4 inline-block duration-200 hover:text-accent"
                >
                  View raw summary?
                </div>
                <Modal
                  title="Raw Dataset Summary"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <div className="mb-4">
                    The dataset is summarized as the dictionary below.
                  </div>
                  <CodeBlock
                    code={JSON.stringify(summary, null, 2)}
                    language="javascript"
                  />
                </Modal>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };
  export default SummaryView;
  