import { useState } from 'react';
import { Calendar, Video, Phone, MessageSquare, CheckCircle, ExternalLink, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { ConsultationBooking } from '../types';

const consultationTypes = [
  {
    key: 'video',
    icon: Video,
    label: 'Video Call',
    description: 'Face-to-face consultation via Zoom or Google Meet',
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50 border-blue-200 text-blue-700',
  },
  {
    key: 'phone',
    icon: Phone,
    label: 'Phone Call',
    description: 'Speak with a skincare expert over the phone',
    color: 'bg-savanna-earth',
    lightColor: 'bg-savanna-warm border-savanna-sand text-savanna-earth-dark',
  },
  {
    key: 'whatsapp',
    icon: MessageSquare,
    label: 'WhatsApp Chat',
    description: 'Text-based consultation on WhatsApp Messenger',
    color: 'bg-[#25D366]',
    lightColor: 'bg-green-50 border-green-200 text-green-700',
  },
] as const;

const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00'];

function getAvailableDates(count = 10) {
  const dates: Date[] = [];
  const today = new Date();
  let d = new Date(today);
  d.setDate(d.getDate() + 1);
  while (dates.length < count) {
    if (d.getDay() !== 0 && d.getDay() !== 6) dates.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return dates;
}

function buildGoogleCalendarUrl(booking: ConsultationBooking): string {
  const start = `${booking.booking_date.replace(/-/g, '')}T${booking.booking_time.replace(':', '')}00`;
  const end = `${booking.booking_date.replace(/-/g, '')}T${
    (() => {
      const [h, m] = booking.booking_time.split(':').map(Number);
      const endMin = m + 30;
      return `${String(endMin >= 60 ? h + 1 : h).padStart(2, '0')}${String(endMin >= 60 ? endMin - 60 : endMin).padStart(2, '0')}00`;
    })()
  }`;
  const details = encodeURIComponent(`Savanna Skin ${consultationTypes.find(t => t.key === booking.consultation_type)?.label} consultation`);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${details}&dates=${start}/${end}&details=Consultation+with+Savanna+Skin+Support+Team`;
}

export default function BookingPage() {
  const [consultType, setConsultType] = useState<'video' | 'phone' | 'whatsapp' | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', notes: '' });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<ConsultationBooking | null>(null);

  const dates = getAvailableDates();

  function validate() {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate() || !consultType || !selectedDate || !selectedTime) return;
    setSubmitting(true);
    const payload: ConsultationBooking = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      booking_date: selectedDate.toISOString().split('T')[0],
      booking_time: selectedTime,
      consultation_type: consultType,
      notes: form.notes,
    };
    const { error } = await supabase.from('consultation_bookings').insert(payload);
    setSubmitting(false);
    if (!error) setConfirmed(payload);
  }

  const canSubmit = consultType && selectedDate && selectedTime && form.name && form.email;

  if (confirmed) {
    const gcalUrl = buildGoogleCalendarUrl(confirmed);
    const typeInfo = consultationTypes.find(t => t.key === confirmed.consultation_type)!;
    const TypeIcon = typeInfo.icon;
    return (
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-16 animate-fade-in">
        <div className="card text-center py-10">
          <div className="w-16 h-16 rounded-full bg-savanna-sage/20 flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="text-savanna-sage" size={32} />
          </div>
          <h2 className="font-serif text-3xl text-savanna-charcoal mb-1">Booking Confirmed!</h2>
          <p className="text-savanna-muted font-sans text-sm mb-6">Your consultation has been successfully scheduled</p>

          <div className="bg-savanna-cream rounded-xl p-5 text-left space-y-3 mb-6">
            <div className="flex items-center gap-3 pb-3 border-b border-savanna-cream-dark/40">
              <div className={`w-8 h-8 rounded-lg ${typeInfo.color} flex items-center justify-center flex-shrink-0`}>
                <TypeIcon size={16} className="text-white" />
              </div>
              <span className="font-sans font-semibold text-savanna-bark">{typeInfo.label} Consultation</span>
            </div>
            {[
              { label: 'Name', value: confirmed.name },
              { label: 'Email', value: confirmed.email },
              { label: 'Date', value: new Date(confirmed.booking_date).toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) },
              { label: 'Time', value: `${confirmed.booking_time} SAST` },
            ].map(row => (
              <div key={row.label} className="flex justify-between text-sm font-sans">
                <span className="text-savanna-muted">{row.label}</span>
                <span className="font-medium text-savanna-bark">{row.value}</span>
              </div>
            ))}
          </div>

          <a
            href={gcalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2 text-sm mb-3 w-full justify-center"
          >
            <Calendar size={16} /> Add to Google Calendar <ExternalLink size={14} />
          </a>
          <button
            onClick={() => { setConfirmed(null); setConsultType(null); setSelectedDate(null); setSelectedTime(null); setForm({ name: '', email: '', phone: '', notes: '' }); }}
            className="text-savanna-muted text-sm font-sans hover:text-savanna-bark transition-colors"
          >
            Book another consultation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="bg-gradient-to-br from-savanna-cream to-savanna-warm py-14 border-b border-savanna-cream-dark/30">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-savanna-earth to-savanna-earth-dark rounded-3xl flex items-center justify-center shadow-medium mb-6">
            <Calendar size={36} className="text-white" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-savanna-charcoal mb-3">Book a Consultation</h1>
          <p className="text-savanna-bark/70 font-sans text-base md:text-lg leading-relaxed">
            Get personalised skincare advice from our experts — completely free of charge.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Consultation type */}
          <div className="card">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-7 h-7 rounded-full bg-savanna-earth text-white text-sm font-sans font-bold flex items-center justify-center">1</div>
              <h3 className="font-serif text-xl text-savanna-charcoal">Choose consultation type</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {consultationTypes.map((type) => {
                const Icon = type.icon;
                const selected = consultType === type.key;
                return (
                  <button
                    key={type.key}
                    type="button"
                    onClick={() => setConsultType(type.key)}
                    className={`flex flex-col items-center text-center p-5 rounded-2xl border-2 transition-all duration-200 ${
                      selected
                        ? `border-savanna-earth bg-savanna-cream shadow-soft scale-[1.02]`
                        : 'border-savanna-cream-dark hover:border-savanna-sand hover:bg-savanna-off-white'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl ${type.color} flex items-center justify-center mb-3 shadow-soft`}>
                      <Icon size={22} className="text-white" />
                    </div>
                    <span className="font-sans font-semibold text-savanna-bark text-sm mb-1">{type.label}</span>
                    <span className="text-savanna-muted text-xs leading-relaxed">{type.description}</span>
                    {selected && <CheckCircle size={16} className="text-savanna-earth mt-2" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Date */}
          <div className={`card transition-opacity ${!consultType ? 'opacity-40 pointer-events-none' : ''}`}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-7 h-7 rounded-full bg-savanna-earth text-white text-sm font-sans font-bold flex items-center justify-center">2</div>
              <h3 className="font-serif text-xl text-savanna-charcoal">Select a date</h3>
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-10 gap-2">
              {dates.map((d, i) => {
                const isSelected = selectedDate?.toDateString() === d.toDateString();
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => { setSelectedDate(d); setSelectedTime(null); }}
                    className={`flex flex-col items-center py-3 px-1 rounded-xl border text-xs font-sans transition-all ${
                      isSelected
                        ? 'bg-savanna-earth border-savanna-earth text-white shadow-soft'
                        : 'border-savanna-cream-dark text-savanna-bark hover:border-savanna-earth hover:bg-savanna-cream'
                    }`}
                  >
                    <span className={`text-[10px] uppercase tracking-wide ${isSelected ? 'text-savanna-cream/80' : 'text-savanna-muted'}`}>
                      {d.toLocaleDateString('en', { weekday: 'short' })}
                    </span>
                    <span className="font-bold text-sm mt-0.5">{d.getDate()}</span>
                    <span className={`text-[10px] ${isSelected ? 'text-savanna-cream/70' : 'text-savanna-muted'}`}>
                      {d.toLocaleDateString('en', { month: 'short' })}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Time */}
          {selectedDate && (
            <div className="card animate-fade-in">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-7 h-7 rounded-full bg-savanna-earth text-white text-sm font-sans font-bold flex items-center justify-center">3</div>
                <h3 className="font-serif text-xl text-savanna-charcoal">Select a time</h3>
                <span className="text-savanna-muted text-xs font-sans ml-auto">
                  <Clock size={12} className="inline mr-1" />SAST
                </span>
              </div>
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
                          ? 'bg-savanna-earth border-savanna-earth text-white shadow-soft'
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

          {/* Step 4: Details */}
          <div className={`card transition-opacity ${!selectedTime ? 'opacity-40 pointer-events-none' : ''}`}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-7 h-7 rounded-full bg-savanna-earth text-white text-sm font-sans font-bold flex items-center justify-center">4</div>
              <h3 className="font-serif text-xl text-savanna-charcoal">Your details</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-sans font-medium text-savanna-bark mb-1.5">Full Name *</label>
                <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className={`input-field ${errors.name ? 'border-red-400' : ''}`} placeholder="Jane Smith" />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-sans font-medium text-savanna-bark mb-1.5">Email Address *</label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className={`input-field ${errors.email ? 'border-red-400' : ''}`} placeholder="jane@example.com" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-sans font-medium text-savanna-bark mb-1.5">Phone (optional)</label>
                <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="input-field" placeholder="+27 82 000 0000" />
              </div>
              <div>
                <label className="block text-sm font-sans font-medium text-savanna-bark mb-1.5">Notes (optional)</label>
                <input type="text" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  className="input-field" placeholder="Any specific concerns..." />
              </div>
            </div>
          </div>

          {/* Summary */}
          {canSubmit && (
            <div className="bg-savanna-cream rounded-2xl px-6 py-4 border border-savanna-cream-dark/40 animate-fade-in">
              <h4 className="font-sans font-semibold text-savanna-bark text-sm mb-3">Booking Summary</h4>
              <div className="grid grid-cols-2 gap-y-2 text-sm font-sans">
                <span className="text-savanna-muted">Type</span>
                <span className="text-savanna-bark font-medium">{consultationTypes.find(t => t.key === consultType)?.label}</span>
                <span className="text-savanna-muted">Date</span>
                <span className="text-savanna-bark font-medium">{selectedDate?.toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                <span className="text-savanna-muted">Time</span>
                <span className="text-savanna-bark font-medium">{selectedTime} SAST</span>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || !canSubmit}
            className="btn-primary w-full flex items-center justify-center gap-2 py-4 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? 'Confirming...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  );
}
