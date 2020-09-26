import React from "react"
import styled from "styled-components"

const StyledButton = styled.button`
  padding: 15px 20px;
  background-color: #5c7cfa;
  color: white;
  border-radius: 4px;
  border-width: 0;
  cursor: pointer;

  &:hover {
    background-color: #3b5bdb;
  }
`

export default function Button({ children, ...props }) {
  return (
    <StyledButton {...props} type="button">
      {children}
    </StyledButton>
  )
}
