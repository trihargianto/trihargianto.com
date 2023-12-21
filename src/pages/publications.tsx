import React from "react";

import { publications } from "../../content/publications";
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
          <h1 className="mb-8 text-3xl font-semibold sm:text-4xl">
            Publications
          </h1>

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
