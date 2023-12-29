import React from "react";

import Layout from "../components/04-templates/Layout";
import { useLang } from "../hooks/useLang";

export default () => {
  const { translate } = useLang();

  return <Layout>{translate("greetings.hello")}</Layout>;
};
