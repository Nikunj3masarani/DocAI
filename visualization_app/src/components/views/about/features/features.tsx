import {
    ChartPieIcon,
    LanguageIcon,
    PhotoIcon,
    LightBulbIcon,
    AcademicCapIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    WrenchScrewdriverIcon,
    QueueListIcon,
    PlayIcon,
  } from "@heroicons/react/24/outline";
  import * as React from "react";
  import { HighLight } from "../../../atoms";
  
  const FeaturesView = () => {
    const prefixPath = process.env.GATSBY_PREFIX_PATH_VALUE;
    const features = [
      {
        name: "Data Summarization",
        description: (
          <div>
            Datasets can be massive. LIDA summarizes data into a{" "}
            <HighLight>compact but information dense</HighLight> natural language
            representation used as grounding context for all subsequent
            operations.
          </div>
        ),
        href: "#",
        icon: LightBulbIcon,
      },
      {
        name: "Automated Data Exploration",
        description: (
          <div>
            Unfamiliar with a dataset? LIDA provides a fully automated mode that
            generates meaningful <HighLight>visualization goals</HighLight> based
            on the dataset. EDA for free.
          </div>
        ),
        href: "#",
        icon: LightBulbIcon,
      },
      {
        name: "Grammar-Agnostic Visualizations",
        description: (
          <div>
            Want visualizations created in python in Altair, Matplotlib, Seaborn
            etc? How about R, C++ ? LIDA is{" "}
            <HighLight>grammar agnostic</HighLight> i.e., can generate
            visualizations in any grammar represented as code.
          </div>
        ),
        href: "#",
        icon: ChartPieIcon,
      },
  
      {
        name: "Infographics Generation",
        description: (
          <div>
            Convert data into rich, embellished, engaging{" "}
            <HighLight>stylized infographics</HighLight> using image generation
            models. Think data stories, personalization (brand, style, marketing
            etc.)?
          </div>
        ),
        href: "#",
        icon: PhotoIcon,
      },
    ];
  
    const [playVideo, setPlayVideo] = React.useState(false);
  
    // React.useEffect(() => {
    //   console.log("features", window.gtag);
    // }, []);
  
    const vizOpsFeatures = [
      {
        name: "Visualization Explanation ",
        description: (
          <div>
            {" "}
            Get <HighLight>detailed descriptions</HighLight> of visualization
            code. This has applications in accessibility, data literacy,
            education, and debugging/sensemaking of visualizations.{" "}
          </div>
        ),
        href: "#",
        icon: ChatBubbleOvalLeftEllipsisIcon,
      },
      {
        name: "Self-Evaluation",
        description: (
          <div>
            LLMs like GPT-3.5 and GPT-4{" "}
            <HighLight>encode visualization best practices</HighLight>. LIDA
            applies these capabilities in generating multi-dimensional evaluation
            scores for visualizations represented as code.
          </div>
        ),
        href: "#",
        icon: AcademicCapIcon,
      },
      {
        name: "Visualization Repair",
        description: (
          <div>
            LIDA provides methods to automatically improve visualizations (via
            self-evaluation feedback) or repair visualizations based on user
            provided or compile feedback.
          </div>
        ),
        href: "#",
        icon: WrenchScrewdriverIcon,
      },
  
      {
        name: "Visualization Recommendations",
        description: (
          <div>
            Given some context (goals, or an existing visualization), LIDA can
            recommend additional visualizations that may be useful to the user
            (e.g., for comparison, or to provide additional perspectives).
          </div>
        ),
        href: "#",
        icon: QueueListIcon,
      },
    ];
  
    const getFeatureList = (feats: any) => {
      return feats.map((feature: any) => {
        return (
          <div key={"feature_name" + feature.name} className="flex flex-col">
            <div className="text-base font-semibold leading-7 text-primary">
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              {feature.name}
            </div>
            <div className="mt-1 flex flex-auto flex-col text-base leading-7 text-primary">
              <div className="flex-auto">{feature.description}</div>
            </div>
          </div>
        );
      });
    };
  
    return (
      <div className="mt-10 ">
        <div className="text-3xl mb-4 font-semibold">
          {" "}
          Features - What Can You Do with LIDA?{" "}
        </div>
  
        <div className="mt-4 mb-6 rounded">
          <div className="mb-4 text-xs">
            {" "}
            Click on the video below for an overview of the capabilities of the
            LIDA user interface.
          </div>
        </div>
  
        <div
          onClick={() => setPlayVideo(true)}
          role="button"
          tabIndex={0}
          className="relative group mb-6"
        >
          {/* add a dark background overlay behind play button   */}
          {!playVideo && (
            <div>
              <img
                alt="Lida video screenshot"
                className="w-full rounded"
                src={`${prefixPath}/images/videoscreen.png`}
              />
              <div className="rounded group-hover:opacity-10  duration-500  absolute inset-0 bg-black opacity-40"></div>
  
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="inline-flex   items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-700 hover:brightness-110 duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent">
                  <PlayIcon className="-ml-1 mr-3 h-7 w-7" aria-hidden="true" />
                  Watch Video
                </div>
              </div>
            </div>
          )}
          {playVideo && (
            <div>
              <div
                // style="padding:56.25% 0 0 0;position:relative;"
                style={{ padding: "56.25% 0 0 0", position: "relative" }}
              >
                <iframe
                  src="https://player.vimeo.com/video/820968433?h=a7652e817e&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;dnt=1&amp;autoplay=1&amp"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  // style="position:absolute;top:0;left:0;width:100%;height:100%;"
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                  }}
                  className="rounded"
                  title="LIDA: Automatic Generation of Grammar Agnostic Visualizations and Infographics with Large Language Models"
                ></iframe>
              </div>
              <script src="https://player.vimeo.com/api/player.js"></script>
            </div>
          )}
        </div>
  
        <div className="text-base">
          {" "}
          LIDA leverages the language modeling and code writing capabilities of
          state-of-the-art LLMs in enabling core automated visualization
          capabilities (data summarization, goal exploration, visualization
          generation, infographics generation) as well as operations on existing
          visualizations (visualization explanation, self-evaluation, automatic
          repair, recommendation).
        </div>
  
        <div className="  py-6  ">
          <div className="     ">
            <div className="">
              <div className="mb-4">
                {" "}
                <span className="inline-block text-accent font-semibold mr-2">
                  {" "}
                  AutoViz{" "}
                </span>
                Core automated visualization capabilities{" "}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16   md:grid-cols-4 ">
                {getFeatureList(features)}
              </div>
            </div>
  
            <div className="mt-4">
              <div className="mb-4">
                {" "}
                <span className="inline-block text-accent font-semibold mr-2">
                  {" "}
                  VizOps{" "}
                </span>
                Operations on Generated Visualizations{" "}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-16   md:grid-cols-4 ">
                {getFeatureList(vizOpsFeatures)}
              </div>
            </div>
            <div className="mt-6">
              <a
                target={"_blank"}
                aria-label="Learn more in the paper"
                rel="noopener noreferrer"
                href="https://aclanthology.org/2023.acl-demo.11/"
                className="text-sm font-semibold leading-6 text-accent"
              >
                Learn more in the paper <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default FeaturesView;
  