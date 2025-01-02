import React from 'react';
import { MapPin } from 'lucide-react';

interface DestinationFieldsProps {
  city: string;
  setCity: (city: string) => void;
  country: string;
  setCountry: (country: string) => void;
}

export function DestinationFields({ city, setCity, country, setCountry }: DestinationFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">
          City
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="pl-10 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter city name"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="country" className="block text-sm font-medium text-gray-700">
          Country
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="pl-10 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter country name"
            required
          />
        </div>
      </div>
    </div>
  );
}