import React, { useState } from "react";
import styled from "styled-components";

import Button from "./button";
import IconArrowUpward from "./IconArrowUpward";

const StyledFab = styled(Button)`
  position: fixed;
  width: 167px;
  height: 40px;
  right: 24px;
  bottom: 18px;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  cursor: pointer;
  -webkit-animation: fadeIn 0.3s;
  -webkit-transition: opacity 0.4s;
  animation: fadeIn 0.3s;
  transition: opacity 0.4s;
  border-radius: 18px;

  @media (max-width: 768px) {
    left: 0;
    right: 0;
    margin: auto;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.5;
    }
  }
`;

export default function Fab({ ...props }) {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", checkScrollTop);
  }

  return (
    <StyledFab
      {...props}
      type="button"
      onClick={scrollTop}
      style={{ display: showScroll ? "flex" : "none" }}
    >
      <IconArrowUpward />
      <span style={{ marginLeft: 8 }}>Scroll ke atas</span>
    </StyledFab>
  );
}
