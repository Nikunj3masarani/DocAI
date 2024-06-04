import {
    ChatBubbleBottomCenterTextIcon,
    BookmarkSquareIcon,
    LightBulbIcon,
  } from "@heroicons/react/24/outline";
  import { message } from "antd";
  import * as React from "react";
  import { Card, CollapseBox, LaunchButton } from "../../../atoms";
  import Icon from "../../../icons";
  import { IGoal, IVizConfig } from "../../../types";
  const GoalView = ({
    config,
  }: {
    config: {
      goals: any;
      setVizConfig: any;
      vizConfig: IVizConfig;
      loadingGoals: any;
    };
  }) => {
    const { goals, setVizConfig, vizConfig, loadingGoals } = config;
    const [selectedGoal, setSelectedGoal] = React.useState<number | null>(0);
  
    const goalDivWidth = 280;
    React.useEffect(() => {
      if (!vizConfig.goal) {
        setSelectedGoal(0);
      }
    }, [vizConfig.goal]);
  
    const goalsList = goals?.map((goal: IGoal, i: number) => {
      const isActive = selectedGoal === i;
      return (
        <div
          role={"button"}
          onClick={() => {
            setVizConfig({
              ...vizConfig,
              goal: goal,
            });
            setSelectedGoal(i);
          }}
          key={i}
          style={{ width: goalDivWidth + "px" }}
          className={`inline-block mb-3 bg-secondary p-2 break-inside-avoid  text-sm  rounded border  ${
            isActive ? " border-accent" : "border-transparent"
          }`}
        >
          <div className={` `} />
          <>
            <div className="text-base leading-5 break-words">
              {" "}
              <span
                className="pr-2   text-base font-semibold m-1 inline-block border-r-2 border-accent
              "
              >
                {i + 1}
              </span>{" "}
              {goal.question}
            </div>
            {
              <>
                <div className="  mt-2 text-accent break-all ">
                  {goal.visualization}
                </div>
                <div className="  text-gray-500 break-word">{goal.rationale}</div>
              </>
            }
          </>
        </div>
      );
    });
    return (
      <div className=" mt-10">
        {goals && !loadingGoals && vizConfig.summary && (
          <div className=" ">
            <div className="font-semibold text-xl  mb-2 text-secopndary">
              <LightBulbIcon className="inline-block h-5" /> Goal Exploration
            </div>
            <div className=" my-2 text-secondary text-xs">
              A list of automatically generated data exploration goals
              (hypothesis) based on the data summary above.
            </div>
            <CollapseBox title={`Goals (${goals.length})`} open={true}>
              {/* <div className="columns-3 gap-3 md:columns-4 xl:columns-5 2xl:columns-6">
                {goalsList}
              </div> */}
              <div className=" overflow-auto scroll">
                <div
                  className=" flex gap-3"
                  style={{ width: (goalDivWidth + 10) * goalsList.length + "px" }}
                >
                  {goalsList}
                </div>
              </div>
            </CollapseBox>
            <div className="mt-2 hidden">
              <LaunchButton
                onClick={() => {
                  message.info("Feature in development");
                }}
              >
                Story{" "}
                <BookmarkSquareIcon className="inline-block h-5 mr-2 -mt-1" />
              </LaunchButton>{" "}
              <span className="mt-1 text-xs block">
                {" "}
                Generate a story based on these goals.{" "}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };
  export default GoalView;
  