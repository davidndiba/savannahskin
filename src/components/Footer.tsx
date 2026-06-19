import { Link } from 'react-router-dom';
import { MessageCircle, Phone, Mail, Calendar, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-savanna-bark text-savanna-cream mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-savanna-earth flex items-center justify-center">
                <span className="font-serif text-savanna-cream font-semibold text-sm">S</span>
              </div>
              <span className="font-serif text-xl tracking-wide">Savanna Skin</span>
            </div>
            <p className="text-savanna-cream/60 text-sm leading-relaxed font-sans">
              Premium skincare rooted in the richness of the African savanna. Nature-inspired formulas for radiant, healthy skin.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-savanna-cream/50 hover:text-savanna-sand transition-colors"><Instagram size={18} /></a>
              <a href="#" className="text-savanna-cream/50 hover:text-savanna-sand transition-colors"><Facebook size={18} /></a>
              <a href="#" className="text-savanna-cream/50 hover:text-savanna-sand transition-colors"><Twitter size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-savanna-sand mb-5 text-lg">Quick Support</h4>
            <ul className="space-y-3 text-sm font-sans">
              <li><Link to="/chat" className="text-savanna-cream/60 hover:text-savanna-cream flex items-center gap-2 transition-colors"><MessageCircle size={15} /> Live Chat</Link></li>
              <li><Link to="/call" className="text-savanna-cream/60 hover:text-savanna-cream flex items-center gap-2 transition-colors"><Phone size={15} /> Call Support</Link></li>
              <li><Link to="/email" className="text-savanna-cream/60 hover:text-savanna-cream flex items-center gap-2 transition-colors"><Mail size={15} /> Email Us</Link></li>
              <li><Link to="/book" className="text-savanna-cream/60 hover:text-savanna-cream flex items-center gap-2 transition-colors"><Calendar size={15} /> Book Consultation</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-savanna-sand mb-5 text-lg">Contact</h4>
            <ul className="space-y-3 text-sm font-sans text-savanna-cream/60">
              <li className="flex items-start gap-2">
                <Phone size={15} className="mt-0.5 flex-shrink-0 text-savanna-sand" />
                <span>+447916628641</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={15} className="mt-0.5 flex-shrink-0 text-savanna-sand" />
                <span>Savannaskinsupportteam@gmail.com</span>
              </li>
              <li className="mt-4 text-savanna-cream/40 text-xs leading-relaxed">
                Mon – Fri: 8:00 AM – 6:00 PM SAST<br />
                Sat: 9:00 AM – 2:00 PM SAST
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-savanna-cream/10 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-savanna-cream/30 font-sans">
          <span>&copy; {new Date().getFullYear()} Savanna Skin. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-savanna-cream/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-savanna-cream/60 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
