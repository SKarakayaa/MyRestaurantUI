import React from "react";

const SectionHeading = ({ heading, subHeading }) => (
  <div className={`section-header text-center`}>
    <h2>{heading}</h2>
    {subHeading ? <p>{subHeading}</p> : ""}
    <span className="line"></span>
  </div>
);
export default SectionHeading;
