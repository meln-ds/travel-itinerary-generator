import React, { useState } from 'react';
import { Calendar, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { DestinationFields } from './DestinationFields';
import { VibeSelector, type Vibe } from './VibeSelector';

interface ItineraryFormProps {
  onSubmit: (destination: string, days: number, language: string, vibes: Vibe[]) => void;
  isLoading: boolean;
  currentDestination: string;
  currentDays: number;
}

export function ItineraryForm({ onSubmit, isLoading, currentDestination, currentDays }: ItineraryFormProps) {
  const { language } = useLanguage();
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [days, setDays] = useState<string>('1');
  const [selectedVibes, setSelectedVibes] = useState<Vibe[]>([]);
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const daysNum = parseInt(days);
    if (daysNum > 31) {
      setError('Trip length cannot exceed 31 days');
      return;
    }
    if (daysNum < 1) {
      setError('Trip length cannot be less than 1 day');
      return;
    }
    const destination = `${city}, ${country}`;
    onSubmit(destination, daysNum, language, selectedVibes);
  };

  const handleVibeToggle = (vibe: Vibe) => {
    setSelectedVibes(prev => 
      prev.includes(vibe)
        ? prev.filter(v => v !== vibe)
        : [...prev, vibe]
    );
  };

  const handleRegenerate = () => {
    if (currentDestination && currentDays) {
      onSubmit(currentDestination, currentDays, language, selectedVibes);
    }
  };

  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDays(value);
    setError('');

    if (value && parseInt(value) > 31) {
      setError('Trip length cannot exceed 31 days');
    }
    if (value && parseInt(value) < 1) {
      setError('Trip length cannot be less than 1 day');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <DestinationFields
        city={city}
        setCity={setCity}
        country={country}
        setCountry={setCountry}
      />

      <div className="space-y-2">
        <label htmlFor="days" className="block text-sm font-medium text-gray-700">
          Trip Length (days)
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="number"
            id="days"
            min="1"
            max="31"
            value={days}
            onChange={handleDaysChange}
            className={`pl-10 w-full rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'} p-3 focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
            required
          />
        </div>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Your Vibe
        </label>
        <VibeSelector
          selectedVibes={selectedVibes}
          onVibeToggle={handleVibeToggle}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="language" className="block text-sm font-medium text-gray-700">
          Output Language
        </label>
        <div className="relative">
          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <LanguageSelector />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isLoading || !!error}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Generating...' : 'Generate Itinerary'}
        </button>
        {currentDestination && currentDays > 0 && (
          <button
            type="button"
            onClick={handleRegenerate}
            disabled={isLoading}
            className="w-full rounded-lg bg-gray-600 px-4 py-3 text-white font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Regenerate
          </button>
        )}
      </div>
    </form>
  );
}