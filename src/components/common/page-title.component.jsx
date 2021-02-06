import React from "react";

const PageTitle = ({ title, subTitle }) => (
  <section className="breadcrumb-osahan pt-5 pb-5 bg-dark position-relative text-center">
    <h1 className="text-white">{title}</h1>
    {subTitle ? <h6 className="text-white-50">{subTitle}</h6> : ""}
  </section>
);
export default PageTitle;
