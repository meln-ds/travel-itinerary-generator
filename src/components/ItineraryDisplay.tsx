import React from 'react';
import { type Itinerary, type DayPlan } from '../types/itinerary';
import { MapPin, Coffee, Utensils, StickyNote } from 'lucide-react';
import { ExportButton } from './ExportButton';

interface ItineraryDisplayProps {
  itinerary: Itinerary | null;
}

function DayCard({ plan }: { plan: DayPlan }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6 space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">Day {plan.day}</h3>
      
      <div className="space-y-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-blue-600">
            <Coffee className="h-5 w-5" />
            <h4 className="font-medium">Activities</h4>
          </div>
          <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2 text-sm md:text-base">
            {plan.activities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-green-600">
            <Utensils className="h-5 w-5" />
            <h4 className="font-medium">Meals</h4>
          </div>
          <ul className="list-disc list-inside space-y-1 text-gray-600 ml-2 text-sm md:text-base">
            {plan.meals.map((meal, index) => (
              <li key={index}>{meal}</li>
            ))}
          </ul>
        </div>

        {plan.notes && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-yellow-600">
              <StickyNote className="h-5 w-5" />
              <h4 className="font-medium">Notes</h4>
            </div>
            <p className="text-gray-600 ml-2 text-sm md:text-base">{plan.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function ItineraryDisplay({ itinerary }: ItineraryDisplayProps) {
  if (!itinerary) return null;

  return (
    <div id="itinerary-content" className="w-full max-w-4xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            {itinerary.destination} - {itinerary.days.length} Day Itinerary
          </h2>
        </div>
        <ExportButton itinerary={itinerary} />
      </div>

      <div className="space-y-4 md:space-y-6">
        {itinerary.days.map((day) => (
          <DayCard key={day.day} plan={day} />
        ))}
      </div>
    </div>
  );
}