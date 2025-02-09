import { supabase } from '../lib/supabase';

const CHATBASE_CONFIG = {
  id: 'HfzFUh2PS77T4ZFXSgRLH',
  domain: 'chatbase.co',
  scriptUrl: 'https://www.chatbase.co/embed.min.js'
} as const;

async function generateUserHash(userId: string): Promise<string> {
  try {
    // First check if we have a valid existing session
    const { data: existingSession } = await supabase
      .from('chat_sessions')
      .select('verification_hash')
      .eq('user_id', userId)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (existingSession?.verification_hash) {
      return existingSession.verification_hash;
    }

    // Generate new hash via Edge Function
    const { data, error } = await supabase.functions.invoke('generate-chat-hash', {
      body: { userId }
    });
    
    if (error) throw error;

    // Store the new hash
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Hash valid for 7 days

    await supabase.from('chat_sessions').insert({
      user_id: userId,
      verification_hash: data.hash,
      expires_at: expiresAt.toISOString()
    });

    return data.hash;
  } catch (error) {
    console.error('Failed to generate chat hash:', error);
    throw error;
  }
}

export async function initializeChatbot(userId: string | undefined) {
  // Initialize chatbase queue if it doesn't exist
  if (!window.chatbase) {
    const queue: any[] = [];
    window.chatbase = function(...args: any[]) {
      if (!window.chatbase.q) {
        window.chatbase.q = queue;
      }
      return window.chatbase.q.push(args);
    };
  }

  const config: any = {
    chatbotId: CHATBASE_CONFIG.id,
    domain: CHATBASE_CONFIG.domain,
    language: 'no',
    theme: {
      primaryColor: '#005750',
      fontSize: '16px',
      fontFamily: 'Inter var, system-ui, sans-serif'
    }
  };

  if (userId) {
    try {
      const hash = await generateUserHash(userId);
      config.identityVerification = {
        userId,
        hash
      };
    } catch (error) {
      console.error('Failed to initialize chatbot with identity:', error);
    }
  }

  // Ensure configuration is set
  window.chatbase('setConfig', config);
}

export function loadChatbotScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if script already exists
    if (document.getElementById(CHATBASE_CONFIG.id)) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = CHATBASE_CONFIG.scriptUrl;
    script.id = CHATBASE_CONFIG.id;
    script.setAttribute('domain', CHATBASE_CONFIG.domain);
    script.defer = true;
    script.crossOrigin = 'anonymous';
    
    script.onload = () => {
      // Wait a bit to ensure chatbase is fully initialized
      setTimeout(resolve, 100);
    };
    script.onerror = () => reject(new Error('Failed to load chatbot script'));
    document.body.appendChild(script);
  });
}