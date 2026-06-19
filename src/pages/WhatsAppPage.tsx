import { ExternalLink, Clock, MessageSquare, Shield, Smartphone, CheckCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '27101234567';
const PRE_FILLED_MSG = encodeURIComponent('Hi Savanna Skin, I need help with...');
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${PRE_FILLED_MSG}`;

const steps = [
  { icon: Smartphone, text: 'Tap the button below to open WhatsApp' },
  { icon: MessageSquare, text: 'A pre-filled message is ready for you' },
  { icon: CheckCircle, text: 'Edit your message and hit send' },
];

export default function WhatsAppPage() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#f0faf2] to-[#dcf5e3] py-16 md:py-20 border-b border-green-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-20 h-20 mx-auto bg-[#25D366] rounded-3xl flex items-center justify-center shadow-medium mb-6">
            <MessageSquare size={38} className="text-white" />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-savanna-charcoal mb-4">WhatsApp Support</h1>
          <p className="text-savanna-bark/70 font-sans text-base md:text-lg leading-relaxed">
            Connect with us instantly on WhatsApp — the quickest way to get personalised skincare support.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Main CTA Card */}
        <div className="card text-center mb-8 py-10">
          <h2 className="font-serif text-2xl md:text-3xl text-savanna-charcoal mb-2">Ready to chat?</h2>
          <p className="text-savanna-muted font-sans text-sm mb-2">Our WhatsApp business number</p>
          <p className="font-sans font-bold text-savanna-bark text-2xl tracking-wide mb-6">+27 (0) 10 123 4567</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20bc5a] text-white font-sans font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-soft hover:shadow-medium hover:-translate-y-0.5 text-base"
          >
            <MessageSquare size={22} />
            Chat on WhatsApp
            <ExternalLink size={16} className="opacity-70" />
          </a>
          <p className="text-savanna-muted text-xs font-sans mt-4">Opens WhatsApp Web or the WhatsApp app</p>
        </div>

        {/* How it works */}
        <div className="card mb-8">
          <h3 className="font-serif text-xl text-savanna-charcoal mb-6">How it works</h3>
          <div className="flex flex-col md:flex-row gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="flex items-start gap-4 flex-1">
                  <div className="w-10 h-10 rounded-full bg-[#f0faf2] border border-[#c3e6cb] flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-[#25D366]" />
                  </div>
                  <div>
                    <div className="w-5 h-5 rounded-full bg-savanna-earth text-white text-xs font-sans font-bold flex items-center justify-center mb-1.5">{i + 1}</div>
                    <p className="text-savanna-bark/80 font-sans text-sm">{step.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Two-column info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="card">
            <Clock className="text-savanna-earth mb-3" size={22} />
            <h4 className="font-serif text-lg text-savanna-charcoal mb-3">Operating Hours</h4>
            <ul className="space-y-2 text-sm font-sans text-savanna-bark/70">
              <li className="flex justify-between"><span>Monday – Friday</span><span className="font-medium text-savanna-bark">8am – 6pm SAST</span></li>
              <li className="flex justify-between"><span>Saturday</span><span className="font-medium text-savanna-bark">9am – 2pm SAST</span></li>
              <li className="flex justify-between"><span>Sunday & Public Holidays</span><span className="font-medium text-savanna-bark">Closed</span></li>
            </ul>
            <p className="text-savanna-muted text-xs mt-4 font-sans">Outside hours? Leave a message and we'll reply the next business day.</p>
          </div>

          <div className="card">
            <Shield className="text-savanna-sage mb-3" size={22} />
            <h4 className="font-serif text-lg text-savanna-charcoal mb-3">What to expect</h4>
            <ul className="space-y-2.5 text-sm font-sans text-savanna-bark/70">
              {[
                'Response within 10 minutes during business hours',
                'Personalised product recommendations',
                'Order tracking and updates',
                'Returns & refund assistance',
                'Skincare routine consultations',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle size={14} className="text-savanna-sage mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
