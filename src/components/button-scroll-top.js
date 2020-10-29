import React, { useState } from "react"
import styled from "styled-components"

import Button from "./button"

const StyledFab = styled(Button)`
  position: fixed;
  width: 40px;
  height: 40px;
  right: 20px;
  bottom: 20px;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  cursor: pointer;
  animation: fadeIn 0.3s;
  transition: opacity 0.4s;
  border-radius: 50%;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.5;
    }
  }
`

export default function Fab({ children, ...props }) {
  const [showScroll, setShowScroll] = useState(false)

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false)
    }
  }

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", checkScrollTop)
  }

  return (
    <StyledFab
      {...props}
      type="button"
      onClick={scrollTop}
      style={{ display: showScroll ? "flex" : "none" }}
    >
      {children}
    </StyledFab>
  )
}
