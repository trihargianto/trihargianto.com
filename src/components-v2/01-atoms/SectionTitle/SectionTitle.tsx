import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
}

const SectionTitle = ({ children }: SectionTitleProps) => (
  <h2 className="text-2xl font-semibold sm:text-3xl">{children}</h2>
);

export default SectionTitle;
