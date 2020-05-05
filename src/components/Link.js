import React from "react"

import "./Link.css"

export default ({ href, linkClasses = [], children }) => (
  <a
    href={`https://${href}`}
    target="_blank"
    rel="noopener noreferrer"
    className={linkClasses.join(" ")}
  >
    {children}
  </a>
)
