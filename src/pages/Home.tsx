import React, { useState, useEffect} from 'react';
import { HeroSection } from '../components/Home/HeroSection';
import NewsSection from '../components/Home/NewsSection';
import { WeatherWidget } from '../components/Home/WeatherWidgetTemporary';
import { EventsSection } from '../components/Home/EventsSection';
import { DocumentsSection } from '../components/Home/DocumentsSection';
import { BoardMessage } from '../components/Home/BoardMessage';
import { NewsFeed } from '../components/Home/NewsFeed';
import { supabase } from '../api/supabase';

export default function Home() {
  const [pinnedMessage, setPinnedMessage] = useState<any>(null);

  // Fetch the pinned message when the component mounts
  const fetchPinnedMessage = async () => {
    const { data, error } = await supabase
      .from('news_section')
      .select('*')
      .eq('is_pinned', true)  // Get the pinned message
      .single();  // Use .single() to ensure only one message is returned

    if (error) {
      console.error('Error fetching pinned message:', error);
    } else {
      setPinnedMessage(data); // Update the state with the pinned message
    }
  };

  useEffect(() => {
    fetchPinnedMessage(); // Fetch the pinned message when the dashboard loads
  }, []);

  // Function to update the pinned message in state
  const handlePinChange = (updatedMessage: any) => {
    console.log('Pin changed to:', updatedMessage); // Log the updated message
    setPinnedMessage(updatedMessage);  // Update the pinned message when it's pinned
  };

  return (
    <div className="sm:space-y-6 space-y-3 relative z-0 pb-4 sm:mx-0">
      <HeroSection />
      <div className="grid lg:grid-cols-7 gap-4">
        <div className="lg:col-span-4 space-y-4">
          <div className="sm:px-0 px-4">
            <BoardMessage pinnedMessage={pinnedMessage} />
          </div>
          <EventsSection />
          <div className="lg:hidden">
            <WeatherWidget />
          </div>
          <NewsSection onPinChange={handlePinChange} />
        </div>
        <div className="lg:col-span-3 sm:space-y-4">
          <div className="hidden lg:block">
            <WeatherWidget />
          </div>
          <div className="m-4 my-0 sm:m-0">
            <DocumentsSection />
          </div>
          <NewsFeed />
        </div>
      </div>
    </div>
  );
}
