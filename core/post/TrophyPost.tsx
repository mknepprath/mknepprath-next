import ActivityCard from "@core/activity-card";
import { format, parseISO } from "date-fns";
import Image from "next/image";

import styles from "./post.module.css";

interface PostProps extends PostListItem {
  index?: number;
}

const TIER_CLASS: Record<string, string> = {
  bronze: styles.trophyBronze,
  silver: styles.trophySilver,
  gold: styles.trophyGold,
  platinum: styles.trophyPlatinum,
};

const TrophyPost = ({
  date,
  id,
  image,
  index = 0,
  summary,
  title,
}: PostProps) => {
  // The feed packs the extras into summary as "detail · Key: value · ...",
  // same trick the chess cards use. Anything without a "Key:" is the detail.
  const parts = (summary ?? "").split(" · ");
  const meta: Record<string, string> = {};
  const detail: string[] = [];

  parts.forEach((part) => {
    const match = part.match(/^(Game|Tier|Rarity): (.*)$/);
    if (match) meta[match[1]] = match[2];
    else if (part.trim()) detail.push(part.trim());
  });

  const tier = (meta.Tier ?? "").toLowerCase();
  const rarity = Number(meta.Rarity);
  const hasRarity = Number.isFinite(rarity);

  return (
    <ActivityCard id={id} type="TROPHY" index={index}>
      <article
        className={`${styles.trophyCard} ${TIER_CLASS[tier] ?? styles.trophyBronze}`}
      >
        <div className={styles.trophyGlint} aria-hidden="true" />

        <header className={styles.trophyHeader}>
          <span className={styles.trophyGame}>{meta.Game ?? "PlayStation"}</span>
          <span className={styles.trophyDate}>
            {format(parseISO(date), "MMM d, yyyy")}
          </span>
        </header>

        <div className={styles.trophyBody}>
          {image ? (
            <div className={styles.trophyIconRing}>
              <Image
                alt={`${tier} trophy icon for ${title}`}
                className={styles.trophyIcon}
                height={64}
                src={image}
                width={64}
              />
            </div>
          ) : null}

          <div className={styles.trophyText}>
            <p className={styles.trophyUnlocked}>Trophy unlocked</p>
            <h3 className={styles.trophyName}>{title}</h3>
            {detail.length ? (
              <p className={styles.trophyDetail}>{detail.join(" · ")}</p>
            ) : null}
          </div>
        </div>

        <footer className={styles.trophyFooter}>
          <span className={styles.trophyTier}>{tier || "trophy"}</span>
          {hasRarity ? (
            <span className={styles.trophyRarity}>
              {rarity}% of players
            </span>
          ) : null}
        </footer>
      </article>
    </ActivityCard>
  );
};

export default TrophyPost;
