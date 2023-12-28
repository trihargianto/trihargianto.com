import React from "react";
import { useLang } from "../hooks/useLang";

export default () => {
  const { translate } = useLang();

  return <div>{translate('greetings.hello')}</div>;
};
