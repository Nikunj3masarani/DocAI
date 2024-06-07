import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import { message } from "antd";
import * as React from "react";
import { IVizConfig } from "../../../types";
import { fetchJSON } from "../../../utils";

const SamplesView = ({
  config,
}: {
  config: {
    setLoadingSummary: any;
    resetStates: any;
    vizConfig: IVizConfig;
    setVizConfig: any;
    setError: any;
  };
}) => {
  const serverUrl = process.env.GATSBY_API_URL;
  const { setLoadingSummary, resetStates, setVizConfig, setError, vizConfig } =
    config;
  const samples = [
    {
      name: "stocks.csv",
      url: "https://raw.githubusercontent.com/vega/vega-datasets/next/data/stocks.csv",
    },
    {
      name: "cars.json",
      url: "https://raw.githubusercontent.com/vega/vega-datasets/next/data/cars.json",
    },
    {
      name: "wheat.json",
      url: "https://raw.githubusercontent.com/vega/vega-datasets/next/data/wheat.json",
    },

    {
      name: "movies.json",
      url: "https://raw.githubusercontent.com/vega/vega-datasets/next/data/movies.json",
    },
    {
      name: "seattle-weather.csv",
      url: "https://raw.githubusercontent.com/vega/vega-datasets/next/data/seattle-weather.csv",
    },
    {
      name: "sp500.csv",
      url: "https://raw.githubusercontent.com/vega/vega-datasets/next/data/sp500.csv",
    },
    {
      name: "la-riots.csv",
      url: "https://raw.githubusercontent.com/vega/vega-datasets/next/data/la-riots.csv",
    },
    {
      name: "airports.csv",
      url: "https://raw.githubusercontent.com/vega/vega-datasets/next/data/airports.csv",
    },
  ];

  const uploadFileUrl = (fileUrl: string) => {
    const url = `${serverUrl}/summarize/url`;
    setLoadingSummary(true);
    resetStates();

    const payLoad = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        url: fileUrl,
        textgen_config: vizConfig.textgen_config,
      }),
    };

    const onSuccess = (data: any) => {
      if (data && data.status) {
        setVizConfig({
          ...vizConfig,
          summary: data.summary,
          goal: null,
        });
      } else {
        setError({ status: false, message: data.message });
        message.error(data.message);
      }
      setLoadingSummary(false);
    };

    const onError = (error: any) => {
      setLoadingSummary(false);
      console.log(error);
      setError({ status: false, message: error.message });
      message.error(error + "");
    };

    fetchJSON(url, payLoad, onSuccess, onError);

    // const postData = {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ url: fileUrl }),
    // };
    // fetch(url, postData)
    //   .then(
    //     (response) => response.json() // if the response is a JSON object
    //   )
    //   .then((data) => {
    //     if (data.status) {
    //       setLoadingSummary(false);
    //       // let config = Object.assign({}, vizConfig);
    //       // config.summary = data.summary;
    //       // config.goal = null;
    //       setVizConfig({
    //         ...vizConfig,
    //         summary: data.summary,
    //         goal: null,
    //       });
    //     } else {
    //       setError({ status: false, message: data.message });
    //       message.error(data.message);
    //       setLoadingSummary(false);
    //     }
    //   })
    //   .catch(
    //     (error) => {
    //       setLoadingSummary(false);
    //       console.log(error);
    //       setError({ status: false, message: error + "" });
    //       message.error(error + "");
    //     } // Handle the error response object
    //   );
  };
  const samplesView = samples.map((data, i) => {
    return (
      <div
        role="button"
        onClick={() => {
          uploadFileUrl(data.url);
        }}
        className="p-1 border-accent border px-2  rounded duration-300 hover:text-accent"
        key={"samplerow" + i}
      >
        {data.name}
      </div>
    );
  });

  return (
    <div>
      <div className={`mb-4 `}>
        <div className="mb-2 ">
          <span className="font-semibold ">
            <ArrowUpOnSquareIcon className="inline-block h-5" /> Don't have
            data?
          </span>{" "}
          <span className="text-sm mb-2 ml-2 ">Try any of the files below</span>
        </div>

        <div className="col-span-1 flex flex-wrap gap-2">{samplesView}</div>
      </div>
    </div>
  );
};
export default SamplesView;
