// ============================================================
// contact/ContactPage.tsx
// Integrated with Contact Form 7 (CF7) WordPress REST API
// POST /wp-json/contact-form-7/v1/contact-forms/{id}/feedback
// ============================================================
import { useState } from "react";
import { Breadcrumb, PageHero } from "../_shared/PageShell";
import type { PageProps } from "../_shared/PageShell";
import { submitContactForm } from "../../../utils/api";
import type { CF7FeedbackResponse } from "../../../types/wordpress";

// ── CF7 Form ID — sesuaikan dengan ID form di WordPress ──────
const CF7_FORM_ID = 7;

// ── Form state ───────────────────────────────────────────────
interface FormState {
  "your-name": string;
  "your-email": string;
  "your-subject": string;
  "your-message": string;
}

const INITIAL_FORM: FormState = {
  "your-name": "",
  "your-email": "",
  "your-subject": "",
  "your-message": "",
};

// ── Field error map ───────────────────────────────────────────
type FieldErrors = Partial<Record<keyof FormState, string>>;

export function ContactPage({ onNavigate }: PageProps) {
  const [form, setForm]           = useState<FormState>(INITIAL_FORM);
  const [loading, setLoading]     = useState(false);
  const [result, setResult]       = useState<CF7FeedbackResponse | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [globalError, setGlobalError] = useState<string | null>(null);

  // ── Handlers ─────────────────────────────────────────────
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    setGlobalError(null);
    setFieldErrors({});
    setResult(null);

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await submitContactForm(CF7_FORM_ID, formData);
      setResult(response);

      // Map per-field validation errors dari CF7
      if (response.invalid_fields && response.invalid_fields.length > 0) {
        const errors: FieldErrors = {};
        response.invalid_fields.forEach((f) => {
          const key = f.field as keyof FormState;
          errors[key] = f.message;
        });
        setFieldErrors(errors);
      }

      // Reset form on success
      if (response.status === "mail_sent") {
        setForm(INITIAL_FORM);
      }
    } catch (err) {
      setGlobalError(
        err instanceof Error
          ? err.message
          : "Gagal mengirim pesan. Silakan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setForm(INITIAL_FORM);
    setFieldErrors({});
    setGlobalError(null);
  };

  // ── Success state ─────────────────────────────────────────
  const isSuccess = result?.status === "mail_sent";

  return (
    <div>
      <Breadcrumb items={[{ label: "Contact Us", page: "contact-us" }]} onNavigate={onNavigate} />
      <PageHero
        kicker="Contact Us"
        title="Get in Touch"
        subtitle="We'd love to hear from you — whether you're a prospective student, researcher, or industry partner."
      />

      <section className="gd-contact">
        <div className="gd-container">
          <div className="gd-contact-layout">

            {/* ── Info ── */}
            <div className="gd-contact-info">
              <p className="gd-section-kicker">Our Location</p>
              <h2 className="gd-section-title">Contact Information</h2>
              <div className="gd-section-divider" />

              <address className="gd-contact-address">
                <div className="gd-contact-row">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <strong>Labtek IX-C</strong><br />
                    Jl. Ganesha No. 10, Bandung 40132<br />
                    Jawa Barat, Indonesia
                  </div>
                </div>

                <div className="gd-contact-row">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <a href="tel:+62222530701">(022)-2530701</a><br />
                    <a href="tel:+62222530702">(022)-2530702</a>
                  </div>
                </div>

                <div className="gd-contact-row">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:info@gd.fitb.itb.ac.id">info@gd.fitb.itb.ac.id</a>
                </div>

                <div className="gd-contact-row">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Senin – Jumat, 08:00 – 16:00 WIB</span>
                </div>
              </address>

              {/* Map placeholder */}
              <div style={{
                marginTop: "24px",
                background: "var(--gray-100)",
                height: "240px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid var(--gray-200)",
              }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "14px",
                    color: "var(--gray-400)",
                    marginBottom: "8px",
                  }}>
                    📍 Gedung Teknik Geodesi, ITB
                  </div>
                  <a
                    href="https://maps.google.com/?q=Gedung+Teknik+Geodesi+ITB+Bandung"
                    target="_blank"
                    rel="noreferrer"
                    className="gd-btn gd-btn--outline"
                    style={{ fontSize: "12px", padding: "8px 16px" }}
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* ── Form ── */}
            <div className="gd-contact-form-wrap">

              {/* ── SUCCESS STATE ── */}
              {isSuccess ? (
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: "48px 24px",
                  gap: "16px",
                }}>
                  {/* Checkmark icon */}
                  <div style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: "rgba(34,197,94,0.12)",
                    border: "2px solid rgba(34,197,94,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: "32px", height: "32px" }}>
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <h3 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "var(--navy)",
                  }}>
                    Pesan Terkirim!
                  </h3>

                  <p style={{
                    fontSize: "15px",
                    lineHeight: 1.7,
                    color: "var(--gray-600)",
                    maxWidth: "360px",
                  }}>
                    {result?.message || "Terima kasih, pesan Anda telah kami terima. Kami akan segera menghubungi Anda."}
                  </p>

                  <button
                    onClick={handleReset}
                    className="gd-btn gd-btn--outline"
                    style={{ marginTop: "8px" }}
                  >
                    Kirim Pesan Lain
                  </button>
                </div>

              ) : (
                /* ── FORM STATE ── */
                <>
                  <h3 className="gd-form-title">Send a Message</h3>

                  {/* Global error banner */}
                  {globalError && (
                    <div style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "flex-start",
                      background: "rgba(239,68,68,0.08)",
                      border: "1px solid rgba(239,68,68,0.25)",
                      borderLeft: "3px solid #ef4444",
                      padding: "12px 16px",
                      marginBottom: "20px",
                      borderRadius: "0 2px 2px 0",
                    }}>
                      <svg viewBox="0 0 20 20" fill="#ef4444" style={{ width: "18px", height: "18px", flexShrink: 0, marginTop: "1px" }}>
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <p style={{ fontSize: "14px", color: "#dc2626", lineHeight: 1.5 }}>
                        {globalError}
                      </p>
                    </div>
                  )}

                  {/* CF7 non-success message (e.g. validation failed) */}
                  {result && !isSuccess && result.message && (
                    <div style={{
                      background: "rgba(234,179,8,0.08)",
                      border: "1px solid rgba(234,179,8,0.25)",
                      borderLeft: "3px solid #eab308",
                      padding: "12px 16px",
                      marginBottom: "20px",
                      borderRadius: "0 2px 2px 0",
                    }}>
                      <p style={{ fontSize: "14px", color: "#854d0e", lineHeight: 1.5 }}>
                        {result.message}
                      </p>
                    </div>
                  )}

                  <div className="gd-form-row">
                    {/* Name */}
                    <div className="gd-form-group">
                      <label htmlFor="contact-name">Full Name *</label>
                      <input
                        type="text"
                        id="contact-name"
                        name="your-name"
                        value={form["your-name"]}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        style={fieldErrors["your-name"] ? { borderBottomColor: "#ef4444" } : undefined}
                      />
                      {fieldErrors["your-name"] && (
                        <FieldError message={fieldErrors["your-name"]} />
                      )}
                    </div>

                    {/* Email */}
                    <div className="gd-form-group">
                      <label htmlFor="contact-email">Email Address *</label>
                      <input
                        type="email"
                        id="contact-email"
                        name="your-email"
                        value={form["your-email"]}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        style={fieldErrors["your-email"] ? { borderBottomColor: "#ef4444" } : undefined}
                      />
                      {fieldErrors["your-email"] && (
                        <FieldError message={fieldErrors["your-email"]} />
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="gd-form-group">
                    <label htmlFor="contact-subject">Subject</label>
                    <input
                      type="text"
                      id="contact-subject"
                      name="your-subject"
                      value={form["your-subject"]}
                      onChange={handleChange}
                      placeholder="What is your enquiry about?"
                      style={fieldErrors["your-subject"] ? { borderBottomColor: "#ef4444" } : undefined}
                    />
                    {fieldErrors["your-subject"] && (
                      <FieldError message={fieldErrors["your-subject"]} />
                    )}
                  </div>

                  {/* Message */}
                  <div className="gd-form-group">
                    <label htmlFor="contact-message">Message *</label>
                    <textarea
                      id="contact-message"
                      name="your-message"
                      rows={5}
                      value={form["your-message"]}
                      onChange={handleChange}
                      required
                      placeholder="Write your message here…"
                      style={fieldErrors["your-message"] ? { borderBottomColor: "#ef4444" } : undefined}
                    />
                    {fieldErrors["your-message"] && (
                      <FieldError message={fieldErrors["your-message"]} />
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="gd-btn gd-btn--primary gd-btn--full"
                    style={{ opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
                  >
                    {loading ? (
                      <>
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          style={{ width: "16px", height: "16px", animation: "gd-spin 0.8s linear infinite" }}
                        >
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.25" />
                          <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>

                  {/* CF7 Form ID note for dev */}
                  <p className="gd-form-note">
                    Terhubung ke WordPress CF7 form ID{" "}
                    <code>{CF7_FORM_ID}</code> via{" "}
                    <code>POST /wp-json/contact-form-7/v1/contact-forms/{CF7_FORM_ID}/feedback</code>.
                    Sesuaikan <code>CF7_FORM_ID</code> dengan ID form di dashboard WordPress.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Spinner keyframe */}
      <style>{`
        @keyframes gd-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// ── Inline field error ────────────────────────────────────────
function FieldError({ message }: { message: string }) {
  return (
    <span style={{
      display: "flex",
      alignItems: "center",
      gap: "5px",
      fontSize: "12px",
      color: "#dc2626",
      marginTop: "4px",
      fontFamily: "var(--font-display)",
    }}>
      <svg viewBox="0 0 16 16" fill="currentColor" style={{ width: "12px", height: "12px", flexShrink: 0 }}>
        <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3.5a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3A.75.75 0 018 4.5zm0 6.5a.75.75 0 110-1.5.75.75 0 010 1.5z" />
      </svg>
      {message}
    </span>
  );
}