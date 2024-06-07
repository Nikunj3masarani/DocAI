import * as React from "react";
import Header from "./header";
import { appContext } from "../hooks/provider";
import LoginView from "./login";
import Footer from "./footer";
import { SEO } from "./seo";
// import { getBrowserFingerprint } from "./utils";

type Props = {
  title: string;
  link: string;
  children?: React.ReactNode;
  showHeader?: boolean;
  restricted?: boolean;
  meta?: any;
};

const Layout = ({
  meta,
  title,
  link,
  children,
  showHeader = true,
  restricted = false,
}: Props) => {
  const LayoutView = ({ darkMode }: { darkMode: string }) => {
    React.useEffect(() => {
      document.getElementsByTagName("html")[0].className = `${
        darkMode === "dark" ? "dark bg-primary" : "light bg-primary"
      } `;
    }, [darkMode]);

    return (
      <div className={` flex flex-col`}>
        <div className="flex-1 text-primary">
          {/* <title>{meta?.title + " | " + title}</title> */}
          <SEO title="Visualization App" description={meta?.description} />
          {/* {showHeader && <Header meta={meta} link={link} />} */}

          {/* <CookieBanner /> */}
          <div>{children}</div>
        </div>
        {/* <Footer /> */}
      </div>
    );
  };
  return (
    <appContext.Consumer>
      {(context: any) => {
        if (restricted) {
          return (
            <div className="h-screen bg-yellow-100 ">
              {context.user && <LayoutView darkMode={context.darkMode} />}
              {!context.user && <LoginView meta={meta} />}
            </div>
          );
        } else {
          return <LayoutView darkMode={context.darkMode} />;
        }
      }}
    </appContext.Consumer>
  );
};

export default Layout;
