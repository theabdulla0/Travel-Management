import { useState } from "react";

export function SafeImage({ src, alt, className }) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-200 text-gray-500 text-xs rounded ${className}`}
      >
        No Image Available
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} object-cover rounded`}
      onError={() => setError(true)}
    />
  );
}
