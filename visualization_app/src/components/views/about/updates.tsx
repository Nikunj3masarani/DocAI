import * as React from "react";
import { CodeBlock } from "../chartview/codeblock";
import { updates } from "../../../data/updates";
const UpdatesView = () => {
  const updateList = updates.map((x, i) => {
    return (
      <div key={"updaterow" + i}>
        <div className="inline-block">
          <span className="font-semibold mr-2">{x.date}</span>
          {x.update}
        </div>
        <a
          className="inline-block ml-2 text-accent"
          href={x.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          learn more.
        </a>
      </div>
    );
  });
  return (
    <div className="mt-14">
      <div className="text-3xl mb-4 font-semibold"> Updates </div>
      <div>{updateList}</div>
    </div>
  );
};
export default UpdatesView;
