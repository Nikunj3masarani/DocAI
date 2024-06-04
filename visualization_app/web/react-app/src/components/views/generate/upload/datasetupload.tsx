import { ArrowUpOnSquareIcon, InboxIcon } from "@heroicons/react/24/outline";
import { message, Skeleton, Upload, UploadProps } from "antd";
import * as React from "react";
import { IGoal, IStatus, IVizConfig } from "../../../types";
import { fetchJSON, scrollToElement } from "../../../utils";
import Icon from "../../../icons";
import SummaryView from "./summary";
import SamplesView from "./samples";
import GoalView from "./goal";
import VizGenView from "./viz";

const DatasetSelectorView = ({
  config,
}: {
  config: {
    vizConfig: IVizConfig;
    setVizConfig: React.Dispatch<React.SetStateAction<IVizConfig>>;
    error: IStatus | null;
    setError: React.Dispatch<React.SetStateAction<IStatus | null>>;
  };
}) => {
  const { vizConfig, setVizConfig, error, setError } = config;
  const serverUrl = process.env.GATSBY_API_URL;

  const [loadingGoals, setLoadingGoals] = React.useState<boolean>(false);
  const [loadingSummary, setLoadingSummary] = React.useState<boolean>(false);

  const [goals, setGoals] = React.useState<IGoal[] | null>(null);

  const summaryDivRef = React.useRef<HTMLDivElement>(null);
  const goalsDivRef = React.useRef<HTMLDivElement>(null);

  const { Dragger } = Upload;

  // console.log(vizConfig, "************* upload ***********");

  React.useEffect(() => {
    if (vizConfig.summary) {
      // console.log("summary fetched ....fetching goals");
      fetchGoals(vizConfig.summary);
      setTimeout(() => {
        scrollToElement(summaryDivRef);
      }, 700);
    }
  }, [vizConfig.summary]);

  const resetStates = () => {
    // console.log("resetting states .. goal, summary, config");
    setError(null);
    let config = Object.assign({}, vizConfig);
    config.goal = null;
    config.summary = null;
    setVizConfig(config);
  };

  const uploadFile = (file: any) => {
    resetStates();
    const formData = new FormData();
    formData.append("file", file, file.name);
    const url = `${serverUrl}/summarize`;
    console.log(url, formData)
    setLoadingSummary(true);
    fetch(url, {
      // Your POST endpoint
      method: "POST",
      body: formData,
    })
      .then(
        (response) => response.json() // if the response is a JSON object
      )
      .then((data) => {
        if (data.status) {
          setError(null);
          setLoadingSummary(false);
          // let config = Object.assign({}, vizConfig);
          // config.summary = data.summary;
          // config.goal = null;
          setVizConfig({
            ...vizConfig,
            summary: data.summary,
            goal: null,
          });
        } else {
          setError({ status: false, message: data.message });
          setLoadingSummary(false);
        }
      })
      .catch(
        (error) => {
          setLoadingSummary(false);
          console.log(error);
          setError({ status: false, message: error + "" });
        } // Handle the error response object
      );
  };

  const fetchGoals = (summary: any) => {
    const fetchGoalsUrl = `${serverUrl}/goal`;
    setError(null);
    setLoadingGoals(true);
    // const fetch;
    const payLoad = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        summary: summary,
        n: 5,
        textgen_config: vizConfig.textgen_config,
      }),
    };

    const onSuccess = (data: any) => {
      if (data && data.status) {
        message.success(data.message);
        setVizConfig({
          ...vizConfig,
          goal: data.data[0],
        });
        setGoals(data.data);
      } else {
        message.error(data.message);
      }
      setLoadingGoals(false);
    };
    const onError = (err: any) => {
      console.log(err);
      setError(err);
      message.error(err.message);
      setLoadingGoals(false);
    };
    fetchJSON(fetchGoalsUrl, payLoad, onSuccess, onError);
  };

  const props: UploadProps = {
    name: "file",
    multiple: false,
    maxCount: 1,
    beforeUpload: (file) => {
      uploadFile(file);
      return false;
    },

    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        // uploadFile(info.file);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div className="">
      <div className={`mb-2 `}>
        <div className={` md:pb-2   mb-6 `}>
          <div className="mb-2 ">
            <span className="font-semibold ">
              <ArrowUpOnSquareIcon className="inline-block h-5" /> Ready?
            </span>{" "}
            <span className="text-sm ">Upload a file to begin.</span>{" "}
          </div>

          <Dragger className=" " {...props}>
            <p className="ant-upload-drag-icon  flex justify-center">
              <InboxIcon className="h-10" />
            </p>
            <p className="px-2 ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="px-2 ant-upload-hint">
              Upload .json or .csv files to generate a visualization.
            </p>
          </Dragger>
        </div>

        <SamplesView
          config={{
            setLoadingSummary: setLoadingSummary,
            resetStates: resetStates,
            vizConfig: vizConfig,
            setVizConfig: setVizConfig,
            setError: setError,
          }}
        />
        {loadingSummary && (
          <div className="my-2 mt-6 text-xs">
            {" "}
            <span className="text-accent inline-block mr-2">
              {" "}
              <Icon icon={"loading"} size={5} />
            </span>{" "}
            Uploading data, generating summary ..{" "}
            <Skeleton active className="mt-4" paragraph={{ rows: 12 }} />
          </div>
        )}

        <SummaryView
          summaryConfig={{
            vizConfig: vizConfig,
            setVizConfig: setVizConfig,
            loadingSummary: loadingSummary,
          }}
        />
        <div ref={summaryDivRef}></div>

        <div className="mt-10 mb-32">
          {loadingGoals && (
            <div className="my-2 text-xs">
              {" "}
              <span className="text-accent inline-block mr-2">
                {" "}
                <Icon icon={"loading"} size={5} />
              </span>{" "}
              Generating data exploration goals for the data ..{" "}
              <Skeleton active className="mt-4" paragraph={{ rows: 12 }} />
            </div>
          )}
          <div ref={goalsDivRef}>
            <GoalView
              config={{
                goals: goals,
                vizConfig: vizConfig,
                setVizConfig: setVizConfig,
                loadingGoals: loadingGoals,
              }}
            />
          </div>

          {goals && (
            <VizGenView
              config={{
                vizConfig: vizConfig,
                setVizConfig: setVizConfig,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default DatasetSelectorView;
