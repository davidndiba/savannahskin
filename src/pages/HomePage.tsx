import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, MessageSquare, Phone, Mail, Calendar, ChevronDown, ChevronUp, ArrowRight, Star } from 'lucide-react';

const channels = [
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Instant messaging with a support agent. Get real-time answers to your questions.',
    cta: 'Start Chat',
    path: '/chat',
    color: 'bg-savanna-sage',
    badgeText: 'Fastest',
    badgeColor: 'bg-savanna-sage-light text-white',
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp',
    description: 'Chat with us on WhatsApp for convenient, familiar support on your phone.',
    cta: 'Open WhatsApp',
    path: '/whatsapp',
    color: 'bg-[#25D366]',
    badgeText: 'Popular',
    badgeColor: 'bg-green-100 text-green-700',
  },
  {
    icon: Phone,
    title: 'Call Support',
    description: 'Speak directly with a skincare expert. Book a callback at your convenience.',
    cta: 'Call or Callback',
    path: '/call',
    color: 'bg-savanna-earth',
    badgeText: 'Direct',
    badgeColor: 'bg-savanna-warm text-savanna-earth-dark',
  },
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Send a detailed message and receive a thorough response within 24 hours.',
    cta: 'Send Email',
    path: '/email',
    color: 'bg-savanna-olive',
    badgeText: '24h Response',
    badgeColor: 'bg-savanna-olive-light/30 text-savanna-olive',
  },
];

const faqs = [
  {
    q: 'What is your return policy?',
    a: 'We offer a 30-day hassle-free return policy on all products. Items must be unused and in original packaging. Contact our support team to initiate a return.',
  },
  {
    q: 'How long does shipping take?',
    a: 'Standard shipping takes 3–5 business days within South Africa. Express shipping (1–2 days) is available at checkout. International orders typically take 7–14 business days.',
  },
  {
    q: 'Are your products suitable for sensitive skin?',
    a: 'Yes! All Savanna Skin products are formulated with natural, gentle ingredients. We recommend our Baobab Calming Range specifically for sensitive skin types. Patch testing is always advised.',
  },
  {
    q: 'Can I use multiple products together?',
    a: 'Absolutely. Our products are designed to work synergistically. We recommend starting with our Savanna Essentials kit for a complete routine. Our skincare consultants can create a personalised plan for you.',
  },
  {
    q: 'How do I track my order?',
    a: 'Once your order ships, you\'ll receive a tracking number via email. You can also check your order status on our website under "My Orders," or contact our support team with your order number.',
  },
  {
    q: 'Are your products cruelty-free?',
    a: 'Yes — Savanna Skin is 100% cruelty-free and never tests on animals. Many of our products are also vegan-certified. Look for the leaf icon on product pages.',
  },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-savanna-cream via-savanna-off-white to-savanna-warm py-20 md:py-28">
        <div className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 80%, #D4B896 0%, transparent 50%), radial-gradient(circle at 80% 20%, #7A9B7A 0%, transparent 40%)',
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-savanna-sand/40 rounded-full px-4 py-1.5 text-xs font-sans text-savanna-earth font-medium mb-6">
            <div className="w-2 h-2 rounded-full bg-savanna-sage animate-pulse" />
            Support team online now
          </div>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-savanna-charcoal mb-5 leading-tight">
            How can we<br />
            <span className="text-savanna-earth">help you today?</span>
          </h1>
          <p className="text-savanna-bark/70 font-sans text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Our dedicated support team is here to help with your skincare journey — from product guidance to order support.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/chat" className="btn-primary flex items-center gap-2">
              <MessageCircle size={18} /> Start Live Chat
            </Link>
            <Link to="/book" className="btn-secondary flex items-center gap-2">
              <Calendar size={18} /> Book Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Channel Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl text-savanna-charcoal mb-3">Choose your preferred channel</h2>
          <p className="text-savanna-muted font-sans text-sm md:text-base">We're available across multiple platforms for your convenience</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {channels.map((channel) => {
            const Icon = channel.icon;
            return (
              <Link
                key={channel.path}
                to={channel.path}
                className="card group hover:shadow-medium hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${channel.color} flex items-center justify-center shadow-soft`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <span className={`text-xs font-sans font-semibold px-2.5 py-1 rounded-full ${channel.badgeColor}`}>
                    {channel.badgeText}
                  </span>
                </div>
                <h3 className="font-serif text-xl text-savanna-charcoal mb-2">{channel.title}</h3>
                <p className="text-savanna-muted text-sm font-sans leading-relaxed flex-1">{channel.description}</p>
                <div className="flex items-center gap-1.5 mt-5 text-savanna-earth font-sans text-sm font-semibold group-hover:gap-2.5 transition-all">
                  {channel.cta} <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-savanna-earth py-10 md:py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '< 2 min', label: 'Average chat response' },
              { value: '24h', label: 'Email response time' },
              { value: '4.9', label: 'Customer rating', icon: Star },
              { value: '98%', label: 'Issue resolution rate' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="font-serif text-2xl md:text-3xl text-savanna-cream mb-1 flex items-center justify-center gap-1">
                  {stat.icon && <stat.icon size={20} className="fill-savanna-sand text-savanna-sand" />}
                  {stat.value}
                </div>
                <div className="text-savanna-cream/60 font-sans text-xs md:text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16 md:py-20">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl text-savanna-charcoal mb-3">Frequently asked questions</h2>
          <p className="text-savanna-muted font-sans text-sm md:text-base">Find quick answers to common queries</p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-savanna-cream-dark/30 overflow-hidden shadow-soft"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left gap-4 hover:bg-savanna-cream/30 transition-colors"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <span className="font-sans font-medium text-savanna-bark text-sm md:text-base">{faq.q}</span>
                {openFaq === i
                  ? <ChevronUp size={18} className="text-savanna-earth flex-shrink-0" />
                  : <ChevronDown size={18} className="text-savanna-muted flex-shrink-0" />
                }
              </button>
              {openFaq === i && (
                <div className="px-6 pb-5 text-savanna-bark/70 text-sm font-sans leading-relaxed border-t border-savanna-cream-dark/20 pt-4 animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Book Consultation CTA */}
      <section className="bg-gradient-to-r from-savanna-cream to-savanna-warm py-14 md:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <Calendar className="mx-auto mb-4 text-savanna-earth" size={36} />
          <h2 className="font-serif text-3xl md:text-4xl text-savanna-charcoal mb-3">Need personalised advice?</h2>
          <p className="text-savanna-bark/70 font-sans text-sm md:text-base mb-7 leading-relaxed">
            Book a one-on-one consultation with a Savanna Skin expert via video, phone, or WhatsApp.
          </p>
          <Link to="/book" className="btn-primary inline-flex items-center gap-2">
            <Calendar size={18} /> Book a Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
