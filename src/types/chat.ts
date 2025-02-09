export interface ChatMessage {
  id: string;
  content: string;
  author: string;
  role?: string;
  isUser: boolean;
  timestamp: string;
}

export interface ChatThread {
  id: string;
  subject: string;
  date: string;
  status: string;
  messages: ChatMessage[];
}