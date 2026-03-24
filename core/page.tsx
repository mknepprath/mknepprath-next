import React from "react";
import Footer from "@core/footer";
import Head from "@core/head";
import Nav from "@core/nav";

interface Props {
  children: React.ReactNode;
  className?: string;
  "data-page"?: string;
  description?: string;
  ogImage?: string;
  title: string;
}

export default function Page({
  children,
  className,
  "data-page": dataPage,
  description,
  ogImage,
  title,
}: Props): React.JSX.Element {
  return (
    <div className={"container " + className} data-page={dataPage}>
      <Head title={title} description={description} ogImage={ogImage} />
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
