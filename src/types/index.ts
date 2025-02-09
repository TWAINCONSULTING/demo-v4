export interface User {
  id: string;
  email: string;
  name: string;
  apartment: string;
  role: 'resident' | 'board' | 'admin';
}

export interface News {
  id: string;
  title: string;
  content: string;
  created_at: string;
  is_public: boolean;
}

export interface BoardMeeting {
  id: string;
  date: string;
  summary: string;
  document_url: string;
}

export interface Reservation {
  id: string;
  user_id: string;
  facility: string;
  date: string;
  start_time: string;
  end_time: string;
}