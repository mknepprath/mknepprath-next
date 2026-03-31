import Footer from "@core/footer";
import Head from "@core/head";
import Nav from "@core/nav";
import { format, parseISO } from "date-fns";
import { GetStaticProps } from "next";
import Link from "next/link";

import styles from "./themes.module.css";

interface ThemePreview {
  title: string;
  slug: string;
  description: string;
  itemCount: number;
  typeCount: number;
  types: string[];
  latestDate: string;
}

interface Props {
  themes: ThemePreview[];
}

export default function ThemesIndex({ themes }: Props): React.ReactNode {
  if (themes.length === 0) {
    return (
      <>
        <Head title="Themes — Michael Knepprath" />
        <Nav className="container" />
        <div className={`container ${styles.page}`}>
          <header className={styles.header}>
            <h1 className={styles.title}>Themes</h1>
            <p className={styles.subtitle}>
              Recurring threads across films, writing, photos, and more.
            </p>
          </header>
          <p className={styles.empty}>No themes yet. Check back soon.</p>
        </div>
        <Footer className="container" />
      </>
    );
  }

  return (
    <>
      <Head
        title="Themes — Michael Knepprath"
        description="Recurring themes across films, writing, photography, and more."
      />
      <Nav className="container" />

      <div className={`container ${styles.page}`}>
        <header className={styles.header}>
          <h1 className={styles.title}>Themes</h1>
          <p className={styles.subtitle}>
            Recurring threads across films, writing, photos, and more.
          </p>
        </header>

        <div className={styles.themeGrid}>
          {themes.map((theme) => (
            <Link
              key={theme.slug}
              href={`/themes/${theme.slug}`}
              className={styles.themeCard}
            >
              <h2 className={styles.themeTitle}>{theme.title}</h2>
              <p className={styles.themeDesc}>{theme.description}</p>
              <span className={styles.themeMeta}>
                {theme.itemCount} items · {format(parseISO(theme.latestDate), "MMM yyyy")}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <Footer className="container" />
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
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

  const themes: ThemePreview[] = Object.values(themesData)
    .map((theme) => {
      const types = [...new Set(theme.items.map((i) => i.type))];
      const typeLabels: Record<string, string> = {
        FILM: "Films",
        POST: "Writing",
        BOOK: "Books",
        PHOTO: "Photos",
        TOOT: "Mastodon",
        SKEET: "Bluesky",
        MUSIC: "Music",
        RUN: "Running",
        CHESS: "Chess",
        HIGHLIGHT: "Highlights",
      };
      return {
        title: theme.title,
        slug: theme.slug,
        description: theme.description,
        itemCount: theme.items.length,
        typeCount: types.length,
        types: types.map((t) => typeLabels[t] || t),
        latestDate: theme.updatedAt,
      };
    })
    .sort((a, b) => +new Date(b.latestDate) - +new Date(a.latestDate));

  return {
    props: { themes },
  };
};
