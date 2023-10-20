import React from "react"

import * as types from "./types"
import * as styled from "./styled"

const Link = (props: types.LinkPropTypes) => {
  const { children, href, variant = "primary" } = props

  return (
    <styled.Anchor to={href} variant={variant}>
      {children}
    </styled.Anchor>
  )
}

export default Link
