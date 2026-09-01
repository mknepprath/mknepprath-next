import ActivityCard from "@core/activity-card";
import { format, parseISO } from "date-fns";
import Image from "next/image";

import styles from "./post.module.css";

interface PostProps extends PostListItem {
  index?: number;
}

const TIER_CLASS: Record<string, string> = {
  bronze: styles.slabBronze,
  silver: styles.slabSilver,
  gold: styles.slabGold,
  platinum: styles.slabPlatinum,
};

const TrophyPost = ({
  date,
  id,
  image,
  index = 0,
  summary,
  title,
}: PostProps) => {
  // The feed packs extras into summary as "detail · Key: value · ...", the
  // same trick the chess cards use. Anything without a "Key:" is the detail.
  const meta: Record<string, string> = {};
  const detail: string[] = [];

  (summary ?? "").split(" · ").forEach((part) => {
    const match = part.match(/^(Game|Tier|Rarity): (.*)$/);
    if (match) meta[match[1]] = match[2];
    else if (part.trim()) detail.push(part.trim());
  });

  const tier = (meta.Tier ?? "").toLowerCase();
  const rarity = Number(meta.Rarity);

  return (
    <ActivityCard id={id} type="TROPHY" index={index}>
      <article className={`${styles.slab} ${TIER_CLASS[tier] ?? styles.slabBronze}`}>
        {/* Printed grading label, read through the plastic. */}
        <header className={styles.slabLabel}>
          <span className={styles.slabGame}>{meta.Game ?? "PlayStation"}</span>
          <span className={styles.slabGrade}>
            {Number.isFinite(rarity) ? (
              <>
                <span className={styles.slabGradeLabel}>Rarity</span>
                <span className={styles.slabGradeValue}>{rarity}</span>
              </>
            ) : null}
            <span className={styles.slabTier}>{tier || "trophy"}</span>
          </span>
        </header>

        {/* Recessed well holding the struck medallion. */}
        <div className={styles.slabWell}>
          {image ? (
            <div className={styles.slabMedallion}>
              <div className={styles.slabMedallionInner}>
                <Image
                  alt={`${tier} trophy medallion for ${title}`}
                  className={styles.slabIcon}
                  height={72}
                  src={image}
                  width={72}
                />
              </div>
            </div>
          ) : null}

          <div className={styles.slabText}>
            <h3 className={styles.slabTitle}>{title}</h3>
            {detail.length ? (
              <p className={styles.slabDetail}>{detail.join(" · ")}</p>
            ) : null}
          </div>
        </div>

        {/* Tamper seal. */}
        <footer className={styles.slabSeal}>
          <span className={styles.slabSealMark}>Sealed</span>
          <span>{format(parseISO(date), "MMM d, yyyy")}</span>
        </footer>

        <div className={styles.slabSheen} aria-hidden="true" />
      </article>
    </ActivityCard>
  );
};

export default TrophyPost;
