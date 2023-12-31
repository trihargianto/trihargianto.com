import React from "react";
import { motion } from "framer-motion";

import NavigationBar from "../../03-organisms/NavigationBar";
import Footer from "../../03-organisms/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <div className="relative min-h-screen">
    <div className="w-full pb-48">
      <NavigationBar />

      {/* Must be equal to NavigationBar height */}
      <div style={{ height: 75 }} />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 1 }}
        transition={{ type: "spring", duration: .5 }}
      >
        {children}
      </motion.div>
    </div>

    <Footer />
  </div>
);

export default Layout;
