import React, { useState } from 'react';
import { Check, CheckCircle, X, Pencil, Trash2, ClipboardCheck, AlertTriangle, Plus, Lightbulb as LightBulb } from 'lucide-react';
import { Button } from '../ui/Button';
import { useUserRole } from '../../hooks/useUserRole';
import { Card } from '../ui/Card';

// Types
interface ChecklistItem {
  id: string;
  label: string;
  tip: string;
  checked: boolean;
}

interface MoveOutChecklistProps {
  showTips: boolean;
  onShowTips: () => void;
  onCloseTips: () => void;
  showAddItem: boolean;
  onShowAddItem: () => void;
  onCloseAddItem: () => void;
}

// Dialog Components
function TipsDialog({ items, onClose, isBoard, onShowAddItem }: { 
  items: ChecklistItem[];
  onClose: () => void;
  isBoard: boolean;
  onShowAddItem: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
        <div className="flex items-center justify-between sm:p-4 p-3 pb-2 border-b">
          <h2 className="sm:text-lg text-sm font-semibold">Tips for utflytting</h2>
          <div className="flex items-center gap-2">
            {isBoard && (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  onShowAddItem();
                  onClose();
                }}
                className="sm:p-2 px-2 py-1 flex items-center justify-center gap-2 hover:bg-dark-2 rounded-lg transition-colors 
                sm:text-sm text-xs ml-2"
                variant="condo"
              >
                <span>Legg til</span>
                <Plus className="h-4 w-4" />
              </Button>
            )}
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="sm:p-6 p-4 space-y-5">
          {items.map((item) => (
            <div key={item.id} className="sm:space-y-2">
              <h3 className="font-medium text-gray-900 sm:text-base text-sm">
                {item.label}
              </h3>
              <p className="text-gray-600 text-sm">{item.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ConfirmationDialog({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Takk for bekreftelsen</h3>
              <p className="text-gray-600">
                Vi har mottatt din bekreftelse på utflytting. Ta kontakt med styret hvis du har spørsmål.
              </p>
            </div>
            <Button onClick={onClose} className="mt-2">
              Lukk
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditItemDialog({ 
  item, 
  onSave, 
  onClose 
}: { 
  item?: ChecklistItem;
  onSave: (item: Omit<ChecklistItem, 'checked'>) => void;
  onClose: () => void;
}) {
  const [label, setLabel] = useState(item?.label || '');
  const [tip, setTip] = useState(item?.tip || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (label.trim() && tip.trim()) {
      onSave({
        id: item?.id || crypto.randomUUID(),
        label: label.trim(),
        tip: tip.trim()
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="hidden sm:flex items-center justify-between p-4 border-b sm">
          <h2 className="text-lg font-semibold">
            {item ? 'Rediger oppgave' : 'Legg til oppgave'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="sm:p-6 p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Oppgave
            </label>
            <textarea
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:outline-none focus:ring-condo-dark min-h-[70px] sm:text-base text-sm"
              placeholder="Skriv inn en oppgave som må gjøres før utflytting, f.eks. 'Vask kjøleskap'..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Tips
            </label>
            <textarea
              value={tip}
              onChange={(e) => setTip(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-1 focus:outline-none focus:ring-condo-dark min-h-[70px] sm:text-base text-sm"
              placeholder="Legg til et nyttig tips for hvordan oppgaven utføres..."
              required
            />
          </div>
          <div className="flex justify-between gap-3 sm:pt-2">
            <Button variant="outline" onClick={onClose}>
              Avbryt
            </Button>
            <Button type="submit" className="border hover:border-condo-dark hover:text-condo-dark">
              {item ? 'Lagre' : 'Legg til'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteConfirmationDialog({ 
  itemLabel, 
  onConfirm, 
  onCancel 
}: {
  itemLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 bg-condo-yellow rounded-full flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-orange-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Bekreft sletting</h3>
              <p className="text-gray-600">
                Er du sikker på at du vil slette oppgaven "{itemLabel}"? Dette kan ikke angres.
              </p>
            </div>
            <div className="flex gap-3 w-full">
              <Button variant="subtle" onClick={onCancel} className="flex-1">
                Avbryt
              </Button>
              <Button 
                onClick={onConfirm}
                variant="orange"
                className="flex-1"
              >
                Slett
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Default checklist items
const defaultItems: ChecklistItem[] = [
  { 
    id: '1', 
    label: 'Rydde og rengjøre leilighet og bod', 
    tip: 'Tøm og vask grundig alle rom og boder.',
    checked: false 
  },
  { 
    id: '2', 
    label: 'Bestille flyttevask', 
    tip: 'Kontakt renholdsbyrå for profesjonell vask.',
    checked: false 
  },
  { 
    id: '3', 
    label: 'Levere alle nøkler til styret', 
    tip: 'Legg frem alle nøkler som hører til seksjonen. Disse skal overføres til neste eier ved overtakelse.',
    checked: false 
  },
  { 
    id: '4', 
    label: 'Melde adresseendring', 
    tip: 'Oppdater adresse hos Posten og Folkeregisteret.',
    checked: false 
  },
  { 
    id: '5', 
    label: 'Lese av strøm', 
    tip: 'Les av de fem første sifrene på måleren og rapporter til strømleverandøren',
    checked: false 
  },
  { 
    id: '6', 
    label: 'Overlevere parkeringsbrikke/portåpner', 
    tip: 'Returner til neste eier eller overlever til styret.',
    checked: false 
  }
];

export function MoveOutChecklist({ 
  showTips, 
  onShowTips,
  onCloseTips,
  showAddItem,
  onShowAddItem,
  onCloseAddItem
  
}: MoveOutChecklistProps) {
  const [items, setItems] = useState<ChecklistItem[]>(defaultItems);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [editingItem, setEditingItem] = useState<ChecklistItem | undefined>();
  const [deletingItem, setDeletingItem] = useState<ChecklistItem | undefined>();
  const { role } = useUserRole();

  const isBoard = role === 'board';
  const isOwner = role === 'owner';
  const allChecked = items.every(item => item.checked);

  const handleToggle = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleSubmit = () => {
    console.log('Checklist submitted:', items);
    setShowConfirmation(true);
  };

  const handleSaveItem = (itemData: Omit<ChecklistItem, 'checked'>) => {
    if (editingItem) {
      setItems(items.map(item => 
        item.id === itemData.id ? { ...itemData, checked: item.checked } : item
      ));
    } else {
      setItems([...items, { ...itemData, checked: false }]);
    }
    setEditingItem(undefined);
    onCloseAddItem();
  };

  const handleDeleteItem = (item: ChecklistItem) => {
    setDeletingItem(item);
  };

  const confirmDelete = () => {
    if (deletingItem) {
      setItems(items.filter(item => item.id !== deletingItem.id));
      setDeletingItem(undefined);
    }
  };

  return (
    <Card>
      <div className="sm:p-6 p-3">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:mb-6 mb-2">
          <div className="flex items-center gap-3 mb-2 sm:mb-0">
            <div className="hidden sm:inline p-2 bg-condo-dark rounded-lg">
              <ClipboardCheck className="h-5 w-5 text-condo-light" />
            </div>
            <h2 className="sm:text-xl text-base font-semibold">Sjekkliste for utflytting</h2>
          </div>
          <div className="flex items-center">
              <Button
                variant="subtle"
                onClick={onShowTips}
                className="flex flex-row items-center gap-2 sm:text-base text-sm sm:whitespace-nowrap w-full border-condo-med my-1 bg-light-1"
              >
                <LightBulb className="h-4 w-4 text-base-light3" />
                Nyttige tips
              </Button>
          </div>
        </div>

        {/* Checklist */}
        <div className="sm:space-y-6 space-y-3 mt-2">
          <div className="sm:space-y-3 space-y-2">
            {items.map(item => (
              <div key={item.id} className="flex items-center gap-1">
                <button
                  onClick={() => handleToggle(item.id)}
                  className={`
                    flex-1 flex items-center sm:gap-3 gap-2 p-3 rounded-lg border transition-all 
                    text-left sm:text-base text-sm
                    ${item.checked 
                      ? 'border-dark-2 bg-dark-1' 
                      : 'border-gray-200 hover:border-dark-1 hover:bg-gray-50'
                    }
                  `}
                >
                  <div className={`
                    sm:w-5 sm:h-5 w-4 h-4 rounded border flex items-center justify-center flex-shrink-0
                    ${item.checked 
                      ? 'bg-condo-dark border-dark-2' 
                      : 'border-gray-300'
                    }
                  `}>
                    {item.checked && <Check className="h-3 w-3 text-white" />}
                  </div>
                  <span className={item.checked ? 'line-through text-condo-dark' : ''}>
                    {item.label}
                  </span>
                </button>
                {isBoard && (
                  <div className="flex gap-1">
                    <button
                      onClick={() => setEditingItem(item)}
                      className="p-2 text-gray-400 hover:text-condo-dark hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item)}
                      className="sm:p-2 p-1 text-gray-400 hover:text-orange-8 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Submit button */}
          <div className="flex flex-col items-center gap-2">
            {isOwner && (
              <Button
                onClick={handleSubmit}
                disabled={!allChecked}
                className="w-full"
              >
                <ClipboardCheck className="h-5 w-5 text-condo-light mr-4 sm:hidden"/>
                Send inn bekreftelse
              </Button>
            )}
            {isBoard && (
              <Button
                variant="secondary"
                onClick={onShowAddItem}
                className="w-full gap-2 sm:text-base text-sm"
              >
                <Plus className="h-4 w-4" />
                Legg til
              </Button>
            )}
          </div>
          
          {!allChecked && isOwner && (
            <p className="text-sm text-gray-500 text-center">
              Fullfør alle punktene på sjekklisten for å sende inn bekreftelse
            </p>
          )}
        </div>
      </div>

      {/* Dialogs */}
      {showConfirmation && (
        <ConfirmationDialog onClose={() => setShowConfirmation(false)} />
      )}

      {showTips && (
        <TipsDialog 
          items={items} 
          onClose={onCloseTips}
          isBoard={isBoard}
          onShowAddItem={onShowAddItem}
        />
      )}

      {(showAddItem || editingItem) && (
        <EditItemDialog
          item={editingItem}
          onSave={handleSaveItem}
          onClose={() => {
            setEditingItem(undefined);
            onCloseAddItem();
          }}
        />
      )}

      {deletingItem && (
        <DeleteConfirmationDialog
          itemLabel={deletingItem.label}
          onConfirm={confirmDelete}
          onCancel={() => setDeletingItem(undefined)}
        />
      )}
    </Card>
  );
}