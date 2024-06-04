import * as React from "react";
import { CodeBlock } from "../chartview/codeblock";

const BibTexView = () => {
  const bib = `@article{dibia2023lida,
    title={LIDA: A Tool for Automatic Generation of Grammar-Agnostic Visualizations and Infographics using Large Language Models},
    author={Victor Dibia},
    year={2023},
    booktitle = "Proceedings of the 61th Annual Meeting of the Association for Computational Linguistics: System Demonstrations",
    publisher = "Association for Computational Linguistics",
    month={March}, 
    day={6},
    eprint={2303.02927},
    archivePrefix={arXiv},
    primaryClass={cs.AI}
}`;

  return (
    <div className="mt-14">
      <div className="text-3xl mb-4 font-semibold"> BibTex</div>

      <div className="mb-3">
        {" "}
        A paper on LIDA is{" "}
        <a
          href="https://arxiv.org/abs/2303.02927"
          target="_blank"
          rel="noreferrer"
          className="text-green-700 underline inline-block "
        >
          available on arxiv
        </a>{" "}
        and has been accepted at the 2023 ACL Conference (System
        Demonstrations).
      </div>
      <div className="overflow-auto p-3 pr-1 bg-secondary rounded ">
        <CodeBlock code={bib} language="bibtex" wrapLines={true} className="" />
      </div>
    </div>
  );
};
export default BibTexView;
