import Footer from "@core/footer";
import Head from "@core/head";
import Nav from "@core/nav";

interface Props {
  children: React.ReactNode;
  className?: string;
  description?: string;
  ogImage?: string;
  title: string;
}

export default function Page({
  children,
  className,
  description,
  ogImage,
  title,
}: Props): JSX.Element {
  return (
    <div className={className}>
      <Head title={title} description={description} ogImage={ogImage} />
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
