import { useState, useRef } from 'react';
import { Mail, Paperclip, X, CheckCircle, Clock, ChevronDown } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { SupportTicket } from '../types';

const subjects = [
  'Order Issue',
  'Product Question',
  'Returns & Refunds',
  'Shipping & Delivery',
  'Skincare Advice',
  'General Inquiry',
];

export default function EmailPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [attachment, setAttachment] = useState<File | null>(null);
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function validate() {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (!form.email.trim()) e.email = 'Please enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email address';
    if (!form.subject) e.subject = 'Please select a subject';
    if (!form.message.trim()) e.message = 'Please enter your message';
    else if (form.message.trim().length < 20) e.message = 'Message too short — please provide more detail';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const payload: SupportTicket = {
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    };
    const { error } = await supabase.from('support_tickets').insert(payload);
    setSubmitting(false);
    if (!error) setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-16 animate-fade-in">
        <div className="card text-center py-12">
          <div className="w-16 h-16 rounded-full bg-savanna-sage/20 flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="text-savanna-sage" size={32} />
          </div>
          <h2 className="font-serif text-3xl text-savanna-charcoal mb-2">Message Sent!</h2>
          <p className="text-savanna-muted font-sans text-sm mb-6">We've received your message and will respond shortly</p>
          <div className="bg-savanna-cream rounded-xl p-5 text-left space-y-3 mb-6">
            <div className="flex justify-between text-sm font-sans">
              <span className="text-savanna-muted">Subject</span>
              <span className="font-medium text-savanna-bark">{form.subject}</span>
            </div>
            <div className="flex justify-between text-sm font-sans">
              <span className="text-savanna-muted">Sent to</span>
              <span className="font-medium text-savanna-bark">support@savannaskin.com</span>
            </div>
            <div className="flex justify-between text-sm font-sans">
              <span className="text-savanna-muted">Response to</span>
              <span className="font-medium text-savanna-bark">{form.email}</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 text-savanna-muted text-sm font-sans">
            <Clock size={15} /> Expected response within 24 hours
          </div>
          <button
            onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); setAttachment(null); }}
            className="btn-secondary mt-6 text-sm"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="bg-gradient-to-br from-savanna-olive-light/10 to-savanna-cream py-14 border-b border-savanna-cream-dark/30">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-20 h-20 mx-auto bg-savanna-olive rounded-3xl flex items-center justify-center shadow-medium mb-6">
            <Mail size={36} className="text-white" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-savanna-charcoal mb-3">Email Support</h1>
          <p className="text-savanna-bark/70 font-sans text-base md:text-lg">Send us a detailed message — we respond within 24 hours on business days.</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="card space-y-5">
              <h3 className="font-serif text-xl text-savanna-charcoal">Send a message</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-sans font-medium text-savanna-bark mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className={`input-field ${errors.name ? 'border-red-400' : ''}`}
                    placeholder="Jane Smith"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-sans font-medium text-savanna-bark mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className={`input-field ${errors.email ? 'border-red-400' : ''}`}
                    placeholder="jane@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-sans font-medium text-savanna-bark mb-1.5">Subject *</label>
                <div className="relative">
                  <select
                    value={form.subject}
                    onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                    className={`select-field ${errors.subject ? 'border-red-400' : ''}`}
                  >
                    <option value="">Select a topic...</option>
                    {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-savanna-muted pointer-events-none" />
                </div>
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label className="block text-sm font-sans font-medium text-savanna-bark mb-1.5">Message *</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className={`input-field resize-none ${errors.message ? 'border-red-400' : ''}`}
                  placeholder="Please describe your query in detail. Include any relevant order numbers or product names..."
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                <p className="text-savanna-muted text-xs mt-1 font-sans">{form.message.length} characters</p>
              </div>

              {/* File attachment */}
              <div>
                <label className="block text-sm font-sans font-medium text-savanna-bark mb-1.5">Attachment (optional)</label>
                <input type="file" ref={fileRef} className="hidden" onChange={e => setAttachment(e.target.files?.[0] || null)} />
                {attachment ? (
                  <div className="flex items-center gap-3 bg-savanna-cream rounded-xl px-4 py-3 border border-savanna-cream-dark">
                    <Paperclip size={16} className="text-savanna-earth" />
                    <span className="text-sm text-savanna-bark font-sans flex-1 truncate">{attachment.name}</span>
                    <button type="button" onClick={() => setAttachment(null)} className="text-savanna-muted hover:text-savanna-bark transition-colors">
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="w-full border-2 border-dashed border-savanna-cream-dark rounded-xl py-4 text-savanna-muted hover:border-savanna-earth hover:text-savanna-earth transition-colors text-sm font-sans flex items-center justify-center gap-2"
                  >
                    <Paperclip size={16} /> Attach a file
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="card">
              <Mail className="text-savanna-olive mb-3" size={20} />
              <h4 className="font-serif text-lg text-savanna-charcoal mb-1">Direct Email</h4>
              <p className="text-savanna-muted text-xs font-sans mb-3">Prefer to email directly?</p>
              <a href="mailto:support@savannaskin.com" className="text-savanna-earth font-sans text-sm font-medium hover:underline">
                support@savannaskin.com
              </a>
            </div>

            <div className="card">
              <Clock className="text-savanna-earth mb-3" size={20} />
              <h4 className="font-serif text-lg text-savanna-charcoal mb-3">Response Times</h4>
              <ul className="space-y-2 text-xs font-sans text-savanna-bark/70">
                <li className="flex justify-between"><span>Standard queries</span><span className="font-medium text-savanna-bark">Within 24h</span></li>
                <li className="flex justify-between"><span>Order issues</span><span className="font-medium text-savanna-bark">Within 12h</span></li>
                <li className="flex justify-between"><span>Returns</span><span className="font-medium text-savanna-bark">Within 24h</span></li>
                <li className="flex justify-between mt-2 pt-2 border-t border-savanna-cream-dark/50"><span>Business days only</span><span className="font-medium text-savanna-bark">Mon–Fri</span></li>
              </ul>
            </div>

            <div className="bg-savanna-earth rounded-2xl p-5 text-white">
              <h4 className="font-serif text-lg mb-2">Need faster help?</h4>
              <p className="text-savanna-cream/70 text-xs font-sans mb-4">Try our live chat for instant responses during business hours.</p>
              <a href="/chat" className="inline-block bg-savanna-cream text-savanna-earth-dark font-sans font-semibold text-sm px-4 py-2 rounded-lg hover:bg-white transition-colors">
                Start Live Chat
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
