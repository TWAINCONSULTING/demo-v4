import React, { useState } from 'react';
import { History, ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '../ui/Card';
import { ChatDialog } from './ChatDialog';
import { chatThreads } from '../../data/chatThreads';

export function ChatHistory() {
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const maxVisible = 2;

  const sortedThreads = [...chatThreads].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const visibleThreads = isExpanded 
    ? sortedThreads 
    : sortedThreads.slice(0, maxVisible);

  return (
    <Card>
      <div className="sm:p-6 p-3">
        <div className="flex items-center gap-3 sm:mb-6 mb-2">
          <div className="hidden sm:inline sm:p-2 p-1 bg-condo-dark rounded-lg">
            <History className="sm:h-5 sm:w-5 h-4 w-4 text-condo-light" />
          </div>
          <h2 className="sm:text-xl text-base font-semibold">Meldingshistorikk</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {visibleThreads.map((thread) => (
            <button
              key={thread.id}
              onClick={() => setSelectedThread(thread.id)}
              className="w-full sm:p-4 p-2 hover:bg-gray-50 transition-colors text-left"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="font-medium mb-1 sm:text-base text-sm">{thread.subject}</div>
                  <div className="sm:text-sm text-xs text-gray-500">{thread.date}</div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  thread.status === 'Besvart' 
                    ? 'bg-green-50 text-green-600' 
                    : 'bg-yellow-50 text-yellow-600'
                }`}>
                  {thread.status}
                </span>
              </div>
            </button>
          ))}
        </div>

        {sortedThreads.length > maxVisible && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full mt-4 flex items-center justify-center gap-1 text-sm text-gray-600 hover:text-gray-900"
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

      {selectedThread && (
        <ChatDialog
          thread={sortedThreads.find(t => t.id === selectedThread)!}
          onClose={() => setSelectedThread(null)}
        />
      )}
    </Card>
  );
}