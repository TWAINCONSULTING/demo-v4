import React, { useState, useEffect } from 'react';
import { Bell, Plus, ArrowRight, ChevronDown, ChevronUp, Pin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NewNewsDialog } from './NewNewsDialog';
import { useUserRole } from '../../hooks/useUserRole';
import { supabase } from '../../api/supabase'; 
import { Button } from '../ui/Button';

// Helper function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('no', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  }).replace(/\./g, '.');
};

export default function NewsSection({ onPinChange }: { onPinChange: (updatedMessage: any) => void }) {
  const [showNewNewsDialog, setShowNewNewsDialog] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { role } = useUserRole();
  const isBoard = role === 'board';
  const [newsItems, setNewsItems] = useState<any[]>([]);

  const fetchNewsItems = async () => {
    const { data, error } = await supabase
      .from('news_section')
      .select('*')
      .order('date', { ascending: false }); // Sort by date in descending order

    if (error) {
      console.error('Error fetching news items:', error);
    } else {
      // Format dates before setting state
      const formattedData = data.map(item => ({
        ...item,
        date: formatDate(item.date)
      }));
      setNewsItems(formattedData);
    }
  };

  const handlePinClick = async (item: any) => {
    try {
      // First unpin any currently pinned item
      await supabase
        .from('news_section')
        .update({ is_pinned: false })
        .eq('is_pinned', true);

      // Then pin the selected item
      const { data: pinnedData, error: pinError } = await supabase
        .from('news_section')
        .update({ is_pinned: true })
        .eq('id', item.id)
        .select('*')
        .single();

      if (pinError) throw pinError;

      // Update local state and parent component
      if (pinnedData) {
        // Format date before updating state
        const formattedPinnedData = {
          ...pinnedData,
          date: formatDate(pinnedData.date)
        };
        onPinChange(formattedPinnedData);
        setNewsItems(prevItems =>
          prevItems.map(newsItem =>
            newsItem.id === item.id 
              ? { ...newsItem, is_pinned: true }
              : { ...newsItem, is_pinned: false }
          )
        );
      }
    } catch (error) {
      console.error('Error updating pin status:', error);
    }
  };

  useEffect(() => {
    fetchNewsItems();
  }, []);

  const visibleNews = isExpanded ? newsItems : newsItems.slice(0, 5);

  return (
    <div className="sm:bg-white sm:rounded-xl sm:border-t sm:border-b sm:border sm:shadow-md px-0">
      <div className="p-2 pt-0 sm:p-6 sm:pb-3">
        <div className="p-3 pt-0 flex items-center justify-between sm:my-2">
          <div className="flex items-center sm:gap-3">
            <div className="hidden sm:flex sm:p-2 bg-condo-dark rounded-lg">
              <Bell className="h-5 w-5 text-condo-light" />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold">Siste nytt</h2>
          </div>
          {isBoard && (
            <Button 
              onClick={() => setShowNewNewsDialog(true)}
              className="flex items-center gap-1 px-2 sm:px-3 py-2 sm:py-2 bg-condo-dark rounded-lg hover:bg-condo-med transition-colors text-condo-light"
              variant="condo"
            >
              <Plus className="w-4 h-4 font-extrabold sm:font-medium" />
              <span className="hidden sm:flex text-sm">Legg til nyhet</span>
            </Button>
          )}
        </div>

        <div className="divide-y divide-gray-100">
          {visibleNews.map((item) => (
            <article key={item.id} className="relative hover:bg-gray-50 transition-colors">
              <div className="p-2 sm:p-4 pl-4 sm:pl-4">
                <div className="sm:flex sm:items-start sm:justify-between sm:gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold mb-1 text-sm sm:text-base pr-8">{item.title}</h3>
                      {isBoard && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePinClick(item);
                          }}
                          className={`
                            absolute right-3 p-1.5 rounded-lg transition-colors
                            ${item.is_pinned 
                              ? 'text-condo-dark bg-dark-1' 
                              : 'text-gray-400 hover:text-condo-dark hover:bg-gray-100'
                            }
                          `}
                        >
                          <Pin 
                            className="h-4 w-4" 
                            fill={item.is_pinned ? "currentColor" : "none"}
                          />
                        </button>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base">{item.content}</p>
                  </div>
                  <div className="flex right sm:bottom-0 sm:mt-auto justify-end mt-2 items-start">
                    <div className="text-xs sm:text-sm text-gray-500">
                      {item.date}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {newsItems.length > 4 && (
          <div className="sm:hidden flex justify-end">
            <Link 
              to="/" 
              className="flex items-center gap-1 text-xs text-condo-dark hover:text-condo-med transition-colors mt-2"
            >
              <span>Les flere poster fra styret</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        )}

        {newsItems.length > 4 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full p-3 pb-0 text-sm text-gray-600 hover:text-gray-900 hidden sm:flex items-center justify-center gap-2 border-t mt-2"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4" />
                <span>Vis mindre</span>
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4" />
                <span>Vis mer</span>
              </>
            )}
          </button>
        )}
      </div>

      {showNewNewsDialog && (
        <NewNewsDialog
          onClose={() => setShowNewNewsDialog(false)}
          onSubmit={async (data) => {
            setShowNewNewsDialog(false);
            await fetchNewsItems();
          }}
        />
      )}
    </div>
  );
}