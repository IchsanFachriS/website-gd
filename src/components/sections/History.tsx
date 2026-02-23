import { useState } from "react";
import { HISTORY_TIMELINE } from "../../utils/data";

export function HistorySection() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="history" className="gd-history" aria-labelledby="history-heading">
      <div className="gd-container">
        <div className="gd-history-layout">
          {/* Left: heading + intro */}
          <div className="gd-history-intro">
            <p className="gd-section-kicker">Our History</p>
            <h2 id="history-heading" className="gd-section-title">
              65 Years of Advancing Geospatial Science in Indonesia
            </h2>
            <div className="gd-section-divider" />
            <p className="gd-history-body">
              Established in 1959, the Department of Geodesy & Geomatics Engineering at ITB stands as the oldest and most prestigious geodesy program in Indonesia. For over six decades, we have trained generations of engineers who have shaped the nation's spatial data infrastructure — from the first topographic maps of the archipelago to today's satellite-based positioning systems.
            </p>
            <p className="gd-history-body">
              Our journey reflects Indonesia's own development — from the foundational surveys of a newly independent nation, through the digital revolution in geographic information systems, to the cutting-edge era of drone mapping, autonomous navigation, and space geodesy.
            </p>
            <a href="#academics" className="gd-btn gd-btn--primary">
              Explore Our Programs
            </a>

            {/* Stats */}
            <div className="gd-history-stats">
              {[
                { value: "1950", label: "Year Founded" },
                { value: "75+", label: "Years of Excellence" },
                { value: "3,000+", label: "Alumni Worldwide" },
                { value: "4", label: "Research Groups" },
              ].map((stat) => (
                <div key={stat.label} className="gd-history-stat">
                  <span className="gd-stat-value">{stat.value}</span>
                  <span className="gd-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: timeline */}
          <div className="gd-timeline" aria-label="Department history timeline">
            <div className="gd-timeline-line" aria-hidden="true" />
            {HISTORY_TIMELINE.map((item, i) => (
              <div
                key={item.year}
                className={`gd-timeline-item ${expanded === i ? "expanded" : ""}`}
              >
                <button
                  className="gd-timeline-trigger"
                  aria-expanded={expanded === i}
                  onClick={() => setExpanded(expanded === i ? null : i)}
                >
                  <div className="gd-timeline-dot" aria-hidden="true" />
                  <span className="gd-timeline-year">{item.year}</span>
                  <svg
                    className="gd-timeline-chevron"
                    viewBox="0 0 12 8"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                <div className="gd-timeline-body" aria-hidden={expanded !== i}>
                  <p>{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
