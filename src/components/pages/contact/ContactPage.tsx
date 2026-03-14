// ============================================================
// contact/ContactPage.tsx
// Integrated with EmailJS — sends directly to info@gd.fitb.itb.ac.id
//
// SETUP:
//   1. npm install @emailjs/browser
//   2. Ganti 3 konstanta di bawah sesuai akun EmailJS Anda:
//      - EMAILJS_SERVICE_ID
//      - EMAILJS_TEMPLATE_ID
//      - EMAILJS_PUBLIC_KEY
//
// Template variables yang digunakan di EmailJS dashboard:
//   {{from_name}}    → nama pengirim
//   {{from_email}}   → email pengirim
//   {{subject}}      → subjek
//   {{message}}      → isi pesan
//   {{to_email}}     → info@gd.fitb.itb.ac.id (set di template)
// ============================================================
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Breadcrumb, PageHero } from "../_shared/PageShell";
import type { PageProps } from "../_shared/PageShell";

// ── ⚠️  GANTI DENGAN NILAI DARI AKUN EMAILJS ANDA ────────────
const EMAILJS_SERVICE_ID  = "service_92zc5jm";   // e.g. "service_abc123"
const EMAILJS_TEMPLATE_ID = "template_bniplac";  // e.g. "template_xyz789"
const EMAILJS_PUBLIC_KEY  = "lKVPK-HKvvLkSP3JW";   // e.g. "abcDEFghiJKL123"
// ─────────────────────────────────────────────────────────────

// ── Form state ───────────────────────────────────────────────
interface FormState {
  from_name:    string;
  from_email:   string;
  subject:      string;
  message:      string;
}

const INITIAL_FORM: FormState = {
  from_name:  "",
  from_email: "",
  subject:    "",
  message:    "",
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

type SendStatus = "idle" | "sending" | "success" | "error";

// ── Inline field error ────────────────────────────────────────
function FieldError({ message }: { message: string }) {
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        fontSize: "12px",
        color: "#dc2626",
        marginTop: "4px",
        fontFamily: "var(--font-display)",
      }}
    >
      <svg
        viewBox="0 0 16 16"
        fill="currentColor"
        style={{ width: "12px", height: "12px", flexShrink: 0 }}
      >
        <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3.5a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3A.75.75 0 018 4.5zm0 6.5a.75.75 0 110-1.5.75.75 0 010 1.5z" />
      </svg>
      {message}
    </span>
  );
}

// ── Simple client-side validation ────────────────────────────
function validate(form: FormState): FieldErrors {
  const errors: FieldErrors = {};
  if (!form.from_name.trim())  errors.from_name  = "Nama wajib diisi.";
  if (!form.from_email.trim()) errors.from_email = "Email wajib diisi.";
  else if (!/\S+@\S+\.\S+/.test(form.from_email))
    errors.from_email = "Format email tidak valid.";
  if (!form.message.trim())    errors.message    = "Pesan wajib diisi.";
  return errors;
}

// ── Main component ────────────────────────────────────────────
export function ContactPage({ onNavigate }: PageProps) {
  const formRef                         = useRef<HTMLFormElement>(null);
  const [form, setForm]                 = useState<FormState>(INITIAL_FORM);
  const [fieldErrors, setFieldErrors]   = useState<FieldErrors>({});
  const [status, setStatus]             = useState<SendStatus>("idle");
  const [errorMsg, setErrorMsg]         = useState<string | null>(null);

  // ── Field change ──────────────────────────────────────────
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // ── Submit ────────────────────────────────────────────────
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Client-side validation
    const errors = validate(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setStatus("sending");
    setErrorMsg(null);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.from_name,
          from_email: form.from_email,
          subject:    form.subject || "(Tanpa Subjek)",
          message:    form.message,
          // to_email di-set di template EmailJS, bukan di sini
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setForm(INITIAL_FORM);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setErrorMsg(
        "Gagal mengirim pesan. Silakan coba lagi atau hubungi kami melalui email langsung."
      );
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setForm(INITIAL_FORM);
    setFieldErrors({});
    setErrorMsg(null);
  };

  const isLoading = status === "sending";

  return (
    <div>
      <Breadcrumb
        items={[{ label: "Contact Us", page: "contact-us" }]}
        onNavigate={onNavigate}
      />
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
              <div
                style={{
                  marginTop: "24px",
                  background: "var(--gray-100)",
                  height: "240px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid var(--gray-200)",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "14px",
                      color: "var(--gray-400)",
                      marginBottom: "8px",
                    }}
                  >
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

              {/* ── SUCCESS ── */}
              {status === "success" ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "48px 24px",
                    gap: "16px",
                  }}
                >
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      background: "rgba(34,197,94,0.12)",
                      border: "2px solid rgba(34,197,94,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ width: "32px", height: "32px" }}
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "22px",
                      fontWeight: 700,
                      color: "var(--navy)",
                    }}
                  >
                    Pesan Terkirim!
                  </h3>

                  <p
                    style={{
                      fontSize: "15px",
                      lineHeight: 1.7,
                      color: "var(--gray-600)",
                      maxWidth: "360px",
                    }}
                  >
                    Terima kasih, pesan Anda telah dikirim ke{" "}
                    <strong>info@gd.fitb.itb.ac.id</strong>. Kami akan segera
                    menghubungi Anda kembali.
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
                /* ── FORM ── */
                <>
                  <h3 className="gd-form-title">Send a Message</h3>

                  {/* Global error banner */}
                  {status === "error" && errorMsg && (
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "flex-start",
                        background: "rgba(239,68,68,0.08)",
                        border: "1px solid rgba(239,68,68,0.25)",
                        borderLeft: "3px solid #ef4444",
                        padding: "12px 16px",
                        marginBottom: "20px",
                        borderRadius: "0 2px 2px 0",
                      }}
                    >
                      <svg
                        viewBox="0 0 20 20"
                        fill="#ef4444"
                        style={{ width: "18px", height: "18px", flexShrink: 0, marginTop: "1px" }}
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p style={{ fontSize: "14px", color: "#dc2626", lineHeight: 1.5 }}>
                        {errorMsg}
                      </p>
                    </div>
                  )}

                  {/* Hidden form ref (opsional jika pakai sendForm) */}
                  <form ref={formRef} style={{ display: "contents" }}>

                    <div className="gd-form-row">
                      {/* Name */}
                      <div className="gd-form-group">
                        <label htmlFor="contact-name">Full Name *</label>
                        <input
                          type="text"
                          id="contact-name"
                          name="from_name"
                          value={form.from_name}
                          onChange={handleChange}
                          required
                          placeholder="Nama lengkap Anda"
                          style={
                            fieldErrors.from_name
                              ? { borderBottomColor: "#ef4444" }
                              : undefined
                          }
                        />
                        {fieldErrors.from_name && (
                          <FieldError message={fieldErrors.from_name} />
                        )}
                      </div>

                      {/* Email */}
                      <div className="gd-form-group">
                        <label htmlFor="contact-email">Email Address *</label>
                        <input
                          type="email"
                          id="contact-email"
                          name="from_email"
                          value={form.from_email}
                          onChange={handleChange}
                          required
                          placeholder="email@anda.com"
                          style={
                            fieldErrors.from_email
                              ? { borderBottomColor: "#ef4444" }
                              : undefined
                          }
                        />
                        {fieldErrors.from_email && (
                          <FieldError message={fieldErrors.from_email} />
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="gd-form-group">
                      <label htmlFor="contact-subject">Subject</label>
                      <input
                        type="text"
                        id="contact-subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="Perihal pesan Anda"
                      />
                    </div>

                    {/* Message */}
                    <div className="gd-form-group">
                      <label htmlFor="contact-message">Message *</label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        required
                        placeholder="Tulis pesan Anda di sini…"
                        style={
                          fieldErrors.message
                            ? { borderBottomColor: "#ef4444" }
                            : undefined
                        }
                      />
                      {fieldErrors.message && (
                        <FieldError message={fieldErrors.message} />
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="gd-btn gd-btn--primary gd-btn--full"
                      style={{
                        opacity: isLoading ? 0.7 : 1,
                        cursor: isLoading ? "not-allowed" : "pointer",
                      }}
                    >
                      {isLoading ? (
                        <>
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            style={{
                              width: "16px",
                              height: "16px",
                              animation: "gd-spin 0.8s linear infinite",
                            }}
                          >
                            <circle
                              cx="12" cy="12" r="10"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeOpacity="0.25"
                            />
                            <path
                              d="M12 2a10 10 0 0110 10"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                          </svg>
                          Mengirim…
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </button>

                  </form>
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