import React from 'react';
import { Palette, UtensilsCrossed, Landmark, Compass } from 'lucide-react';

export type Vibe = 'art' | 'food' | 'history' | 'adventure';

interface VibeSelectorProps {
  selectedVibes: Vibe[];
  onVibeToggle: (vibe: Vibe) => void;
}

const vibeConfig = {
  art: { icon: Palette, label: 'Art' },
  food: { icon: UtensilsCrossed, label: 'Food' },
  history: { icon: Landmark, label: 'History' },
  adventure: { icon: Compass, label: 'Adventure' }
};

export function VibeSelector({ selectedVibes, onVibeToggle }: VibeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {(Object.entries(vibeConfig) as [Vibe, typeof vibeConfig.art][]).map(([vibe, config]) => {
        const Icon = config.icon;
        const isSelected = selectedVibes.includes(vibe);
        
        return (
          <button
            key={vibe}
            type="button"
            onClick={() => onVibeToggle(vibe)}
            className={`flex items-center justify-center gap-2 p-3 rounded-lg border ${
              isSelected 
                ? 'bg-blue-50 border-blue-600 text-blue-600' 
                : 'border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600'
            }`}
          >
            <Icon className="h-5 w-5" />
            <span>{config.label}</span>
          </button>
        );
      })}
    </div>
  );
}