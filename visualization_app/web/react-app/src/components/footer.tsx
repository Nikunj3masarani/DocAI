import * as React from "react";
import Icon from "./icons";

const Footer = () => {
  return (
    <div className="mt-4 text-primary text-sm p-3  mb-6 border-t border-secondary ">
      <div>
        <span className="text-accent inline-block mr-1">
          {" "}
          <Icon icon="app" size={5} />
        </span>{" "}
        Made at{" "}
        <a
          target={"_blank"}
          aria-label="Microsoft Research"
          rel={"noopener noreferrer"}
          className="underlipne inline-block border-accent border-b hover:text-accent"
          href="https://www.microsoft.com/en-us/research/project/lida-automatic-generation-of-grammar-agnostic-visualizations/"
        >
          {" "}
          Microsoft Research.
        </a>
        <a
          target={"_blank"}
          aria-label="Privacy & Cookies"
          rel={"noopener noreferrer"}
          className="ml-3 inline-block border-accent border-b hover:text-accent"
          href=" https://privacy.microsoft.com/en-us/privacystatement/"
        >
          {" "}
          Privacy & Cookies
        </a>
      </div>
    </div>
  );
};
export default Footer;
