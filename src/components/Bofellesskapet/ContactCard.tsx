import React, { useState } from 'react';
import { MessageSquare, MessageCircle, Phone } from 'lucide-react';
import { Card } from '../ui/Card';
import { useNavigate } from 'react-router-dom';

export function ContactCard() {
  const navigate = useNavigate();
  const handlePhoneClick = () => {
    window.location.href = 'tel:98765432';
  };

  const handleContactClick = (recipient: string) => {
    navigate(`/kontakt?recipient=${recipient}`);
  };

  return (
    <Card>
      <div className="sm:p-6 p-5">
        <h2 className="sm:text-xl text-sm font-semibold sm:mb-6 mb-3">Kontaktinformasjon</h2>

        <div className="sm:space-y-6 space-y-2">
          <div className="sm:space-y-2 space-y-1">
            <h3 className="font-medium sm:text-base text-sm">Chatbot</h3>
            <p className="text-sm text-gray-600 sm:text-sm text-xs sm:flex hidden">Dagligdagse henvendelser</p>
            <button
              className="flex items-center gap-2 text-sm text-condo-med hover:text-condo-dark sm:text-sm text-xs sm:mb-2"
            >
              <MessageSquare className="h-4 w-4 sm:flex hidden" />
              Start chat
            </button>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium sm:text-base text-sm">Styret</h3>
            <p className="text-sm text-gray-600 sm:text-sm text-xs sm:block hidden">Administrative henvendelser og søknader</p>
            <button
              onClick={() => handleContactClick('board')}
              className="text-sm text-condo-med hover:text-condo-dark sm:text-sm text-xs flex gap-2"
            >
              <MessageCircle className="h-4 w-4 sm:flex hidden" />
              Send melding
            </button>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium sm:text-base text-sm">Vaktmester</h3>
            <p className="text-sm text-gray-600 sm:text-sm text-xs sm:block hidden">Tekniske problemer og vedlikehold</p>
            <button
              onClick={() => handleContactClick('maintenance')}
              className="flex gap-2 text-sm text-condo-med hover:text-condo-dark sm:text-sm text-xs"
            >
              <MessageCircle className="h-4 w-4 sm:flex hidden" />
              Send melding
            </button>
          </div>

          <div className="sm:pt-4 sm:border-t">
            <div className="space-y-2">
              <h3 className="font-medium text-red-600 sm:text-base text-sm">Akutte hendelser</h3>
              <p className="text-sm text-red-600 sm:text-sm text-xs sm:inline hidden">Ring ved akutte problemer utenfor arbeidstid</p>
              <button
                onClick={handlePhoneClick}
                className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 sm:text-sm text-xs"
              >
                <Phone className="h-4 w-4 sm:inline hidden" />
                Ring vaktelefon
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}