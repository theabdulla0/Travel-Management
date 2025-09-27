import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "@/features/auth/authThunk";
import AuthModal from "@/pages/auth/AuthModal";

function LayoutCommon({ children }) {
  const dispatch = useDispatch();
  const [openLogin, setOpenLogin] = useState(false);
  const { user, loading } = useSelector((state) => state.auth);

  const headerHeight = 70;

  // Fetch current user on layout mount
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header setOpenLogin={setOpenLogin} user={user} />

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
