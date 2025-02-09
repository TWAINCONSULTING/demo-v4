import React from 'react';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { Avatar } from '../ui/Avatar';

interface ChatMessageProps {
  content: string;
  author: string;
  role?: string;
  timestamp: string;
  isUser: boolean;
}

export function ChatMessage({ content, author, role, timestamp, isUser }: ChatMessageProps) {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <div className="flex-shrink-0 self-center mr-3">
          <Avatar name={author} />
        </div>
      )}
      <div className="flex flex-col max-w-[80%]">
        <div className={`sm:rounded-2xl rounded-xl shadow-sm ${
          isUser 
            ? 'bg-dark-2' 
            : 'bg-base-white border border-gray-100'
        }`}>
          <div className={`sm:px-4 px-2 sm:py-2 py-1 border-b ${
            isUser 
              ? 'border-dark-3' 
              : 'border-dark-1'
          }`}>
            <div className="flex items-center gap-2  justify-between">
              <span className={`font-medium text-sm ${
                isUser ? 'text-gray-700' : 'text-gray-700'
              }`}>
                {author}
              </span>
              {role && (
                <span className={`
                  px-2 py-0.5 text-xs font-medium rounded-full 
                  ${role === 'Styret'
                    ? isUser
                      ? 'text-black'
                      : 'text-condo-dark bg-light-2'
                    : isUser
                      ? 'text-black'
                      : 'text-gray-600'
                  }
                `}>
                  {role}
                </span>
              )}
            </div>
          </div>
          <div className="sm:px-4 px-2 py-2">
            <p className={isUser ? 'text-gray-800' : 'text-gray-700'}>
              {content}
            </p>
          </div>
        </div>
        <div className={`text-xs text-gray-400 mt-1 mb-2 ${isUser ? 'text-right' : 'text-left'}`}>
          {format(new Date(timestamp), "HH:mm", { locale: nb })}
        </div>
      </div>
      {isUser && (
        <div className="flex-shrink-0 self-center ml-3">
          <Avatar name={author} />
        </div>
      )}
    </div>
  );
}