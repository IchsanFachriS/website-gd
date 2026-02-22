import { useState, useEffect, useCallback, useRef } from "react";
import { SLIDES } from "../../utils/data";

export function BannerSlider() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const DURATION = 5000;
  const TICK = 50;

  const clearTimers = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  };

  const startTimers = useCallback(() => {
    clearTimers();
    setProgress(0);
    if (paused) return;
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + (TICK / DURATION) * 100, 100));
    }, TICK);
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
      setProgress(0);
    }, DURATION);
  }, [paused]);

  useEffect(() => { startTimers(); return clearTimers; }, [startTimers, current]);

  const goTo = (idx: number) => { clearTimers(); setCurrent(idx); startTimers(); };
  const prev = () => goTo((current - 1 + SLIDES.length) % SLIDES.length);
  const next = () => goTo((current + 1) % SLIDES.length);

  return (
    <section id="profile" className="gd-banner" aria-label="Featured content slideshow">
      {/* Slides */}
      <div className="gd-banner-track">
        {SLIDES.map((slide, i) => (
          <div
            key={i}
            className={`gd-banner-slide ${i === current ? "active" : ""}`}
            aria-hidden={i !== current}
          >
            <div className="gd-banner-img-wrap">
              <img src={slide.image} alt="" className="gd-banner-img" loading={i === 0 ? "eager" : "lazy"} />
              <div className="gd-banner-overlay" />
            </div>
            <div className="gd-banner-content">
              <div className="gd-container gd-banner-container">
                <div className="gd-banner-text-wrap">
                  {slide.title && (
                    <h2 className="gd-banner-title">
                      {slide.title.split("\n").map((line, li) => (
                        <span key={li}>{line}<br /></span>
                      ))}
                    </h2>
                  )}
                  {slide.subtitle && (
                    <p className="gd-banner-subtitle">{slide.subtitle}</p>
                  )}
                  {slide.cta && (
                    <a href={slide.cta.href} className="gd-btn gd-btn--banner">
                      {slide.cta.label}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="gd-banner-controls">
        {/* Progress bar */}
        <div className="gd-banner-progress-wrap">
          <div className="gd-banner-progress" style={{ width: `${progress}%` }} />
        </div>

        <div className="gd-banner-ctrl-row">
          <button
            className={`gd-banner-pause ${paused ? "paused" : ""}`}
            onClick={() => setPaused(!paused)}
            aria-label={paused ? "Play slideshow" : "Pause slideshow"}
          >
            {paused ? (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 19h4V5H6zm8-14v14h4V5z" /></svg>
            )}
            <span className="gd-sr">{paused ? "PLAY" : "PAUSE"}</span>
          </button>
          <button className="gd-banner-prev" onClick={prev} aria-label="Previous slide">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" d="M15 18l-6-6 6-6" />
            </svg>
            <span>PREVIOUS</span>
          </button>
          <button className="gd-banner-next" onClick={next} aria-label="Next slide">
            <span>NEXT</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Dot indicators */}
        <div className="gd-banner-dots" role="tablist" aria-label="Slide indicators">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Slide ${i + 1}`}
              className={`gd-banner-dot ${i === current ? "active" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
