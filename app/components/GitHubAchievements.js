"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import {
  achievementDescription,
  achievementDisplayName,
  achievementTierLabel
} from "../lib/githubAchievements";
import { GITHUB_PROFILE_URL, GITHUB_USERNAME } from "../lib/githubContributions";

const ACHIEVEMENTS_URL = `${GITHUB_PROFILE_URL}?tab=achievements`;

export default function GitHubAchievements() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetch("/data/github-achievements.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Achievement data unavailable");
        }
        return response.json();
      })
      .then((payload) => {
        if (!cancelled) setData(payload);
      })
      .catch((fetchError) => {
        if (!cancelled) setError(fetchError.message);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div className="github-achievements github-achievements--error">
        <p>Could not load GitHub achievements right now.</p>
        <a href={ACHIEVEMENTS_URL} target="_blank" rel="noreferrer" className="github-achievements-link">
          View achievements on GitHub <ExternalLink size={14} />
        </a>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="github-achievements github-achievements--loading" aria-hidden="true">
        <div className="github-achievements-head-skeleton" />
        <div className="github-achievements-grid-skeleton" />
      </div>
    );
  }

  if (!data.achievements?.length) {
    return null;
  }

  return (
    <motion.div
      className="github-achievements"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
    >
      <div className="github-achievements-head">
        <div className="github-achievements-summary">
          <Award size={18} aria-hidden="true" />
          <p>
            <strong>{data.total?.raw ?? data.achievements.length}</strong> profile achievements on{" "}
            <a href={ACHIEVEMENTS_URL} target="_blank" rel="noreferrer">
              @{data.username || GITHUB_USERNAME}
            </a>
          </p>
        </div>
      </div>

      <ul className="github-achievements-grid">
        {data.achievements.map((achievement) => {
          const tierLabel = achievementTierLabel(achievement.tier);
          const name = achievementDisplayName(achievement.type);

          return (
            <li key={`${achievement.type}-${achievement.tier}`} className="github-achievement-card">
              <div className="github-achievement-badge-wrap">
                <img
                  src={achievement.image}
                  alt=""
                  className="github-achievement-badge"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="github-achievement-copy">
                <p className="github-achievement-name">{name}</p>
                {tierLabel ? <span className="github-achievement-tier">{tierLabel}</span> : null}
                <p className="github-achievement-description">
                  {achievementDescription(achievement.type)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}
