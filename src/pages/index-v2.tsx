import React from "react";
import GreetingCard from "../components-v2/02-molecules/GreetingCard";
import LatestArticle from "../components-v2/03-organisms/LatestArticle";
import LatestProject from "../components-v2/03-organisms/LatestProject";
import Navbar from "../components-v2/03-organisms/Navbar";

const IndexV2 = () => (
  <div className="mb-10">
    <Navbar />

    <div className="container mx-auto mt-5">
      <GreetingCard />

      <LatestArticle className="mt-14" />

      <LatestProject className="mt-14" />
    </div>
  </div>
);

export default IndexV2;
