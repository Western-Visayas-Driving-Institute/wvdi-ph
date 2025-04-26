import React, { useState, useEffect } from 'react';
import './App.css';

export default function ContactForm() {
  const [form, setForm] = useState({
    email: '',
    phone: '',
    description: '',
    location: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get location by IP
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        const loc = `${data.city || ''}, ${data.region || ''}, ${data.country_name || ''}`;
        setForm(f => ({ ...f, location: loc }));
      })
      .catch(() => {});
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('https://formspree.io/f/myzwzwjk', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(e.target)
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError('Submission failed. Please try again later.');
      }
    } catch (err) {
      setError('Submission failed. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return <div className="wvdi-contact-success">Thank you! Your request has been sent. We'll get back to you soon.</div>;
  }

  return (
    <form className="wvdi-contact-form" onSubmit={handleSubmit}>
      <div className="wvdi-form-group">
        <label htmlFor="email">Email<span>*</span></label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          autoComplete="email"
          placeholder="your@email.com"
        />
      </div>
      <div className="wvdi-form-group">
        <label htmlFor="phone">Phone<span>*</span></label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          autoComplete="tel"
          placeholder="09XXXXXXXXX or +63..."
        />
      </div>
      <div className="wvdi-form-group">
        <label htmlFor="description">Describe your service request<span>*</span></label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          rows={4}
          placeholder="How can we help you?"
        />
      </div>
      {/* Hidden location field */}
      <input type="hidden" name="location" value={form.location} />
      <div className="wvdi-form-group">
        <button type="submit" disabled={submitting} className="wvdi-cta">
          {submitting ? 'Sending...' : 'Send Request'}
        </button>
      </div>
      {error && <div className="wvdi-contact-error">{error}</div>}
    </form>
  );
}
