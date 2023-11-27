import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  padding: 15px 20px;
  background-color: var(--color-primary);
  color: white;
  border-radius: 4px;
  border-width: 0;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export default function Button({ children, ...props }) {
  return (
    <StyledButton {...props} type="button">
      {children}
    </StyledButton>
  );
}
