import React, { useState } from 'react';
import { Info, MapPin, MessageSquare, HelpCircle, ArrowLeft, Calendar, LayoutGrid, MessageCircle, Lightbulb } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MovingPartners } from './MovingPartners';
import { locationTips } from '../../data/locationTips';
import { HouseRulesDialog } from './HouseRulesDialog';

interface MoveInContentProps {
  onBack: () => void;
}

export function MoveInContent({ onBack }: MoveInContentProps) {
  const [showHouseRules, setShowHouseRules] = useState(false);
  
  const handleOpenChat = () => {
    if (window.chatbase && typeof window.chatbase === 'function') {
      window.chatbase('open');
    }
  };

  return (
    <div className="sm:space-y-0 space-y-3 flex flex-col h-full">
      <div className="flex sm:items-center h-full flex-row -mb-4 sm:mb-0">
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex sm:p-2 hover:bg-gray-100 flex items-center gap-2"
        >
          <ArrowLeft className="h-3 w-3 text-gray-600" />
          <span className="text-sm text-gray-600">Tilbake</span>
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 sm:gap-4 gap-2">
        {/* Left column */}
        <div className="sm:space-y-4 space-y-3">
          {/* Tips for new residents */}
          <Card>
            <div className="sm:p-6 p-4">
              <div className="flex items-center gap-3 sm:mb-6 mb-2">
                <div className="hidden sm:inline p-2 bg-condo-dark rounded-lg ">
                  <MapPin className="h-5 w-5 text-condo-light" />
                </div>
                <h2 className="sm:text-xl text-base font-semibold">Tips til nyinnflyttede</h2>
              </div>

              <div className="space-y-4">
                {locationTips.map((tip) => (
                  <div key={tip.label} className="flex items-center justify-between 
                    sm:text-base text-sm">
                    <span className="text-gray-600">{tip.label}:</span>
                    <div>
                      <span className="font-medium">{tip.value}</span>
                      <span className="text-gray-800 ml-2">({tip.min} min)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Resident Registration */}
          <Card>
            <div className="sm:p-6 p-3">
              <div className="flex items-center gap-3 sm:mb-5 mb-2">
                <div className="p-2 bg-condo-dark rounded-lg sm:inline hidden">
                  <MessageCircle className="h-5 w-5 text-condo-light " />
                </div>
                <h2 className="sm:text-xl text-base font-semibold">Beboerregistrering</h2>
              </div>
              <div className="bg-dark-1 sm:text-base text-sm rounded-lg sm:p-4 p-3">
                <p className="text-condo-dark text-shadow-glow">
                  Vi henter informasjon via BankID. Snart vil du også kunne legge til mer detaljer som hvem som bor i leiligheten, om leiligheten leies ut, samt annen nyttig informasjon.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right column - Resources */}
        <Card>
          <div className="sm:p-6 p-3 flex flex-col h-full">
            <div className=" flex items-center gap-3 sm:mb-6 mb-2">
              <div className="hidden sm:inline p-2 bg-condo-dark rounded-lg">
                <LayoutGrid className="h-5 w-5 text-condo-light" />
              </div>
              <h2 className="sm:text-xl text-base font-semibold">Ressurser</h2>
            </div>

            <div className="space-y-6 sm:pb-4 sm:border-b border-none">
              {/* Rules */}
              <div className="flex items-center justify-between ">
                <div className="flex items-center gap-3">
                  <div className="hidden sm:inline p-2 bg-gray-50 rounded-lg">
                    <Info className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="sm:text-base text-sm font-medium">Regler</h3>
                    <p className="text-sm text-gray-600">
                      Les husordensreglene
                    </p>
                  </div>
                </div>
                <Button 
                  variant="subtle" 
                  size="sm"
                  onClick={() => setShowHouseRules(true)}
                >
                  Husordensreglene
                </Button>
              </div>

              {/* Facilities */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="hidden sm:inline p-2 bg-gray-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="sm:text-base text-sm font-medium">Fasiliteter</h3>
                    <p className="text-sm text-gray-600">
                      Se hvilke fasiliteter som kan reserveres
                    </p>
                  </div>
                </div>
                <Button variant="subtle" size="sm" asChild>
                  <a href="/reservasjoner">Reservasjoner</a>
                </Button>
              </div>

              {/* Chatbot */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="hidden sm:inline p-2 bg-gray-50 rounded-lg">
                    <MessageSquare className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium sm:text-base text-sm">Chatbot</h3>
                    <p className="text-sm text-gray-600">
                      Bruk chatboten vår for raske svar
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="primary" onClick={handleOpenChat}>
                  Åpne chat
                </Button>
              </div>

              {/* FAQ */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="hidden sm:inline p-2 bg-gray-50 rounded-lg">
                    <HelpCircle className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium sm:text-base text-sm">Vanlige spørsmål</h3>
                    <p className="text-sm text-gray-600 mr-4">
                      Se svar på vanlige spørsmål og henvendelser fra beboerne
                    </p>
                  </div>
                </div>
                <Button variant="subtle" size="sm" asChild>
                  <a href="/faq">Se FAQ</a>
                </Button>
              </div>
            </div>
            <div className="hidden sm:flex flex-col h-auto mt-4 space-y-2 bg-dark-1 rounded-lg p-4 pt-3 bottom-0 flex-col">
              <div className="flex flex-row items-center gap-3">
                <div className="p-1 bg-condo-dark rounded-lg">
                    <Lightbulb className="h-5 w-5 text-condo-light" />
                </div>
                <h3 className="font-semibold">Samarbeidspartnere</h3>
                </div>
              <p className="text-condo-dark text-shadow-glow sm:text-base text-sm">
                Her vil du snart få tilgang til eksklusive rabatter og fordeler hos våre samarbeidspartnere.
              </p>
              
            </div>
          </div>

        </Card>

        {/* Full width Moving Partners */}
        <div className="sm:hidden">
          <Card>
            <MovingPartners type="moveIn" />
          </Card>
        </div>
      </div>

      {/* House Rules Dialog */}
      {showHouseRules && (
        <HouseRulesDialog onClose={() => setShowHouseRules(false)} />
      )}
    </div>
  );
}