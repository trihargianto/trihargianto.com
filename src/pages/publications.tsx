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
            Publications 📰
          </h1>

          {publications.map((item, index) => (
            <div
              key={`latest-article-${index}`}
              className="flex flex-row justify-between border-b-2 py-3 dark:border-b-gray-800"
            >
              <div>
                <a
                  href={item.link}
                  className="font-medium hover:underline"
                  target="__blank"
                  rel="noopener noreferrer"
                >
                  {item.title}
                </a>

                <p className="mt-1 text-sm text-slate-500">- {item.platform}</p>
              </div>

              <span className="hidden text-right text-slate-400 md:block md:w-40">
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
