import React from "react";
import { globalHistory } from "@reach/router";

import NavigationBar from "../../03-organisms/NavigationBar";
import Footer from "../../03-organisms/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  React.useEffect(() => {
    // Detect route change event use the undocumented globalHistory from @reach/router, which Gatsby uses.
    // https://github.com/reach/router/issues/262#issuecomment-501786634
    globalHistory.listen(({ action }) => {
      if (action === "PUSH" || action === "POP") {
        document.startViewTransition();
      }
    });
  }, []);

  return (
    <div className="relative min-h-screen">
      <div className="w-full pb-48">
        <NavigationBar />

        {/* Must be equal to NavigationBar height */}
        <div style={{ height: 75 }} />

        {children}
      </div>

      <Footer />
    </div>
  );
};

export default Layout;
