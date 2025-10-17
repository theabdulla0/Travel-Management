import React from "react";

export default function PageLoading({ loading = false, text = "Loading..." }) {
  if (!loading) return null;

  return (
    <div className="page-loader" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <p className="loading-text">{text}</p>

      <style>
        {`
          .page-loader {
            position: fixed;
            inset: 0;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 12px;
            background: rgba(0, 0, 0, 0.6);
            color: #fff;
            font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
          }
          .spinner {
            width: 36px;
            height: 36px;
            border: 4px solid rgba(255,255,255,0.35);
            border-top-color: #fff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          .loading-text { margin: 0; font-size: 16px; font-weight: 600; }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}
      </style>
    </div>
  );
}