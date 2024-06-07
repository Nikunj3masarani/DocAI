import * as React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";
import AboutPageView from "../components/views/about";

// markup
const IndexPage = ({ data }: any) => {
  return (
    <Layout
      meta={data.site.siteMetadata}
      title="LIDA: Automated Visualizations with LLMs"
      link={"/"}
    >
      <main className="">
        <div className="hidden mb-6">
          <div className="">
            Lida provides a conversational interface for automatic generation of{" "}
            <span className="border-b border-accent">grammar-agnostic</span>{" "}
            visualizations (and infographics) from data!.{" "}
          </div>
        </div>
        <AboutPageView />
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

export default IndexPage;
