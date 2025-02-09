import React, { useState } from 'react';
import { Users, ArrowLeft } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MovingPartners } from './MovingPartners';
import { MoveOutChecklist } from './MoveOutChecklist';

interface MoveOutContentProps {
  onBack: () => void;
}

export function MoveOutContent({ onBack }: MoveOutContentProps) {
  const [showTips, setShowTips] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center sm:items-end gap-0 sm:-mb-2 -mb-4">
        <Button
          variant="ghost"
          onClick={onBack}
          className="p-2 sm:pb-0 hover:bg-gray-100 flex items-center gap-2"
        >
          <ArrowLeft className="h-3 w-3 text-gray-600" />
          <span className="text-sm text-gray-600">Tilbake</span>
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 sm:gap-4 gap-2">
        {/* Left column - Checklist */}
        <MoveOutChecklist 
          showTips={showTips}
          onShowTips={() => setShowTips(true)}
          onCloseTips={() => setShowTips(false)}
          showAddItem={showAddItem}
          onShowAddItem={() => setShowAddItem(true)}
          onCloseAddItem={() => setShowAddItem(false)}
        />

        {/* Right column - FAQ and Partners */}
        <div className="sm:space-y-4 space-y-3">
          {/* Contact section */}
          <Card>
            <div className="sm:p-6 p-4">
              <div className="flex items-center gap-3 sm:mb-6 mb-2">
                <div className="hidden sm:inline p-2 bg-gray-50 rounded-lg ">
                  <Users className="h-5 w-5 text-gray-600" />
                </div>
                <h2 className="sm:text-xl text-base font-semibold">Kontakt styret</h2>
              </div>

              <div className="sm:space-y-6 space-y-3">
                {/* Board Contact */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center sm:gap-3">
                    <div className="hidden sm:inline sp-2 bg-gray-50 rounded-lg ">
                      <Users className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        Normal svartid innen 24 timer
                      </p>
                    </div>
                  </div>
                  <Button variant="subtle" size="sm" asChild>
                    <a href="/kontakt?recipient=board">Send melding</a>
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Partners */}
          <MovingPartners type="moveOut" />
        </div>
      </div>
    </div>
  );
}