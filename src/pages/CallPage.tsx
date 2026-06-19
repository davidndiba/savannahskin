import { useState } from 'react';
import { Phone, Clock, CheckCircle, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { CallbackRequest } from '../types';

const PHONE = '+447916628641';
const TEL = 'tel:+27101234567';

const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];

function getDates(count = 14) {
  const dates: Date[] = [];
  const today = new Date();
  for (let i = 1; i <= count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() !== 0 && d.getDay() !== 6) dates.push(d);
    if (dates.length >= 7) break;
  }
  return dates;
}

export default function CallPage() {
  const [tab, setTab] = useState<'instant' | 'callback'>('instant');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<CallbackRequest | null>(null);

  const dates = getDates();

  function validate() {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.phone.trim()) e.phone = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    if (!selectedDate || !selectedTime) return;
    setSubmitting(true);
    const payload: CallbackRequest = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      preferred_date: selectedDate.toISOString().split('T')[0],
      preferred_time: selectedTime,
      notes: form.notes,
    };
    const { error } = await supabase.from('callback_requests').insert(payload);
    setSubmitting(false);
    if (!error) setConfirmed(payload);
  }

  if (confirmed) {
    return (
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-16 animate-fade-in">
        <div className="card text-center py-12">
          <div className="w-16 h-16 rounded-full bg-savanna-sage/20 flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="text-savanna-sage" size={32} />
          </div>
          <h2 className="font-serif text-3xl text-savanna-charcoal mb-2">Callback Booked!</h2>
          <p className="text-savanna-muted font-sans text-sm mb-6">We'll call you at the scheduled time</p>
          <div className="bg-savanna-cream rounded-xl p-5 text-left space-y-3 mb-6">
            <div className="flex justify-between text-sm font-sans">
              <span className="text-savanna-muted">Name</span>
              <span className="font-medium text-savanna-bark">{confirmed.name}</span>
            </div>
            <div className="flex justify-between text-sm font-sans">
              <span className="text-savanna-muted">Phone</span>
              <span className="font-medium text-savanna-bark">{confirmed.phone}</span>
            </div>
            <div className="flex justify-between text-sm font-sans">
              <span className="text-savanna-muted">Date</span>
              <span className="font-medium text-savanna-bark">
                {new Date(confirmed.preferred_date).toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long' })}
              </span>
            </div>
            <div className="flex justify-between text-sm font-sans">
              <span className="text-savanna-muted">Time</span>
              <span className="font-medium text-savanna-bark">{confirmed.preferred_time} SAST</span>
            </div>
          </div>
          <p className="text-savanna-muted text-xs font-sans">A confirmation has been sent to {confirmed.email}</p>
          <button onClick={() => { setConfirmed(null); setTab('instant'); }} className="btn-secondary mt-5 text-sm">
            Back to Call Support
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="bg-gradient-to-br from-savanna-cream to-savanna-warm py-14 md:py-18 border-b border-savanna-cream-dark/30">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-20 h-20 mx-auto bg-savanna-earth rounded-3xl flex items-center justify-center shadow-medium mb-6">
            <Phone size={36} className="text-white" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-savanna-charcoal mb-3">Call Support</h1>
          <p className="text-savanna-bark/70 font-sans text-base md:text-lg">Speak directly with a Savanna Skin expert. Call now or schedule a callback.</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Tabs */}
        <div className="flex bg-savanna-cream rounded-xl p-1 mb-8">
          {[{ key: 'instant', label: 'Instant Call' }, { key: 'callback', label: 'Schedule Callback' }].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key as 'instant' | 'callback')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-sans font-medium transition-all duration-200 ${
                tab === t.key ? 'bg-white shadow-soft text-savanna-earth-dark' : 'text-savanna-muted hover:text-savanna-bark'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'instant' && (
          <div className="space-y-5 animate-fade-in">
            <div className="card text-center py-10">
              <p className="text-savanna-muted font-sans text-sm mb-2">Support line</p>
              <p className="font-serif text-4xl md:text-5xl text-savanna-charcoal mb-6">{PHONE}</p>
              <a
                href={TEL}
                className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4"
              >
                <Phone size={20} /> Call Now
              </a>
            </div>
            <div className="card">
              <Clock className="text-savanna-earth mb-3" size={20} />
              <h4 className="font-serif text-lg text-savanna-charcoal mb-3">Available Hours</h4>
              <ul className="space-y-2 text-sm font-sans text-savanna-bark/70">
                <li className="flex justify-between"><span>Monday – Friday</span><span className="font-medium text-savanna-bark">8:00 AM – 6:00 PM SAST</span></li>
                <li className="flex justify-between"><span>Saturday</span><span className="font-medium text-savanna-bark">9:00 AM – 2:00 PM SAST</span></li>
                <li className="flex justify-between"><span>Sunday</span><span className="font-medium text-savanna-bark">Closed</span></li>
              </ul>
            </div>
          </div>
        )}

        {tab === 'callback' && (
          <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
            {/* Personal Details */}
            <div className="card">
              <h3 className="font-serif text-xl text-savanna-charcoal mb-4">Your Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-sans font-medium text-savanna-bark mb-1.5">Full Name *</label>
                  <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className={`input-field ${errors.name ? 'border-red-400' : ''}`} placeholder="Jane Smith" />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-sans font-medium text-savanna-bark mb-1.5">Phone Number *</label>
                  <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className={`input-field ${errors.phone ? 'border-red-400' : ''}`} placeholder="+27 82 000 0000" />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-sans font-medium text-savanna-bark mb-1.5">Email Address *</label>
                  <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className={`input-field ${errors.email ? 'border-red-400' : ''}`} placeholder="jane@example.com" />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>
            </div>

            {/* Date picker */}
            <div className="card">
              <h3 className="font-serif text-xl text-savanna-charcoal mb-4">
                <Calendar className="inline-block mr-2 text-savanna-earth" size={20} />
                Select Date
              </h3>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {dates.map((d, i) => {
                  const isSelected = selectedDate?.toDateString() === d.toDateString();
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedDate(d)}
                      className={`flex flex-col items-center py-2.5 px-1 rounded-xl border text-xs font-sans transition-all ${
                        isSelected
                          ? 'bg-savanna-earth border-savanna-earth text-white'
                          : 'border-savanna-cream-dark text-savanna-bark hover:border-savanna-earth hover:bg-savanna-cream'
                      }`}
                    >
                      <span className={`font-semibold ${isSelected ? '' : 'text-savanna-muted'}`}>
                        {d.toLocaleDateString('en', { weekday: 'short' })}
                      </span>
                      <span className="font-bold text-sm mt-0.5">{d.getDate()}</span>
                      <span className={isSelected ? 'opacity-70' : 'text-savanna-muted'}>
                        {d.toLocaleDateString('en', { month: 'short' })}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time slots */}
            {selectedDate && (
              <div className="card animate-fade-in">
                <h3 className="font-serif text-xl text-savanna-charcoal mb-4">Select Time</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2.5 rounded-xl border text-sm font-sans font-medium transition-all ${
                          isSelected
                            ? 'bg-savanna-earth border-savanna-earth text-white'
                            : 'border-savanna-cream-dark text-savanna-bark hover:border-savanna-earth hover:bg-savanna-cream'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Notes */}
            <div className="card">
              <label className="block text-sm font-sans font-medium text-savanna-bark mb-1.5">Notes (optional)</label>
              <textarea
                rows={3}
                value={form.notes}
                onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                className="input-field resize-none"
                placeholder="Tell us briefly what you'd like to discuss..."
              />
            </div>

            <button
              type="submit"
              disabled={submitting || !selectedDate || !selectedTime}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Booking...' : 'Confirm Callback'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
