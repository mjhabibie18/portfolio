"use client";

import { useState } from "react";

export default function ContactForm({ dict, lang }: { dict: any; lang: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch(`/api/portfolio/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus({ type: 'success', message: lang === 'en' ? 'Message sent successfully! I will get back to you soon.' : 'Pesan berhasil dikirim! Saya akan segera menghubungi Anda kembali.' });
        (e.target as HTMLFormElement).reset();
      } else {
        const err = await res.json();
        setStatus({ type: 'error', message: err.message || (lang === 'en' ? 'Failed to send message. Please try again.' : 'Gagal mengirim pesan. Silakan coba lagi.') });
      }
    } catch (error) {
      setStatus({ type: 'error', message: lang === 'en' ? 'Network error occurred. Failed to contact server.' : 'Terjadi kesalahan jaringan. Gagal menghubungi server.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-card fade-in-up delay-3" style={{ padding: '2rem' }}>
      <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
        <div className="form-group">
          <label className="form-label" htmlFor="contact-name">{dict.Contact_Name}</label>
          <input type="text" id="contact-name" name="name" className="form-control"
            placeholder="John Doe" required aria-required="true" />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="contact-email">{dict.Contact_Email}</label>
          <input type="email" id="contact-email" name="email" className="form-control"
            placeholder="john@example.com" required aria-required="true" />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="contact-message">{dict.Contact_MessageLabel}</label>
          <textarea id="contact-message" name="message" className="form-control"
            placeholder={dict.Contact_Message} rows={5} required aria-required="true"></textarea>
        </div>

        <button type="submit" className="btn-primary" disabled={isSubmitting} style={{ width: '100%', justifyContent: 'center' }}>
          {isSubmitting ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
              {dict.Contact_Sending}
            </span>
          ) : (
            <span>{dict.Contact_Send}</span>
          )}
        </button>

        {status.type === 'success' && (
          <div className="form-success" style={{ display: 'block', marginTop: '1rem' }} role="status">
            {status.message}
          </div>
        )}
        
        {status.type === 'error' && (
          <div className="form-error" style={{ display: 'block', marginTop: '1rem', textAlign: 'center' }} role="alert">
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
}
