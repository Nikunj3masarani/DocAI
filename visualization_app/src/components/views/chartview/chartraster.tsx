import {
    ArchiveBoxXMarkIcon,
    ChartBarIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
  } from "@heroicons/react/24/outline";
  import { message, Modal } from "antd";
  import * as React from "react";
  import { IGoal } from "../../types";
  import ChartView from "./chartview";
  
  const ChartRasterView = ({
    raster,
    library,
    goal,
  }: {
    raster: string | null;
    library: string | null | undefined;
    goal: IGoal | null;
  }) => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  
    return (
      <div>
        {raster && (
          <div className="border rounded bg-white">
            <img
              role={"button"}
              onClick={showModal}
              style={{ height: "390px" }}
              src={`data:image/png;base64,${raster}`}
              className="rounded object-fit bg-white p-2 pt-4"
              alt="chart"
            />
          </div>
        )}
        {!raster && (
          <div style={{ minWidth: "200px" }}>
            {" "}
            <ExclamationTriangleIcon className="w-5 h-5 text-orange-400 inline-block" />{" "}
            No visualization image generated.
          </div>
        )}
  
        <Modal
          title={
            <>
              <span className="capitalize">{library}</span> Chart
            </>
          }
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={800}
        >
          <div className="mb-2">{goal?.question}</div>
          <div className="mb-4 text-secondary">{goal?.rationale}</div>
          <img
            style={{ width: "100%", height: "100%" }}
            src={`data:image/png;base64,${raster}`}
            className="rounded object-fit p-2 pt-4 bg-white"
            alt="chart"
          />
        </Modal>
      </div>
    );
  };
  
  export default ChartRasterView;
  