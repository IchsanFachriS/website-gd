// Placeholder sections for Academics, Research, Student Affairs, Contact
// These will be developed in subsequent phases

function ComingSoon({ id, label }: { id: string; label: string }) {
  return (
    <section id={id} className="gd-coming-soon" aria-labelledby={`${id}-heading`}>
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
          <p className="gd-section-kicker">{label}</p>
          <h2 id={`${id}-heading`} className="gd-coming-soon-title">Section Under Construction</h2>
          <p className="gd-coming-soon-body">
            The <strong>{label}</strong> section is currently being developed. 
            Content will be integrated from the WordPress REST API 
            at <code>gd.fitb.itb.ac.id/wp-json/</code> in the next development phase.
          </p>
          <a href="#profile" className="gd-btn gd-btn--outline">Back to Profile</a>
        </div>
      </div>
    </section>
  );
}

export function AcademicsSection() {
  return <ComingSoon id="academics" label="Academics" />;
}

export function ResearchSection() {
  return <ComingSoon id="research" label="Research" />;
}

export function StudentAffairsSection() {
  return <ComingSoon id="student-affairs" label="Student Affairs" />;
}

export function ContactSection() {
  return (
    <section id="contact" className="gd-contact" aria-labelledby="contact-heading">
      <div className="gd-container">
        <div className="gd-contact-layout">
          <div className="gd-contact-info">
            <p className="gd-section-kicker">Contact Us</p>
            <h2 id="contact-heading" className="gd-section-title">Get in Touch</h2>
            <div className="gd-section-divider" />
            <address className="gd-contact-address">
              <div className="gd-contact-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <strong>Gedung Teknik Geodesi</strong><br />
                  Jl. Ganesha No. 10, Bandung 40132<br />
                  Jawa Barat, Indonesia
                </div>
              </div>
              <div className="gd-contact-row">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+622222502324">(022) 2502324</a>
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
          </div>

          {/* Simple contact form */}
          <div className="gd-contact-form-wrap">
            <form
              className="gd-contact-form"
              onSubmit={(e) => { e.preventDefault(); alert("Form submitted — integrate with CF7 API endpoint: POST /wp-json/contact-form-7/v1/contact-forms/{id}/feedback"); }}
            >
              <h3 className="gd-form-title">Send a Message</h3>
              <div className="gd-form-row">
                <div className="gd-form-group">
                  <label htmlFor="contact-name">Full Name</label>
                  <input type="text" id="contact-name" name="your-name" required placeholder="Your name" />
                </div>
                <div className="gd-form-group">
                  <label htmlFor="contact-email">Email Address</label>
                  <input type="email" id="contact-email" name="your-email" required placeholder="your@email.com" />
                </div>
              </div>
              <div className="gd-form-group">
                <label htmlFor="contact-subject">Subject</label>
                <input type="text" id="contact-subject" name="your-subject" placeholder="What is your enquiry about?" />
              </div>
              <div className="gd-form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea id="contact-message" name="your-message" rows={5} required placeholder="Write your message here…" />
              </div>
              <button type="submit" className="gd-btn gd-btn--primary gd-btn--full">
                Send Message
              </button>
              <p className="gd-form-note">
                This form integrates with Contact Form 7 via{" "}
                <code>POST /wp-json/contact-form-7/v1/contact-forms/&#123;id&#125;/feedback</code>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
