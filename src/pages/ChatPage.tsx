import { useState, useEffect, useRef } from 'react';
import { Send, Image, X, Circle, Paperclip } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useApp } from '../context/AppContext';
import GuestForm from '../components/GuestForm';
import type { ChatMessage } from '../types';

const AGENT_NAME = 'Aisha';
const AGENT_AVATAR = 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&dpr=2';

const agentGreeting = `Hi there! I'm ${AGENT_NAME}, your dedicated Savanna Skin support specialist. How can I help you today? ✨`;

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function ChatPage() {
  const { guestInfo } = useApp();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [agentTyping, setAgentTyping] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!guestInfo || sessionId) return;
    initSession();
  }, [guestInfo]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, agentTyping]);

  async function initSession() {
    const { data, error } = await supabase
      .from('chat_sessions')
      .insert({ guest_name: guestInfo!.name, guest_email: guestInfo!.email })
      .select()
      .single();
    if (error || !data) return;
    setSessionId(data.id);
    const greeting: ChatMessage = {
      id: crypto.randomUUID(),
      session_id: data.id,
      sender: 'agent',
      content: agentGreeting,
      created_at: new Date().toISOString(),
    };
    await supabase.from('chat_messages').insert(greeting);
    setMessages([greeting]);
  }

  async function sendMessage() {
    if (!input.trim() && !imagePreview) return;
    if (!sessionId) return;
    setSending(true);
    const msg: ChatMessage = {
      id: crypto.randomUUID(),
      session_id: sessionId,
      sender: 'customer',
      content: input.trim() || '(Image)',
      image_url: imagePreview || undefined,
      created_at: new Date().toISOString(),
    };
    await supabase.from('chat_messages').insert(msg);
    setMessages(prev => [...prev, msg]);
    setInput('');
    setImagePreview(null);
    setSending(false);
    simulateAgentReply(msg.content);
  }

  function simulateAgentReply(customerMsg: string) {
    setAgentTyping(true);
    const delay = 1500 + Math.random() * 1500;
    setTimeout(async () => {
      setAgentTyping(false);
      const reply = getAutoReply(customerMsg);
      const agentMsg: ChatMessage = {
        id: crypto.randomUUID(),
        session_id: sessionId!,
        sender: 'agent',
        content: reply,
        created_at: new Date().toISOString(),
      };
      await supabase.from('chat_messages').insert(agentMsg);
      setMessages(prev => [...prev, agentMsg]);
    }, delay);
  }

  function getAutoReply(msg: string): string {
    const lower = msg.toLowerCase();
    if (lower.includes('order') || lower.includes('track')) {
      return 'I can help with your order! Could you please share your order number? I\'ll look it up right away.';
    }
    if (lower.includes('return') || lower.includes('refund')) {
      return 'Our returns are easy — you have 30 days from delivery. I can initiate the process for you. What\'s your order number?';
    }
    if (lower.includes('skin') || lower.includes('product') || lower.includes('routine')) {
      return 'Great question! Our skincare experts can help you find the perfect routine. Would you like to book a free consultation, or shall I recommend products based on your skin type?';
    }
    if (lower.includes('shipping') || lower.includes('delivery')) {
      return 'Standard delivery takes 3–5 business days. Express shipping (1–2 days) is available. Would you like to upgrade your current order?';
    }
    return 'Thank you for reaching out! I\'m reviewing your message. Could you share a bit more detail so I can provide the best assistance?';
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  if (!guestInfo) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-16">
        <GuestForm />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* Chat header */}
      <div className="card mb-0 rounded-b-none border-b-0 flex items-center gap-4 py-4">
        <div className="relative">
          <img src={AGENT_AVATAR} alt={AGENT_NAME} className="w-12 h-12 rounded-full object-cover" />
          <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-savanna-sage border-2 border-white rounded-full" />
        </div>
        <div>
          <div className="font-sans font-semibold text-savanna-bark">{AGENT_NAME}</div>
          <div className="flex items-center gap-1.5 text-xs text-savanna-sage font-sans">
            <Circle size={8} className="fill-current" /> Online — Savanna Skin Support
          </div>
        </div>
        <div className="ml-auto text-xs text-savanna-muted font-sans">Live Chat</div>
      </div>

      {/* Messages */}
      <div className="bg-savanna-off-white border border-savanna-cream-dark/30 border-t-0 border-b-0 min-h-[420px] max-h-[500px] overflow-y-auto p-5 flex flex-col gap-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 chat-bubble-enter ${msg.sender === 'customer' ? 'flex-row-reverse' : ''}`}>
            {msg.sender === 'agent' && (
              <img src={AGENT_AVATAR} alt={AGENT_NAME} className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-1" />
            )}
            {msg.sender === 'customer' && (
              <div className="w-8 h-8 rounded-full bg-savanna-earth flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white font-sans font-semibold text-xs">
                  {guestInfo.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className={`max-w-[75%] ${msg.sender === 'customer' ? 'items-end' : 'items-start'} flex flex-col`}>
              {msg.image_url && (
                <img src={msg.image_url} alt="attachment" className="rounded-xl max-w-full mb-2 border border-savanna-cream-dark" />
              )}
              {msg.content && msg.content !== '(Image)' && (
                <div className={`px-4 py-3 rounded-2xl text-sm font-sans leading-relaxed ${
                  msg.sender === 'agent'
                    ? 'bg-white border border-savanna-cream-dark/40 text-savanna-bark rounded-tl-sm shadow-soft'
                    : 'bg-savanna-earth text-savanna-cream rounded-tr-sm'
                }`}>
                  {msg.content}
                </div>
              )}
              <span className="text-[10px] text-savanna-muted mt-1 font-sans">{formatTime(msg.created_at)}</span>
            </div>
          </div>
        ))}

        {agentTyping && (
          <div className="flex gap-3 items-end chat-bubble-enter">
            <img src={AGENT_AVATAR} alt={AGENT_NAME} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
            <div className="bg-white border border-savanna-cream-dark/40 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center shadow-soft">
              <div className="w-2 h-2 rounded-full bg-savanna-muted typing-dot" />
              <div className="w-2 h-2 rounded-full bg-savanna-muted typing-dot" />
              <div className="w-2 h-2 rounded-full bg-savanna-muted typing-dot" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Image preview strip */}
      {imagePreview && (
        <div className="border border-savanna-cream-dark/30 border-t-0 border-b-0 bg-savanna-cream px-5 py-3 flex items-center gap-3">
          <img src={imagePreview} alt="preview" className="h-14 w-14 rounded-lg object-cover border border-savanna-cream-dark" />
          <span className="text-xs text-savanna-muted font-sans flex-1">Image attached</span>
          <button onClick={() => setImagePreview(null)} className="text-savanna-muted hover:text-savanna-bark transition-colors">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Input */}
      <div className="card rounded-t-none border-t-0 flex items-end gap-3 py-3 px-4">
        <input type="file" accept="image/*" ref={fileRef} className="hidden" onChange={handleFileChange} />
        <button
          onClick={() => fileRef.current?.click()}
          className="text-savanna-muted hover:text-savanna-earth transition-colors p-1.5 flex-shrink-0"
          title="Attach image"
        >
          <Paperclip size={20} />
        </button>
        <textarea
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-1 bg-transparent text-savanna-bark placeholder-savanna-muted text-sm font-sans resize-none focus:outline-none py-1.5 max-h-24"
        />
        <button
          onClick={sendMessage}
          disabled={sending || (!input.trim() && !imagePreview)}
          className="flex-shrink-0 w-9 h-9 rounded-xl bg-savanna-earth text-white flex items-center justify-center hover:bg-savanna-earth-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
