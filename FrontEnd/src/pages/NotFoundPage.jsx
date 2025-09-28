import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import LayoutCommon from "@/components/common/LayoutCommon";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <LayoutCommon>
      <div className="flex flex-col items-center justify-center h-[80vh] text-center p-4">
        <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-6">
          Oops! The page you are looking for does not exist.
        </p>
        <Button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md"
        >
          Go Back Home
        </Button>
      </div>
    </LayoutCommon>
  );
}

export default NotFoundPage;
