import React, { ReactNode, useState } from "react";
import "./index.css";

/**
 * Component for global footer
 * @constructor
 */

export default function GlobalFooter() {
  const currYear = new Date().getFullYear();
  return (
    <div className="global-footer">
      <div>© {currYear} Interview Questions Practice Platform</div>
    </div>
  );
}
