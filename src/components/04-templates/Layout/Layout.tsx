import React from "react";

import NavigationBar from "../../03-organisms/NavigationBar";
import Footer from "../../03-organisms/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <div className="relative min-h-screen">
    <div className="w-full pb-48">
      <NavigationBar />

      {children}
    </div>

    <Footer />
  </div>
);

export default Layout;
