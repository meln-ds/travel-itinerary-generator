import React, { useState } from 'react';
import { Plane, Calendar } from 'lucide-react';
import { destinations } from '../data/destinations';

interface ItineraryFormProps {
  onSubmit: (destination: string, days: number) => void;
  isLoading: boolean;
  onRegenerate: () => void;
}

export function ItineraryForm({ onSubmit, isLoading, onRegenerate }: ItineraryFormProps) {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState<string>('1');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const daysNum = parseInt(days);
    if (daysNum > 31) {
      setError('Trip length cannot exceed 31 days');
      return;
    }
    onSubmit(destination, daysNum);
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
      <div className="space-y-2">
        <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
          Destination
        </label>
        <div className="relative">
          <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <select
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="pl-10 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            required
          >
            <option value="">Select a destination</option>
            {destinations.map((region) => (
              <optgroup key={region.region} label={region.region}>
                {region.cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
      </div>

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

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isLoading || !!error}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Generating...' : 'Generate Itinerary'}
        </button>
        <button
          type="button"
          onClick={onRegenerate}
          disabled={isLoading}
          className="w-full rounded-lg bg-gray-600 px-4 py-3 text-white font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Regenerate
        </button>
      </div>
    </form>
  );
}