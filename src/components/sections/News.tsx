import { useState } from "react";
import { INSTAGRAM_POSTS } from "../../utils/data";

export function NewsSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="news" className="gd-news" aria-labelledby="news-heading">
      <div className="gd-container">
        {/* Section header */}
        <div className="gd-news-header">
          <div className="gd-news-header-text">
            <p className="gd-section-kicker">Latest Updates</p>
            <h2 id="news-heading" className="gd-section-title">News &amp; Activities</h2>
            <div className="gd-section-divider" />
          </div>
          <a
            href="https://www.instagram.com/geodesigeomatika.itb/"
            target="_blank"
            rel="noreferrer"
            className="gd-news-ig-link"
            aria-label="Follow us on Instagram @geodesigeomatika.itb"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            <span>@geodesigeomatika.itb</span>
          </a>
        </div>

        {/* Note about Instagram */}
        <div className="gd-news-api-note">
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <p>
            <strong>Note for developers:</strong> Konten di bawah ini menggunakan data placeholder. Di production, integrasikan dengan{" "}
            <a href="https://developers.facebook.com/docs/instagram-basic-display-api" target="_blank" rel="noreferrer">
              Instagram Basic Display API
            </a>{" "}
            atau layanan seperti Curator.io untuk menampilkan postingan Instagram terbaru secara otomatis dari{" "}
            <strong>@geodesigeomatika.itb</strong>.
          </p>
        </div>

        {/* Cards grid — Oxford Case Study slider style adapted */}
        <div className="gd-news-grid">
          {INSTAGRAM_POSTS.map((post) => (
            <article
              key={post.id}
              className={`gd-news-card ${hovered === post.id ? "hovered" : ""}`}
              onMouseEnter={() => setHovered(post.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Image */}
              <a
                href={post.permalink}
                target="_blank"
                rel="noreferrer"
                className="gd-news-card-img-link"
                aria-label={`View Instagram post — ${post.caption.slice(0, 60)}…`}
              >
                <div className="gd-news-card-imgwrap">
                  <img
                    src={post.image}
                    alt=""
                    className="gd-news-card-img"
                    loading="lazy"
                  />
                  <div className="gd-news-card-overlay">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="gd-news-ig-icon" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </div>
                </div>
              </a>

              {/* Body */}
              <div className="gd-news-card-body">
                <div className="gd-news-card-meta">
                  <span className="gd-news-card-time">{post.timestamp}</span>
                  <span className="gd-news-card-likes">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    {post.likes.toLocaleString()}
                  </span>
                </div>
                <p className="gd-news-card-caption">{post.caption}</p>
                <a
                  href={post.permalink}
                  target="_blank"
                  rel="noreferrer"
                  className="gd-news-card-cta"
                >
                  View on Instagram
                  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="gd-news-footer">
          <a
            href="https://www.instagram.com/geodesigeomatika.itb/"
            target="_blank"
            rel="noreferrer"
            className="gd-btn gd-btn--primary"
          >
            Follow @geodesigeomatika.itb
          </a>
        </div>
      </div>
    </section>
  );
}
