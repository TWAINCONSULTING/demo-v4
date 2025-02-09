import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageWrapper } from '../components/ui/PageWrapper';
import { ContactForm } from '../components/Contact/ContactForm';
import { ContactInfo } from '../components/Contact/ContactInfo';
import { ChatHistory } from '../components/Contact/ChatHistory';
import { sectionIntros } from '../data/sectionIntros';

export default function Kontakt() {
  const [searchParams] = useSearchParams();
  const recipient = searchParams.get('recipient');
  const [isFormExpanded, setIsFormExpanded] = useState(false);

  useEffect(() => {
    if (recipient) {
      setIsFormExpanded(true);
    }
  }, [recipient]);

  return (
    <PageWrapper intro={sectionIntros.kontakt}>
      <div className="sm:space-y-0 space-y-3">
        <div className="grid lg:grid-cols-2 sm:gap-6 gap-2">
          {/* Left column */}
          <div className="sm:space-y-8 space-y-3">
            <ContactForm 
              onExpand={setIsFormExpanded}
              expanded={isFormExpanded}
            />
            <div className="sm:hidden">
              <ChatHistory />
            </div>
            <div className="hidden sm:block">
              {!isFormExpanded && <ChatHistory />}
            </div>
          </div>

          {/* Right column */}
          <ContactInfo />
          
        </div>

        {/* Full-width chat history when the form is expanded */}
        <div className="hidden sm:block">
              {isFormExpanded && <ChatHistory />}
        </div>
      </div>
    </PageWrapper>
  );
}