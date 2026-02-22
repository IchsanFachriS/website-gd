import { useState } from "react";
import { WHAT_IS_TABS } from "../../utils/data";

export function WhatIsSection() {
  const [active, setActive] = useState(0);
  const tab = WHAT_IS_TABS[active];

  return (
    <section id="what-is" className="gd-tabblock" aria-labelledby="what-is-heading">
      {/* Tab row — Oxford style */}
      <div className="gd-tabblock-tabs">
        <div className="gd-container">
          <div className="gd-tabs-row" role="tablist" aria-label="What is Geodesy & Geomatics sections">
            {WHAT_IS_TABS.map((t, i) => (
              <button
                key={t.label}
                role="tab"
                id={`tab-${i}`}
                aria-selected={i === active}
                aria-controls={`tabpanel-${i}`}
                className={`gd-tab ${i === active ? "active" : ""}`}
                onClick={() => setActive(i)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div
        id={`tabpanel-${active}`}
        role="tabpanel"
        aria-labelledby={`tab-${active}`}
        className="gd-tabblock-content"
      >
        <div className="gd-tabblock-layout">
          {/* Image — left 60% like Oxford */}
          <div className="gd-tabblock-img-col">
            <div className="gd-tabblock-imgwrap">
              <img
                src={tab.image}
                alt={tab.imageAlt}
                className="gd-tabblock-img"
              />
            </div>
          </div>
          {/* Text — right 40% */}
          <div className="gd-tabblock-text-col">
            <div className="gd-tabblock-inner">
              <p className="gd-tabblock-kicker">What is Geodesy &amp; Geomatics?</p>
              <h2 className="gd-tabblock-title">{tab.title}</h2>
              <div className="gd-tabblock-divider" />
              <p className="gd-tabblock-body">{tab.body}</p>
              {tab.links && tab.links.length > 0 && (
                <ul className="gd-quicklinks">
                  {tab.links.map((link) => (
                    <li key={link.label} className="gd-quicklinks-item">
                      <a href={link.href}>
                        <span>{link.label}</span>
                        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
