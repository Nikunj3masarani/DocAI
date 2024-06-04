import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import * as React from "react";
import { HighLight } from "../../atoms";

const ArchitectureView = () => {
  const prefixPath = process.env.GATSBY_PREFIX_PATH_VALUE;
  return (
    <div className="mt-10 ">
      <div className="text-3xl   pt-4 mb-4 font-bold">System Architecture</div>
      <div className="  mb-4 mt-4 ">System architecture for LIDA</div>

      <div className="mt-10 bg-white rounded p-3">
        <img
          src={`${prefixPath}/files/lidamodules.jpg`}
          alt="Lida architecture"
        />
      </div>
      <div className="mt-2 text-sm flex">
        <div className="mt-1  "> Architecture for LIDA</div>
        <div className="mt-1 text-xs inline-block flex-1 text-right">
          <span className=" font-semibold">LLM</span> = Large Language Model |{" "}
          <span className="font-semibold">IGM</span> = Image Generation Model{" "}
        </div>
      </div>

      <div className="mt-10 bg-white rounded p-3">
        <img
          src={`${prefixPath}/files/infographics_small.jpg`}
          alt="Lida architecture"
        />
      </div>
      <div className="mt-1 text-sm ">
        {" "}
        Example infographics generated with LIDA
      </div>
    </div>
  );
};
export default ArchitectureView;
