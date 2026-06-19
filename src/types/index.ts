export interface GuestInfo {
  name: string;
  email: string;
}

export interface ChatMessage {
  id: string;
  session_id: string;
  sender: 'customer' | 'agent';
  content: string;
  image_url?: string;
  created_at: string;
}

export interface ChatSession {
  id: string;
  guest_name?: string;
  guest_email?: string;
  user_id?: string;
  status: 'active' | 'closed';
  created_at: string;
  updated_at: string;
}

export interface CallbackRequest {
  id?: string;
  name: string;
  email: string;
  phone: string;
  preferred_date: string;
  preferred_time: string;
  notes?: string;
  status?: string;
}

export interface ConsultationBooking {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  booking_date: string;
  booking_time: string;
  consultation_type: 'video' | 'phone' | 'whatsapp';
  notes?: string;
  status?: string;
}

export interface SupportTicket {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  attachment_url?: string;
  status?: string;
}
