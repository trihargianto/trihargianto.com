import React from "react";

import Layout from "../components/04-templates/Layout";
import PublicationList from "../components/03-organisms/PublicationList";
import SEO from "../components/02-molecules/SEO";

const PublicationsPage = () => {
  return (
    <Layout>
      <SEO title="Publications" />

      <div className="mb-10">
        <div className="container mx-auto mt-5">
          <h1>Publikasi 📰</h1>

          <PublicationList />
        </div>
      </div>
    </Layout>
  );
};

export default PublicationsPage;
