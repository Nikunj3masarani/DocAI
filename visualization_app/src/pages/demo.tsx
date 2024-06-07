import * as React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import GenerateView from "../components/views/generate/generateindex";

// markup
const DemoPage = ({ data }: any) => {
  return (
    <Layout meta={data.site.siteMetadata} title="Demo" link={"/demo"}>
      <main className="">
        <div className="mb-6">
          <div>
            Lida provides a conversational interface for automatic generation of{" "}
            <span className="border-b border-accent">grammar-agnostic</span>{" "}
            visualizations (and infographics) from data!.{" "}
          </div>
        </div>
        <GenerateView />

        {/* <div className="mt-14 ">
          <div className="mt-10 text-2xl">
            System Description
            <span className="block xmt-2 text-sm">
              Learn more about how LIDA works
            </span>
          </div>
          <AboutPageView />
        </div> */}
      </main>
    </Layout>
  );
};

export const query = graphql`
  query HomePageQuery {
    site {
      siteMetadata {
        description
        title
      }
    }
  }
`;

export default DemoPage;
