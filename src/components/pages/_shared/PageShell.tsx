// ============================================================
// _shared/PageShell.tsx
// Shared primitives — PageHero, Breadcrumb, PageProps
// Import from here in every page component
// ============================================================

export interface PageProps {
  onNavigate: (page: string) => void;
}

export function PageHero({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="gd-page-hero">
      <div className="gd-container">
        <p className="gd-page-hero-kicker">{kicker}</p>
        <h1 className="gd-page-hero-title">{title}</h1>
        {subtitle && <p className="gd-page-hero-sub">{subtitle}</p>}
      </div>
    </section>
  );
}

export function Breadcrumb({
  items,
  onNavigate,
}: {
  items: { label: string; page: string }[];
  onNavigate: (page: string) => void;
}) {
  return (
    <div className="gd-page-hero" style={{ paddingBottom: 0, paddingTop: "16px" }}>
      <div className="gd-container">
        <div className="gd-breadcrumb" style={{ marginBottom: 0 }}>
          <button onClick={() => onNavigate("home")}>Home</button>
          {items.map((item, i) => (
            <span
              key={item.label}
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <span>›</span>
              {i === items.length - 1 ? (
                <span style={{ color: "rgba(255,255,255,0.7)" }}>{item.label}</span>
              ) : (
                <button onClick={() => onNavigate(item.page)}>{item.label}</button>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}