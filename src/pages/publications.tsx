import React from "react";

import { publications } from "../../content/publications";
import SectionTitle from "../components-v2/01-atoms/SectionTitle";
import Navbar from "../components-v2/03-organisms/Navbar";
import Footer from "../components-v2/03-organisms/Footer";

const PublicationsPage = () => {
  return (
    <div className="mb-10">
      <Navbar />

      <div className="container mx-auto mt-5">
        <SectionTitle>Publications</SectionTitle>

        {publications.map((item, index) => (
          <div
            key={`latest-article-${index}`}
            className="flex flex-row justify-between border-b-2 py-3"
          >
            <a
              href={item.link}
              className="font-medium hover:underline"
              target="__blank"
              rel="noopener noreferrer"
            >
              {item.title}
            </a>

            <span className="hidden text-slate-400 md:block">{item.date}</span>
          </div>
        ))}

        <Footer />
      </div>
    </div>
  );
};

export default PublicationsPage;
