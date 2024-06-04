import * as React from "react";
import GenerateView from "../generate/generateindex";

const AboutPageView = () => {
  return (
    // <div className="text-primary mb-6   ">
    //   <UpdatesBanner>
    //     <span>
    //       {updates[0]["update"]}.{" "}
    //       <span className="font-semibold text-sm mx-1 inline-block">
    //         {updates[0]["date"]}
    //       </span>{" "}
    //       <a
    //         className="inline-block ml-1 hover:underline text-accent"
    //         href={updates[0]["link"]}
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Learn more.
    //       </a>
    //     </span>
    //   </UpdatesBanner>
    //   <AbstractView />
    //   <FeaturesView />
    //   <ArchitectureView />
    //   <FAQView />
    //   <BibTexView />
    //   <UpdatesView />
    //   {/* <GalleryView /> */}
    // </div>
    <main className="mx-auto max-w-7xl MT-5">
      <div className="mb-6">
        <div>
          App provides a conversational interface for automatic generation of
          visualizations from data!
        </div>
      </div>
      <GenerateView />
    </main>
  );
};
export default AboutPageView;
