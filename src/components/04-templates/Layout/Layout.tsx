import React from "react";

import NavigationBar from "../../03-organisms/NavigationBar";
import Footer from "../../03-organisms/Footer";

interface LayoutProps {
  children: React.ReactNode;
  isNavBorderBottomVisible?: boolean;
}

const Layout = ({ children, isNavBorderBottomVisible = true }: LayoutProps) => (
  <div className="relative min-h-screen">
    <div className="w-full pb-48">
      <NavigationBar isBorderBottomVisible={isNavBorderBottomVisible} />

      {children}
    </div>

    <Footer />
  </div>
);

export default Layout;
