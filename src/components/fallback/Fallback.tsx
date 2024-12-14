import React from "react";
import './style.css'

const Fallback: React.FC = () => (
  <img
    className="fallback-icon w-[80px]"
    src="/logo.svg"
    alt="Logo icon"
    width={48}
    height={32}
  />
);

export default Fallback;
