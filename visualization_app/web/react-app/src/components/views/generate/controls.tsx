import {
    AdjustmentsVerticalIcon,
    Cog6ToothIcon,
  } from "@heroicons/react/24/outline";
  import { Button, Checkbox, Input, Modal, Select, Slider } from "antd";
  import * as React from "react";
  import { SecondaryButton } from "../../atoms";
  import { ITextGeneratorConfig, IVizConfig } from "../../types";
  import { get, set } from "lodash";
  
  const GeneratorControlsView = ({
    config,
    models,
  }: {
    config: {
      vizConfig: IVizConfig;
      setVizConfig: React.Dispatch<React.SetStateAction<IVizConfig>>;
    };
    models: any;
  }) => {
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [modelOptions, setModelOptions] = React.useState<any>([]);
    const [selectedProvider, setSelectedProvider] = React.useState<number>(0);
    const [selectedModel, setSelectedModel] = React.useState<number>(0);
  
    const { vizConfig, setVizConfig } = config;
    const textgen_config = vizConfig.textgen_config;
  
    const providers = Object.keys(models);
  
    const provider_options = providers.map((provider: string, index: number) => {
      return { label: provider, value: provider, key: index };
    });
  
    const getOptions = (models: any) => {
      return (
        models?.models.map((model: any, index: number) => {
          let name = model.name;
          if (
            model &&
            model.model &&
            model.model.parameters &&
            model.model.parameters.model
          ) {
            name = model.model.parameters.model;
          }
          return {
            label: name,
            value: name,
            key: index,
          };
        }) || []
      );
    };
    const model_options = getOptions(models[providers[selectedProvider]]);
    // const model_options =
    //   models[providers[selectedProvider]]?.models.map(
    //     (model: any, index: number) => {
    //       console.log("model", model);
    //       let name = model.name;
    //       if (
    //         model &&
    //         model.model &&
    //         model.model.parameters &&
    //         model.model.parameters.model
    //       ) {
    //         console.log(
    //           "model.model.parameters.model",
    //           model.model.parameters.model
    //         );
    //         name = model.model.parameters.model;
    //       }
    //       return {
    //         label: name,
    //         value: name,
    //         key: index,
    //       };
    //     }
    //   ) || [];
  
    // console.log("model_options", model_options);
  
    const selectedMaxTokens =
      models[providers[selectedProvider]].models[selectedModel]?.max_tokens;
  
    const ControlRowView = ({
      title,
      description,
      value,
      control,
      className,
    }: any) => {
      return (
        <div className={`${className}`}>
          <div>
            <span className="text-primary inline-block">{title} </span>
            <span className="text-xs ml-1 text-accent -mt-2 inline-block">
              {value}
            </span>
          </div>
          <div className="text-secondary text-xs"> {description} </div>
          {control}
        </div>
      );
    };
  
    return (
      <div className="text-secondary rounded p">
        <Modal
          width={800}
          title={
            <span>
              <AdjustmentsVerticalIcon className="h-4 text-accent inline-block mr-2 -mt-1" />
              Generation Settings
            </span>
          }
          open={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
          }}
          onOk={() => {
            setIsModalVisible(false);
          }}
        >
          <div className="flex gap-3 ">
            <div className="w-1/2">
              <ControlRowView
                title="Model Provider"
                description="Model provider e.g. openai, huggingface etc"
                value={textgen_config.provider}
                control={
                  <Select
                    labelInValue
                    className="mt-2 w-full"
                    defaultValue={{
                      label: textgen_config.provider,
                      value: textgen_config.provider || "openai",
                      key: providers.indexOf(textgen_config.provider || "openai"),
                    }}
                    onChange={(value: {
                      label: React.ReactNode;
                      value: string;
                      key: number;
                    }) => {
                      setVizConfig({
                        ...vizConfig,
                        textgen_config: {
                          ...textgen_config,
                          provider: value.value,
                          model: getOptions(models[value.value])[0].value,
                          max_tokens: null,
                        },
                      });
                      setSelectedProvider(value.key);
                      console.log("selected model", value);
                    }}
                    options={provider_options}
                  />
                }
              />
              <ControlRowView
                title="Model"
                className="mt-2"
                description="The model to use for generation."
                value={textgen_config.model}
                control={
                  <Select
                    labelInValue
                    className="mt-2 w-full"
                    defaultValue={{
                      label: textgen_config.model,
                      value:
                        textgen_config.model ||
                        getOptions(models[providers[selectedProvider]])[0].value,
                      key: selectedModel,
                    }}
                    onChange={(value: {
                      label: React.ReactNode;
                      value: string;
                      key: number;
                    }) => {
                      setVizConfig({
                        ...vizConfig,
                        textgen_config: { ...textgen_config, model: value.value },
                      });
                      setSelectedModel(value.key);
                    }}
                    options={model_options}
                  />
                }
              />
            </div>
            <div className="w-1/2">
              <ControlRowView
                title="Max Tokens"
                description="Maximum number of tokens to generate."
                value={textgen_config.max_tokens}
                control={
                  <Slider
                    min={128}
                    max={
                      models[providers[selectedProvider]].models[selectedModel]
                        ?.max_tokens || 1024
                    }
                    defaultValue={textgen_config.max_tokens || 0}
                    step={64}
                    onAfterChange={(value) => {
                      setVizConfig({
                        ...vizConfig,
                        textgen_config: { ...textgen_config, max_tokens: value },
                      });
                    }}
                  />
                }
              />
  
              <ControlRowView
                title="Temperature"
                description="The higher the temperature, the crazier the text."
                value={textgen_config.temperature}
                control={
                  <Slider
                    min={0}
                    max={1.0}
                    defaultValue={textgen_config.temperature}
                    step={0.1}
                    onAfterChange={(value) => {
                      setVizConfig({
                        ...vizConfig,
                        textgen_config: { ...textgen_config, temperature: value },
                      });
                    }}
                  />
                }
              />
  
              <ControlRowView
                title="Number Messages"
                description="The number of responses to generate."
                value={textgen_config.n}
                control={
                  <Slider
                    min={1}
                    max={10}
                    defaultValue={textgen_config.n}
                    step={1}
                    onAfterChange={(value) => {
                      setVizConfig({
                        ...vizConfig,
                        textgen_config: { ...textgen_config, n: value },
                      });
                    }}
                  />
                }
              />
  
              <ControlRowView
                title="Presence Penalty"
                description="Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics."
                value={textgen_config.presence_penalty}
                control={
                  <Slider
                    min={-2.0}
                    max={2.0}
                    defaultValue={textgen_config.presence_penalty}
                    step={0.1}
                    onAfterChange={(value) => {
                      setVizConfig({
                        ...vizConfig,
                        textgen_config: {
                          ...textgen_config,
                          presence_penalty: value,
                        },
                      });
                    }}
                  />
                }
              />
  
              <ControlRowView
                title="Frequency Penalty"
                description="Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics."
                value={textgen_config.frequency_penalty}
                control={
                  <Slider
                    min={-2.0}
                    max={2.0}
                    defaultValue={textgen_config.frequency_penalty}
                    step={0.1}
                    onAfterChange={(value) => {
                      setVizConfig({
                        ...vizConfig,
                        textgen_config: {
                          ...textgen_config,
                          frequency_penalty: value,
                        },
                      });
                    }}
                  />
                }
              />
            </div>
          </div>
  
          <p className="mt-4 text-xs text-secondary">
            {" "}
            Learn more about OpenAI model parameters{" "}
            <a
              className="border-b border-accent hover:text-accent "
              target={"_blank"}
              rel={"noopener noreferrer"}
              aria-label="OpenAI API Docs"
              href={"https://platform.openai.com/docs/api-reference/chat"}
            >
              here
            </a>
            .
          </p>
        </Modal>
  
        <div className="mb-3 text-secondary md:flex gap-3 grid">
          {" "}
          <div className="mb-4 flex-1">
            <div className="text-xs mb-2">
              {" "}
              Select a visualization library/grammar
            </div>
            <Select
              defaultValue={vizConfig.library}
              style={{ width: 220 }}
              onChange={(value: string) => {
                setVizConfig({ ...vizConfig, library: value });
              }}
              options={[
                { label: "Altair", value: "altair" },
                { label: "Matplotlib", value: "matplotlib" },
                { label: "Seaborn", value: "seaborn" },
                { label: "GGPlot", value: "ggplot" },
              ]}
            />
          </div>
          <div className="  text-right">
            <SecondaryButton
              onClick={() => {
                setIsModalVisible(true);
              }}
            >
              <AdjustmentsVerticalIcon className="h-4 text-accent inline-block mr-2 -mt-1" />
              Generation Settings{" "}
            </SecondaryButton>
            <div className="opacity-80 text-xs mt-2">
              Model: <span className="text-accent"> {textgen_config.model}</span>,
              n:
              <span className="text-accent"> {textgen_config.n}</span>, number of
              Temperature:{" "}
              <span className="text-accent"> {textgen_config.temperature}</span>{" "}
              ...
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default GeneratorControlsView;
  