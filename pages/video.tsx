import Footer from "@core/footer";
import Head from "@core/head";
import Nav from "@core/nav";
import youtubeVideos from "@data/youtube-videos";
import useSWR from "swr";

import styles from "./video.module.css";

interface VimeoVideo {
  id: number;
  title: string;
  description: string;
  url: string;
  thumbnail_large: string;
  duration: number;
  width: number;
  height: number;
  upload_date: string;
  stats_number_of_plays: number;
  tags: string;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function Video(): React.ReactNode {
  const { data: vimeoVideos = [] } = useSWR<VimeoVideo[]>(
    "/api/v1/vimeo",
    fetcher,
  );

  return (
    <>
      <Head
        title="Michael Knepprath, Filmmaker"
        description="Film, animation, and video work by Michael Knepprath"
      />
      <Nav className="container" />

      <div className={styles.page} data-page="video">
        <header className={styles.header}>
          <h1 className={styles.title}>Video</h1>
        </header>

        {/* YouTube videos */}
        {youtubeVideos.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>YouTube</h2>
            <div className={styles.grid}>
              {youtubeVideos.map((id) => (
                <div key={id} className={styles.videoCard}>
                  <div className={styles.embedWrap}>
                    <iframe
                      src={`https://www.youtube.com/embed/${id}`}
                      title="YouTube video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className={styles.embed}
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Vimeo videos */}
        {vimeoVideos.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Vimeo</h2>
            <div className={styles.grid}>
              {vimeoVideos.map((video) => (
                <a
                  key={video.id}
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.videoCard}
                >
                  <div className={styles.thumbWrap}>
                    <img
                      src={video.thumbnail_large}
                      alt={video.title}
                      className={styles.thumb}
                      loading="lazy"
                    />
                    <span className={styles.duration}>
                      {formatDuration(video.duration)}
                    </span>
                  </div>
                  <div className={styles.videoInfo}>
                    <h3 className={styles.videoTitle}>{video.title}</h3>
                    {video.description && (
                      <p className={styles.videoDesc}>
                        {video.description.replace(/<[^>]+>/g, "").slice(0, 120)}
                      </p>
                    )}
                    <span className={styles.videoMeta}>
                      {video.upload_date.split(" ")[0]} · {video.stats_number_of_plays.toLocaleString()} plays
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer className="container" />
    </>
  );
}
