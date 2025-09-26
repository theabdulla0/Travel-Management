import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function LayoutCommon({ children }) {
  const headerHeight = 70;
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main style={{ paddingTop: `${headerHeight}px` }} className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default LayoutCommon;
