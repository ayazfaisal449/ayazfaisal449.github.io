"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, GitCommitHorizontal, Lock } from "lucide-react";
import { GITHUB_PROFILE_URL, GITHUB_USERNAME } from "../lib/githubContributions";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const WEEKDAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

function monthLabelsForWeeks(weeks) {
  const labels = [];
  let lastMonth = -1;

  weeks.forEach((week, index) => {
    const firstDay = week[0];
    if (!firstDay) {
      labels.push({ index, label: "" });
      return;
    }

    const date = new Date(`${firstDay.date}T00:00:00`);
    const month = date.getMonth();
    if (month !== lastMonth) {
      labels.push({ index, label: MONTHS[month] });
      lastMonth = month;
    } else {
      labels.push({ index, label: "" });
    }
  });

  return labels;
}

function formatDayLabel(date, count) {
  const formatted = new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  });
  const suffix = count === 1 ? "contribution" : "contributions";
  return `${count} ${suffix} on ${formatted}`;
}

export default function GitHubContributions() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetch("/data/github-contributions.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Contribution data unavailable");
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

  const weeks = useMemo(() => data?.weeks || [], [data]);
  const monthLabels = useMemo(() => monthLabelsForWeeks(weeks), [weeks]);

  if (error) {
    return (
      <div className="github-contributions github-contributions--error">
        <p>Could not load GitHub activity right now.</p>
        <a href={GITHUB_PROFILE_URL} target="_blank" rel="noreferrer" className="github-contributions-link">
          View profile on GitHub <ExternalLink size={14} />
        </a>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="github-contributions github-contributions--loading" aria-hidden="true">
        <div className="github-contributions-stats-skeleton" />
        <div className="github-contributions-grid-skeleton" />
      </div>
    );
  }

  return (
    <motion.div
      className="github-contributions"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="github-contributions-head">
        <div className="github-contributions-stats">
          <GitCommitHorizontal size={18} aria-hidden="true" />
          <p>
            <strong>{data.totalContributions.toLocaleString()}</strong> contributions in the last year on{" "}
            <a href={GITHUB_PROFILE_URL} target="_blank" rel="noreferrer">
              @{data.username || GITHUB_USERNAME}
            </a>
          </p>
        </div>
        {data.includesPrivate ? (
          <p className="github-contributions-private-note">
            <Lock size={14} aria-hidden="true" />
            Includes private repository activity (counts only)
          </p>
        ) : null}
      </div>

      <div className="github-contributions-graph" role="img" aria-label="GitHub contribution calendar">
        <div className="github-contributions-months" aria-hidden="true">
          {monthLabels.map(({ index, label }) => (
            <span key={`month-${index}`} className="github-contributions-month">
              {label}
            </span>
          ))}
        </div>

        <div className="github-contributions-body">
          <div className="github-contributions-weekdays" aria-hidden="true">
            {WEEKDAY_LABELS.map((label, index) => (
              <span key={`weekday-${index}`}>{label}</span>
            ))}
          </div>

          <div className="github-contributions-grid">
            {weeks.map((week, weekIndex) => (
              <div key={`week-${weekIndex}`} className="github-contributions-week">
                {week.map((day) => (
                  <span
                    key={day.date}
                    className={`github-contribution-day level-${day.level ?? 0}`}
                    title={formatDayLabel(day.date, day.count)}
                    data-count={day.count}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="github-contributions-legend" aria-hidden="true">
        <span>Less</span>
        <span className="github-contribution-day level-0" />
        <span className="github-contribution-day level-1" />
        <span className="github-contribution-day level-2" />
        <span className="github-contribution-day level-3" />
        <span className="github-contribution-day level-4" />
        <span>More</span>
      </div>
    </motion.div>
  );
}
