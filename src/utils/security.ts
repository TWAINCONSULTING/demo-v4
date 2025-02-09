import { storage } from './storage'

// CSRF token handling
export const getCsrfToken = (): string => {
  let token = storage.get<string>('csrf_token', '')
  
  if (!token) {
    token = crypto.randomUUID()
    storage.set('csrf_token', token)
  }
  
  return token
}

// HMAC generation using Web Crypto API
export const generateHmac = async (data: string): Promise<string> => {
  const encoder = new TextEncoder();
  const keyData = encoder.encode('your-secret-key'); // Replace with env variable in production
  const messageData = encoder.encode(data);

  // Import the key
  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  // Sign the message
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    messageData
  );

  // Convert to hex string
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Input sanitization
export const sanitizeInput = (input: string): string => {
  const div = document.createElement('div')
  div.textContent = input
  return div.innerHTML
}

// Rate limiting
const rateLimits: Record<string, number[]> = {}

export const checkRateLimit = (key: string, limit: number, window: number): boolean => {
  const now = Date.now()
  const timestamps = rateLimits[key] || []
  
  // Remove old timestamps
  const validTimestamps = timestamps.filter(t => now - t < window)
  rateLimits[key] = validTimestamps
  
  if (validTimestamps.length >= limit) {
    return false
  }
  
  rateLimits[key] = [...validTimestamps, now]
  return true
}

// src/utils/security.ts
const validateServiceKey = (key: string): boolean => {
  // Add validation logic
  return /^sbp_[a-zA-Z0-9]{40,}$/.test(key);
}

// Only use service role for admin/backend operations
const getServiceClient = () => {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!serviceKey || !validateServiceKey(serviceKey)) {
    throw new Error('Invalid service role key configuration');
  }

  return createClient(
    process.env.SUPABASE_URL!,
    serviceKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );
};
