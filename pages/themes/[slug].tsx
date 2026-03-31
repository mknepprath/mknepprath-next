import Footer from "@core/footer";
import Head from "@core/head";
import Nav from "@core/nav";
import { Post, POST_MAP } from "@core/post";
import { format, parseISO } from "date-fns";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

import styles from "./themes.module.css";

interface Props {
  theme: Theme;
}

export default function ThemePage({ theme }: Props): React.ReactNode {
  return (
    <>
      <Head
        title={`${theme.title} — Themes`}
        description={theme.description}
      />
      <Nav className="container" />

      <div className={`container ${styles.page}`}>
        <header className={styles.detailHeader}>
          <Link href="/themes" className={styles.backLink}>
            &larr; Themes
          </Link>
          <h1 className={styles.detailTitle}>{theme.title}</h1>
          <p className={styles.detailDesc}>{theme.description}</p>
          <span className={styles.detailMeta}>
            {theme.items.length} items · Updated{" "}
            {format(parseISO(theme.updatedAt), "MMMM d, yyyy")}
          </span>
        </header>

        <div className={styles.itemStream}>
          {theme.items.map((item, index) => {
            const postData: PostListItem = {
              id: item.id,
              title: item.title,
              date: item.date,
              image: item.image,
              url: item.url || "",
              summary: item.summary,
              action: item.action,
              type: item.type as PostListItem["type"],
            };

            const PostComponent =
              (postData.type && POST_MAP[postData.type]) || Post;

            return (
              <PostComponent key={item.id} {...postData} index={index} />
            );
          })}
        </div>
      </div>

      <Footer className="container" />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const fs = await import("fs");
  const path = await import("path");

  const themesFile = path.join(process.cwd(), "data/themes.json");
  let themesData: Record<string, Theme>;

  try {
    const raw = fs.readFileSync(themesFile, "utf-8");
    themesData = JSON.parse(raw);
  } catch {
    themesData = {};
  }

  const paths = Object.keys(themesData).map((slug) => ({
    params: { slug },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const fs = await import("fs");
  const path = await import("path");

  const slug = params?.slug as string;
  const themesFile = path.join(process.cwd(), "data/themes.json");
  const raw = fs.readFileSync(themesFile, "utf-8");
  const themesData: Record<string, Theme> = JSON.parse(raw);

  const theme = themesData[slug];
  if (!theme) {
    return { notFound: true };
  }

  return { props: { theme } };
};
