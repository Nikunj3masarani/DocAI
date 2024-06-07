import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Collapse } from "antd";
import * as React from "react";

const { Panel } = Collapse;
const FAQView = () => {
  const prefixPath = process.env.GATSBY_PREFIX_PATH_VALUE;
  const limitations = (
    <div className="text-base p-4 bg-secondalry rounded">
      <div className="mb-2">
        <InformationCircleIcon className="w-4 h-4 inline-block mr-2" />
        LIDA may not work well for visualization grammars that are not well
        represented in the LLM's training dataset. Similarly, we will likely see
        improved performance on datasets that resemble example datasets
        available online.{" "}
      </div>
      <div className="mb-2">
        <InformationCircleIcon className="w-4 h-4 inline-block mr-2" />
        Performance is bottlenecked by the choice of visualization libraries
        used and degrees of freedom accorded the model in generating
        visualizations (e.g., a strict scaffold constrained to only
        visualization generation vs a generation scaffold with access to
        multiple libraries and general code writing capabilities).
      </div>

      <div className="mb-2">
        <InformationCircleIcon className="w-4 h-4 inline-block mr-2" /> LIDA
        currently requires code execution. While effort is made to constrain the
        scope of generated code (via scaffolding), a sandbox environment is
        recommended to ensure safe code execution.
      </div>

      <div className="mt-6 text-right">
        <a
          target={"_blank"}
          rel="noopener noreferrer"
          aria-label="Learn more in the paper"
          href="https://aclanthology.org/2023.acl-demo.11/"
          className="text-sm font-semibold leading-6 text-accent"
        >
          Learn more in the paper <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );

  const howbuilt = (
    <div className="text-base p-4 bg-secondarly rounded">
      <div className="mb-2">
        <InformationCircleIcon className="w-4 h-4 inline-block mr-2" />
        LIDA is built as a standalone python library with classes that implement
        the core modules. It currently works with the chatgpt line of models
        (gpt-turbo-3.5). Future work will look towards integrating more complex
        LLM toolchains such as Semantic Kernel or Guidance.{" "}
      </div>
      <div className="mt-4   text-right">
        <a
          target={"_blank"}
          rel="noopener noreferrer"
          href="https://aclanthology.org/2023.acl-demo.11/"
          className="text-sm font-semibold leading-6 text-accent"
        >
          Learn more in the paper <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );

  const sourceCode = (
    <div className="text-base p-4 bg-secondarly rounded">
      <div className="mb-2">
        <InformationCircleIcon className="w-4 h-4 inline-block mr-2" />
        LIDA is packaged as a python library and it is also open source! You can
        install and run on your local machine or modify the code on{" "}
        <a
          target={"_blank"}
          rel="noopener noreferrer"
          href="https://github.com/microsoft/lida"
          className="text-sm font-semibold leading-6 text-accent"
        >
          Github <span aria-hidden="true">→</span>
        </a>
        <div className="mt-4   text-right">
          <a
            target={"_blank"}
            rel="noopener noreferrer"
            href="https://aclanthology.org/2023.acl-demo.11/"
            className="text-sm font-semibold leading-6 text-accent"
          >
            Learn more in the paper <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-14">
      <div className="text-3xl mb-4 font-semibold"> FAQ </div>
      <div className="border border-secondary rounded">
        <Collapse bordered={false} defaultActiveKey={["1"]}>
          <Panel
            header={
              <div className="font-semibold text-lg">
                What are known limitations?
              </div>
            }
            key="1"
          >
            {limitations}
          </Panel>
          <Panel
            header={
              <div className="font-semibold text-lg">How is this built?</div>
            }
            key="2"
          >
            {howbuilt}
          </Panel>

          <Panel
            header={<div className="font-semibold text-lg"> Source Code? </div>}
            key="3"
          >
            {sourceCode}
          </Panel>
          {/* <Panel header="This is panel header 3" key="3">
            {text}
          </Panel> */}
        </Collapse>
      </div>
    </div>
  );
};
export default FAQView;
