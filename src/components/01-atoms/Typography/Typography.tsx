import React from "react"

import * as types from "./types"
import * as styled from "./styled"

const Typography = (props: types.TypographyPropTypes) => {
  const {
    tag = "span",
    size = "body2",
    weight = "normal",
    children = null,
    dangerouslySetInnerHTML = null,
  } = props

  return (
    <styled.Text
      as={tag}
      size={size}
      weight={weight}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    >
      {children}
    </styled.Text>
  )
}

export default Typography
