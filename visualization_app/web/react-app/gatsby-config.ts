import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `lida`,
    siteUrl: `https://microsoft.github.io/lida/`,
    twitterUsername: "@Microsoft",
    image: "src/images/favicon.png",
  },
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/favicon.png",
      },
    },
    "gatsby-plugin-postcss", // Add this line
  ],
};

export default config;
