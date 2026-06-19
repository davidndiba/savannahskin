
-- Chat sessions and messages
CREATE TABLE IF NOT EXISTS chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  guest_name text,
  guest_email text,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'closed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  sender text NOT NULL CHECK (sender IN ('customer', 'agent')),
  content text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Callback requests
CREATE TABLE IF NOT EXISTS callback_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  preferred_date date NOT NULL,
  preferred_time text NOT NULL,
  notes text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

-- Consultation bookings
CREATE TABLE IF NOT EXISTS consultation_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  booking_date date NOT NULL,
  booking_time text NOT NULL,
  consultation_type text NOT NULL CHECK (consultation_type IN ('video', 'phone', 'whatsapp')),
  notes text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

-- Email support tickets
CREATE TABLE IF NOT EXISTS support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  attachment_url text,
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  created_at timestamptz DEFAULT now()
);

-- RLS
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE callback_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

-- Chat sessions: public insert/select (guest support)
CREATE POLICY "insert_chat_sessions" ON chat_sessions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "select_chat_sessions" ON chat_sessions FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "update_chat_sessions" ON chat_sessions FOR UPDATE TO anon, authenticated USING (true);
CREATE POLICY "delete_chat_sessions" ON chat_sessions FOR DELETE TO authenticated USING (true);

-- Chat messages: public insert/select
CREATE POLICY "insert_chat_messages" ON chat_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "select_chat_messages" ON chat_messages FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "update_chat_messages" ON chat_messages FOR UPDATE TO authenticated USING (true);
CREATE POLICY "delete_chat_messages" ON chat_messages FOR DELETE TO authenticated USING (true);

-- Callbacks: public insert, authenticated manage
CREATE POLICY "insert_callback_requests" ON callback_requests FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "select_callback_requests" ON callback_requests FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "update_callback_requests" ON callback_requests FOR UPDATE TO authenticated USING (true);
CREATE POLICY "delete_callback_requests" ON callback_requests FOR DELETE TO authenticated USING (true);

-- Consultations: public insert, authenticated manage
CREATE POLICY "insert_consultation_bookings" ON consultation_bookings FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "select_consultation_bookings" ON consultation_bookings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "update_consultation_bookings" ON consultation_bookings FOR UPDATE TO authenticated USING (true);
CREATE POLICY "delete_consultation_bookings" ON consultation_bookings FOR DELETE TO authenticated USING (true);

-- Support tickets: public insert, authenticated manage
CREATE POLICY "insert_support_tickets" ON support_tickets FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "select_support_tickets" ON support_tickets FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "update_support_tickets" ON support_tickets FOR UPDATE TO authenticated USING (true);
CREATE POLICY "delete_support_tickets" ON support_tickets FOR DELETE TO authenticated USING (true);
