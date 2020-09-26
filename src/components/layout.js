import React from "react"
import styled from "styled-components"

import Navbar from "./navbar"

const Footer = styled.footer`
  text-align: center;
`

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div>
      <Navbar />

      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <main>{children}</main>
        <Footer>© {new Date().getFullYear()}</Footer>
      </div>
    </div>
  )
}

export default Layout
