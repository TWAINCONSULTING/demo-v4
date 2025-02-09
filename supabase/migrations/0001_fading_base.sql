/*
  # Initial Schema Setup for Englegården

  1. New Tables
    - `users` - Extended user profile information
    - `news` - News and announcements
    - `documents` - Important documents and files
    - `facilities` - Bookable facilities
    - `reservations` - Facility bookings
    - `board_meetings` - Board meeting summaries
    - `chat_messages` - Chat history for the chatbot
    - `forum_posts` - Forum discussions
    - `forum_comments` - Comments on forum posts

  2. Security
    - RLS enabled on all tables
    - Public access to specific news items
    - Authenticated access to user-specific data
    - Admin-only access to sensitive data
*/

-- Users extension table (connects to auth.users)
CREATE TABLE users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text,
  apartment_number text,
  phone text,
  role text DEFAULT 'resident' CHECK (role IN ('resident', 'board', 'admin')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- News and announcements
CREATE TABLE news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES users(id)
);

-- Documents
CREATE TABLE documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  file_url text NOT NULL,
  category text NOT NULL,
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES users(id)
);

-- Facilities
CREATE TABLE facilities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  max_duration_hours int NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Reservations
CREATE TABLE reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  facility_id uuid REFERENCES facilities(id) NOT NULL,
  user_id uuid REFERENCES users(id) NOT NULL,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_duration CHECK (end_time > start_time)
);

-- Board meetings
CREATE TABLE board_meetings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  summary text NOT NULL,
  meeting_date date NOT NULL,
  document_url text,
  created_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES users(id)
);

-- Forum posts
CREATE TABLE forum_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES users(id)
);

-- Forum comments
CREATE TABLE forum_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES forum_posts(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES users(id)
);

-- Chat messages for the chatbot
CREATE TABLE chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL,
  user_id uuid REFERENCES users(id),
  content text NOT NULL,
  is_bot boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE facilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE board_meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- News policies
CREATE POLICY "Anyone can read public news" ON news
  FOR SELECT USING (is_public = true);
CREATE POLICY "Authenticated users can read all news" ON news
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admin users can manage news" ON news
  USING (EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
  ));

-- Documents policies
CREATE POLICY "Anyone can read public documents" ON documents
  FOR SELECT USING (is_public = true);
CREATE POLICY "Authenticated users can read all documents" ON documents
  FOR SELECT USING (auth.role() = 'authenticated');

-- Facilities policies
CREATE POLICY "Anyone can view facilities" ON facilities
  FOR SELECT USING (true);

-- Reservations policies
CREATE POLICY "Users can read own reservations" ON reservations
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create reservations" ON reservations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Board meetings policies
CREATE POLICY "Authenticated users can read board meetings" ON board_meetings
  FOR SELECT USING (auth.role() = 'authenticated');

-- Forum policies
CREATE POLICY "Authenticated users can read forum posts" ON forum_posts
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can create forum posts" ON forum_posts
  FOR INSERT WITH CHECK (auth.uid() = created_by);

-- Forum comments policies
CREATE POLICY "Authenticated users can read comments" ON forum_comments
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can create comments" ON forum_comments
  FOR INSERT WITH CHECK (auth.uid() = created_by);