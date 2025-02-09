import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { RecipientSelect } from './RecipientSelect';
import { ResidentSelect } from './ResidentSelect';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { MessageSentDialog } from './MessageSentDialog';

interface ContactFormProps {
  onExpand?: (expanded: boolean) => void;
  expanded?: boolean;
}

  export function ContactForm({ onExpand, expanded = false }: ContactFormProps) {
    const [recipient, setRecipient] = useState<string | null>(null);
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [selectedResidents, setSelectedResidents] = useState<string[]>([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    
   const TRANSITION_DURATION = 300; // duration for form transition
  
  const handleRecipientChange = (value: string | null) => {
    if (value === recipient) {
      // Collapse and reset
      setIsFormVisible(false);
      setTimeout(() => {
        setRecipient(null);
        setSubject('');
        setMessage('');
        setSelectedResidents([]);
        onExpand?.(false);
      }, TRANSITION_DURATION);
    } else {
      // Expand for new recipient
      setRecipient(value);
      setTimeout(() => setIsFormVisible(true), 50);
      onExpand?.(!!value);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Message sent:', {
      recipient,
      subject,
      message,
      selectedResidents
    });
  
    setShowConfirmation(true);
  };
  
  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setIsFormVisible(false);
    setTimeout(() => {
      setRecipient(null);
      setSubject('');
      setMessage('');
      setSelectedResidents([]);
      onExpand?.(false);
    }, TRANSITION_DURATION);
  };

  // Set initial expansion state based on expanded prop
  useEffect(() => {
    if (expanded && !recipient) {
      setRecipient('board');
      setTimeout(() => setIsFormVisible(true), 50);
    }
  }, [expanded]);

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100" data-contact-form>
        <div className="sm:p-6 p-3">
          <div className="flex items-center gap-3 sm:mb-6 mb-2">
            <h2 className="sm:text-xl text-base font-semibold">Velg mottaker</h2>
          </div>

          <div className="sm:space-y-6 space-y-3">
            <RecipientSelect value={recipient} onChange={handleRecipientChange} />

            <div className={`space-y-6 transition-all duration-300 ease-in-out overflow-hidden ${
              isFormVisible ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
            }`}>
              {recipient && (
                <>
                  {recipient === 'resident' && (
                    <ResidentSelect
                      selectedResidents={selectedResidents}
                      onChange={setSelectedResidents}
                    />
                  )}

                  <Input
                    label="Emne"
                    value={subject}
                    type="text"
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Skriv emnet for henvendelsen"
                    required
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Melding
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Skriv din melding her..."
                      className="w-full h-20 px-4 py-3"
                      required
                    />
                  </div>

                  <div className="flex justify-end sm:text-base text-sm font-light">
                    <Button
                      type="submit"
                      disabled={recipient === 'resident' && selectedResidents.length === 0}
                    >
                      Send melding
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </form>

      {showConfirmation && (
        <MessageSentDialog onClose={handleCloseConfirmation} />
      )}
    </>
  );
}