import React, { useState } from 'react';
import { ItineraryForm } from './components/ItineraryForm';
import { ItineraryDisplay } from './components/ItineraryDisplay';
import { LanguageProvider } from './contexts/LanguageContext';
import { generateItinerary } from './services/openai';
import { type Itinerary } from './types/itinerary';
import { type Vibe } from './components/VibeSelector';
import { Compass } from 'lucide-react';

function AppContent() {
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentDestination, setCurrentDestination] = useState('');
  const [currentDays, setCurrentDays] = useState(0);

  const handleSubmit = async (destination: string, days: number, language: string, vibes: Vibe[]) => {
    try {
      setIsLoading(true);
      setCurrentDestination(destination);
      setCurrentDays(days);
      const newItinerary = await generateItinerary(destination, days, language as any, vibes);
      setItinerary(newItinerary);
    } catch (error) {
      console.error('Failed to generate itinerary:', error);
      alert('Failed to generate itinerary. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col items-center space-y-6 md:space-y-8">
          <div className="text-center space-y-3 md:space-y-4">
            <div className="flex items-center justify-center gap-3">
              <img 
                src="/icon.png" 
                alt="Travel Itinerary Generator" 
                className="h-8 w-8 md:h-10 md:w-10"
              />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Travel Itinerary Generator
              </h1>
            </div>
            <p className="text-sm md:text-base text-gray-600 max-w-xl">
              Give me a destination, and we will whip up a fabulous trip for you!
            </p>
          </div>

          <ItineraryForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            currentDestination={currentDestination}
            currentDays={currentDays}
          />

          <ItineraryDisplay itinerary={itinerary} />
        </div>
      </div>
    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}