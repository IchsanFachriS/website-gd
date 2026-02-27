// ============================================================
// _shared/GenericPage.tsx
// Coming-soon placeholder for pages not yet built
// ============================================================
import { Breadcrumb, PageHero } from "./PageShell";
import type { PageProps } from "./PageShell";

interface GenericPageProps extends PageProps {
  title: string;
  parent?: string;
}

export function GenericPage({ title, parent, onNavigate }: GenericPageProps) {
  const breadItems = parent
    ? [
        { label: parent, page: parent.toLowerCase().replace(/\s+/g, "-") },
        { label: title, page: "" },
      ]
    : [{ label: title, page: "" }];

  return (
    <div>
      <Breadcrumb items={breadItems} onNavigate={onNavigate} />
      <PageHero kicker={parent || "Section"} title={title} />

      <section className="gd-coming-soon">
        <div className="gd-container">
          <div className="gd-coming-soon-inner">
            <div className="gd-coming-soon-icon" aria-hidden="true">
              <svg viewBox="0 0 44 44" fill="none">
                <circle cx="22" cy="22" r="19" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
                <circle cx="22" cy="22" r="10" stroke="currentColor" strokeWidth="1" opacity="0.3" />
                <circle cx="22" cy="22" r="3" fill="currentColor" opacity="0.4" />
                <line x1="22" y1="3" x2="22" y2="41" stroke="currentColor" strokeWidth="1" opacity="0.2" />
                <line x1="3" y1="22" x2="41" y2="22" stroke="currentColor" strokeWidth="1" opacity="0.2" />
              </svg>
            </div>
            <p className="gd-section-kicker">{parent || "Section"}</p>
            <h2 className="gd-coming-soon-title">{title}</h2>
            <p className="gd-coming-soon-body">
              This section is currently being developed. Content will be integrated from the
              WordPress REST API at <code>gd.fitb.itb.ac.id/wp-json/</code> in the next
              development phase.
            </p>
            <button className="gd-btn gd-btn--primary" onClick={() => onNavigate("home")}>
              Back to Home
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}