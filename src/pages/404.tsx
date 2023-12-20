import React from "react";

import SEO from "../components/02-molecules/SEO";

const NotFoundPage = () => {
  return (
    <>
      <SEO title="404: Not Found" />
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </>
  );
};

export default NotFoundPage;
