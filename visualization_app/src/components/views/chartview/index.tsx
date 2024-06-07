import { List, Empty } from "antd";
import * as React from "react";
import { IVizConfig } from "../../types";
import ChartView from "./chartview";

const VegaGalleryView = ({
  vizspecs,
  vizConfig,
}: {
  vizspecs: any;
  vizConfig: IVizConfig;
}) => {
  // const maxViz = 1;
  return (
    <div className=" mt-4  ">
      <List
        locale={{ emptyText: <Empty description="No experiments found" /> }}
        dataSource={vizspecs}
        renderItem={(vizspec: any, i: number) => (
          <ChartView vizspec={vizspec} config={vizConfig} />
        )}
        pagination={{
          pageSize: 1,
          size: "small",
          hideOnSinglePage: true,
        }}
      />
    </div>
  );
};
export default VegaGalleryView;
