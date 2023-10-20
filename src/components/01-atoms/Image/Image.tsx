import React from "react"
import * as types from "./types"
import * as styled from "./styled"

const Image = (props: types.ImagePropTypes) => {
  const { src, alt, variant = "normal", ratio = "1:1" } = props

  return (
    <styled.Wrapper ratio={ratio}>
      <styled.Img variant={variant} src={src} alt={alt} />
    </styled.Wrapper>
  )
}

export default Image
