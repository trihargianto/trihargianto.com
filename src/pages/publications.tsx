import React from "react";

import { publications } from "../../content/publications";
import SectionTitle from "../components/01-atoms/SectionTitle";
import NavigationBar from "../components/03-organisms/NavigationBar";
import Footer from "../components/03-organisms/Footer";
import SEO from "../components/02-molecules/SEO";

const PublicationsPage = () => {
  return (
    <>
      <SEO title="Publications" />

      <div className="mb-10">
        <NavigationBar />

        <div className="container mx-auto mt-5">
          <SectionTitle>Publications</SectionTitle>

          {publications.map((item, index) => (
            <div
              key={`latest-article-${index}`}
              className="flex flex-row justify-between border-b-2 py-3 dark:border-b-gray-800"
            >
              <a
                href={item.link}
                className="font-medium hover:underline"
                target="__blank"
                rel="noopener noreferrer"
              >
                {item.title}
              </a>

              <span className="hidden text-slate-400 md:block">
                {item.date}
              </span>
            </div>
          ))}

          <Footer />
        </div>
      </div>
    </>
  );
};

export default PublicationsPage;
