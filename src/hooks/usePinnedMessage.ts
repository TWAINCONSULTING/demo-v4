import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { newsApi } from '../api/newsSection';
import { useNotificationStore } from '../store/notificationStore';
import { checkSupabaseConnection } from '../lib/supabase';

interface PinnedMessage {
  id: string;
  title: string;
  content: string;
  date: string;
}

export function usePinnedMessage() {
  const [pinnedMessage, setPinnedMessage] = useState<PinnedMessage | undefined>(() => {
    return storage.get<PinnedMessage>('pinned_message', undefined);
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addNotification } = useNotificationStore();

  // Fetch pinned message from API
  useEffect(() => {
    const fetchPinnedMessage = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check connection first
        const isConnected = await checkSupabaseConnection();
        if (!isConnected) {
          throw new Error('Unable to connect to database. Please check your connection.');
        }

        const data = await newsApi.getPinned();
        if (data) {
          const message = {
            id: data.id,
            title: data.title,
            content: data.content,
            date: data.date
          };
          setPinnedMessage(message);
          storage.set('pinned_message', message);
        } else {
          setPinnedMessage(undefined);
          storage.remove('pinned_message');
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch pinned message';
        console.error('Failed to fetch pinned message:', err);
        setError(message);
        
        // Show error notification only if it's not a connection error
        if (message !== 'Failed to fetch') {
          addNotification({
            type: 'error',
            message,
            duration: 5000
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPinnedMessage();
  }, [addNotification]);

  const handlePinMessage = async (message: PinnedMessage) => {
    try {
      setLoading(true);
      setError(null);
      await newsApi.togglePin(message.id);
      
      // Update local state based on toggle result
      const updatedMessage = await newsApi.getPinned();
      if (updatedMessage && updatedMessage.id === message.id) {
        setPinnedMessage(message);
        storage.set('pinned_message', message);
      } else {
        setPinnedMessage(undefined);
        storage.remove('pinned_message');
      }

      addNotification({
        type: 'success',
        message: updatedMessage ? 'Message pinned successfully' : 'Message unpinned successfully',
        duration: 3000
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update pinned message';
      setError(errorMessage);
      addNotification({
        type: 'error',
        message: errorMessage,
        duration: 5000
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    pinnedMessage,
    loading,
    error,
    handlePinMessage
  };
}