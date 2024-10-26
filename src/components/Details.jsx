"use client";
import { createContext, useState } from "react";

const DetailsContext = createContext(null);

export function Details({ children, className = "" }) {
  return (
    <DetailsContext.Provider value={null}>
      <div className={className}>{children}</div>
    </DetailsContext.Provider>
  );
}

Details.Item = function DetailsItem({ children, className = "" }) {
  const [isActive, setIsActive] = useState(false);

  const toggle = () => setIsActive(!isActive);

  return (
    <div className={className}>
      {typeof children === "function"
        ? children({ isActive, toggle })
        : children}
    </div>
  );
};

Details.Content = function DetailsContent({
  children,
  className = "",
  isActive,
}) {
  return (
    <div
      className={className}
      style={{
        height: isActive ? "auto" : 0,
        opacity: isActive ? 1 : 0,
        visibility: isActive ? "visible" : "hidden",
      }}
    >
      {children}
    </div>
  );
};
