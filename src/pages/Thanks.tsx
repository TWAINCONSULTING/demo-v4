import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export default function Thanks() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Takk for din interesse!</h1>
        <p className="text-gray-600 mb-8">
          Vi tar kontakt med deg så snart som mulig.
        </p>
        <Button 
          onClick={() => navigate('/')}
          className="w-full py-3"
        >
          Tilbake til forsiden
        </Button>
      </div>
    </div>
  );
}