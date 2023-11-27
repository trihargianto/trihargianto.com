import React from "react";
import styled from "styled-components";

import NavBar from "./03-organisms/NavBar";

const Footer = styled.footer`
  text-align: center;
`;

const Layout = ({ location, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location?.pathname === rootPath;

  return (
    <div>
      <NavBar location={location} />

      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <main>{children}</main>
        <Footer>© {new Date().getFullYear()}</Footer>
      </div>
    </div>
  );
};

export default Layout;
