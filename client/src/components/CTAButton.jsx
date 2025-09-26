// client/src/components/CTAButton.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function CTAButton({ to, children, onClick, className = "", type = "button", variant = "primary", ...props }) {
  const base = "inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2";
  
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary", 
    cta: "btn-cta"
  };
  
  const final = `${base} ${variants[variant] || variants.primary} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={final} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={final} {...props}>
      {children}
    </button>
  );
}
