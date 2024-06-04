// import { Radar } from "@ant-design/charts";
import { RadarConfig } from "@ant-design/charts";
import * as React from "react";

const EvalRadarPlot = ({ data }: any) => {
  const [Radar, setRadar] = React.useState<React.FC<RadarConfig> | null>(null);

  React.useEffect(() => {
    (async () => {
      const { Radar: AntRadar } = await import("@ant-design/charts");
      setRadar(AntRadar as React.FC<RadarConfig>);
    })();
  }, []);

  // const data = [
  //   {
  //     name: "G2",
  //     star: 10371,
  //   },
  //   {
  //     name: "G6",
  //     star: 7380,
  //   },
  //   {
  //     name: "F2",
  //     star: 7414,
  //   },
  //   {
  //     name: "L7",
  //     star: 2140,
  //   },
  //   {
  //     name: "X6",
  //     star: 660,
  //   },
  //   {
  //     name: "AVA",
  //     star: 885,
  //   },
  //   {
  //     name: "G2Plot",
  //     star: 1626,
  //   },
  // ];
  const config: RadarConfig = {
    data: data.map((d: any) => ({ ...d, score: d.score / 2 })),
    xField: "dimension",
    yField: "score",
    appendPadding: [0, 10, 0, 10],
    meta: {
      score: {
        alias: "score (out of 5)",
        min: 0,
        nice: true,
        formatter: (v: any) => Number(v).toFixed(2),
      },
    },
    xAxis: {
      tickLine: null,
    },
    yAxis: {
      label: false,
      grid: {
        alternateColor: "rgba(0, 0, 0, 0.04)",
      },
    },
    point: {
      size: 2,
    },
    area: {
      style: {
        fillOpacity: 0.3,
        fill: "green",
        stroke: "green",
      },
    },
  };
  return <div className=" ">{Radar && <Radar {...config} />}</div>;
};
export default EvalRadarPlot;
