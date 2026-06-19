import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, Phone, Mail, Menu, X, Calendar, MessageSquare } from 'lucide-react';

const navItems = [
  { label: 'Support Home', path: '/', icon: null },
  { label: 'Live Chat', path: '/chat', icon: MessageCircle },
  { label: 'WhatsApp', path: '/whatsapp', icon: MessageSquare },
  { label: 'Call Us', path: '/call', icon: Phone },
  { label: 'Email', path: '/email', icon: Mail },
  { label: 'Book Consultation', path: '/book', icon: Calendar },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-white border-b border-savanna-cream-dark/40 sticky top-0 z-50 shadow-soft">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-savanna-earth flex items-center justify-center shadow-soft group-hover:bg-savanna-earth-dark transition-colors">
              <span className="font-serif text-savanna-cream font-semibold text-sm md:text-base tracking-wide">S</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-serif text-savanna-charcoal text-lg md:text-xl font-medium tracking-wide">Savanna Skin</span>
              <span className="text-savanna-muted text-[10px] md:text-xs font-sans tracking-widest uppercase">Support Portal</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-sans font-medium transition-all duration-200 ${
                    active
                      ? 'bg-savanna-cream text-savanna-earth-dark'
                      : 'text-savanna-bark/70 hover:bg-savanna-cream/60 hover:text-savanna-bark'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-savanna-bark hover:bg-savanna-cream transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-savanna-cream-dark/40 animate-fade-in">
          <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'bg-savanna-cream text-savanna-earth-dark'
                      : 'text-savanna-bark/70 hover:bg-savanna-cream/50'
                  }`}
                >
                  {Icon && <Icon size={18} className="flex-shrink-0" />}
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
