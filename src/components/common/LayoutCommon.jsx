import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

import AuthModal from "@/pages/auth/AuthModal";

function LayoutCommon({ children }) {
  const [openLogin, setOpenLogin] = useState(false);
  const headerHeight = 70;

  return (
    <div className="min-h-screen flex flex-col">
      <Header setOpenLogin={setOpenLogin} />

      <main style={{ paddingTop: `${headerHeight}px` }} className="flex-1">
        {children}
      </main>

      <Footer />

      {/* Login modal */}
      <AuthModal open={openLogin} setOpen={setOpenLogin} />
    </div>
  );
}

export default LayoutCommon;
