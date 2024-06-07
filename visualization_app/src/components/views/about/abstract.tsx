import {
    DocumentTextIcon,
    PresentationChartBarIcon,
  } from "@heroicons/react/24/outline";
  import { Link } from "gatsby";
  import * as React from "react";
  import { HighLight } from "../../atoms";
  import Icon from "../../icons";
  import GitHubButton from "react-github-btn";
  
  const AbstractView = () => {
    const prefixPath = process.env.GATSBY_PREFIX_PATH_VALUE;
    const isDemo = process.env.GATSBY_DEMO === "true";
    return (
      <div className="mt-10 ">
        <div className="bg-white rounded  pb-20 border">
          <main>
            <div className="relative isolate">
              <svg
                className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                    width={200}
                    height={200}
                    x="50%"
                    y={-1}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M.5 200V.5H200" fill="none" />
                  </pattern>
                </defs>
                <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                  <path
                    d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                    strokeWidth={0}
                  />
                </svg>
                <rect
                  width="100%"
                  height="100%"
                  strokeWidth={0}
                  fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)"
                />
              </svg>
              <div
                className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
                aria-hidden="true"
              >
                <div
                  className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                  style={{
                    clipPath:
                      "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)",
                  }}
                />
              </div>
              <div className="overflow-hidden">
                <div className="mx-auto max-w-7xl px-6 pb-16 pt-16 sm:pt-16 lg:px-8 ">
                  <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                    <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        Automatic Generation of Visualizations and Infographics
                        with LLMs
                      </h1>
                      <div className="text-gray-600 mt-2">
                        Works with any programming language or visualization
                        grammar{" "}
                        <div className="mt-2">
                          <GitHubButton
                            href="https://github.com/microsoft/lida"
                            data-size="large"
                            data-show-count="true"
                            aria-label="Star microsoft/lida on GitHub"
                          >
                            Star
                          </GitHubButton>
                        </div>
                      </div>
  
                      <div className="mt-10 flex items-center gap-x-6">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://aclanthology.org/2023.acl-demo.11/"
                          className="rounded-md bg-green-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:text-white hover:brightness-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                        >
                          <DocumentTextIcon className="h-5 w-5 inline-block mr-2" />
                          Read the Paper
                        </a>
                        {isDemo && (
                          <Link
                            className="text-sm font-semibold leading-6 text-gray-900"
                            to="/demo"
                          >
                            {" "}
                            <PresentationChartBarIcon className="h-5 w-5 inline-block mr-2" />
                            Live demo <span aria-hidden="true">→</span>
                          </Link>
                        )}
  
                        <a
                          className="text-sm font-semibold leading-6 text-gray-900"
                          href="https://github.com/microsoft/lida"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {" "}
                          <Icon icon="github" size={5} className="mr-2" />
                          Code on GitHub <span aria-hidden="true">→</span>
                        </a>
                      </div>
                      <div className="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                        <div className="text-lg">
                          Systems that support users in the automatic creation of
                          visualizations must address several subtasks -
                          understand the semantics of data, enumerate relevant
                          visualization goals and generate visualization
                          specifications. In this work, we{" "}
                          <HighLight>
                            <>
                              pose visualization generation as a multi-stage
                              generation problem{" "}
                            </>
                          </HighLight>{" "}
                          and argue that well-orchestrated pipelines based on
                          large language models (LLMs) and image generation models
                          (IGMs) are suitable to addressing these tasks. We
                          present LIDA, a novel tool for generating
                          grammar-agnostic visualizations and infographics. LIDA
                          comprises of 4 modules - A SUMMARIZER that converts data
                          into a rich but compact natural language summary, a GOAL
                          EXPLORER that enumerates visualization goals given the
                          data, a VISGENERATOR that generates, refines, executes
                          and filters visualization code and an INFOGRAPHER module
                          that yields data-faithful stylized graphics using IGMs.
                          LIDA provides a python api, and a hybrid user interface
                          (direct manipulation and{" "}
                          <HighLight>multilingual</HighLight> natural language)
                          for interactive chart, infographics and data story
                          generation.
                        </div>
  
                        <div className=" inline-block mt-6  ">
                          {" "}
                          <div className="text-sm mb-1 text-gray-500">
                            {" "}
                            Install via pip
                          </div>
                          <div className="text-gray-400 bg-gray-800 px-4 p-1 rounded pr-10">
                            pip install <span className="text-white">lida</span>
                          </div>
                        </div>
                      </div>
                    </div>
  
                    <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                      <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                        <div className="relative">
                          <img
                            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                            alt="lida home page image"
                            className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                          />
                          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                        </div>
                      </div>
                      <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                        <div className="relative">
                          <img
                            src="https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                            alt="lida home page image"
                            className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                          />
                          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                        </div>
                        <div className="relative">
                          <img
                            src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=396&h=528&q=80"
                            alt="lida home page image"
                            className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                          />
                          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                        </div>
                      </div>
                      <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                        <div className="relative">
                          <img
                            src="https://images.unsplash.com/photo-1670272504528-790c24957dda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=left&w=400&h=528&q=80"
                            alt="lida home page image"
                            className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                          />
                          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                        </div>
                        <div className="relative">
                          <img
                            src="https://images.unsplash.com/photo-1670272505284-8faba1c31f7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"
                            alt="lida home page image"
                            className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                          />
                          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  };
  export default AbstractView;
  