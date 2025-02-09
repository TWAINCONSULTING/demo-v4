import React, { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { initializeChatbot, loadChatbotScript } from '../../services/chatbot';

export function ChatbotScripts() {
  const { user } = useAuth();

  useEffect(() => {
    const setupChatbot = async () => {
      try {
        await loadChatbotScript();
        await initializeChatbot(user?.id);
      } catch (error) {
        console.error('Failed to initialize chatbot:', error);
      }
    };

    setupChatbot();
  }, [user?.id]);

  return null;
}