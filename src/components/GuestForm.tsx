import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Mail, ArrowRight } from 'lucide-react';

interface Props {
  onComplete?: () => void;
}

export default function GuestForm({ onComplete }: Props) {
  const { setGuestInfo } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  function validate() {
    const e: { name?: string; email?: string } = {};
    if (!name.trim()) e.name = 'Please enter your name';
    if (!email.trim()) e.email = 'Please enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Please enter a valid email';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setGuestInfo({ name: name.trim(), email: email.trim() });
    onComplete?.();
  }

  return (
    <div className="card max-w-md mx-auto animate-slide-up">
      <div className="text-center mb-6">
        <div className="w-14 h-14 rounded-full bg-savanna-cream mx-auto flex items-center justify-center mb-4">
          <User className="text-savanna-earth" size={26} />
        </div>
        <h2 className="font-serif text-2xl text-savanna-charcoal mb-1">Welcome</h2>
        <p className="text-savanna-muted text-sm font-sans">Enter your details to continue</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-sans font-medium text-savanna-bark mb-1.5">Full Name</label>
          <div className="relative">
            <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-savanna-muted" />
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Jane Smith"
              className={`input-field pl-10 ${errors.name ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : ''}`}
            />
          </div>
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-sans font-medium text-savanna-bark mb-1.5">Email Address</label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-savanna-muted" />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="jane@example.com"
              className={`input-field pl-10 ${errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : ''}`}
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 mt-2">
          Continue <ArrowRight size={16} />
        </button>
      </form>
    </div>
  );
}
