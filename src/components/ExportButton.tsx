import React from 'react';
import { Download } from 'lucide-react';
import { type Itinerary } from '../types/itinerary';
import { exportToPDF } from '../utils/pdfExport';

interface ExportButtonProps {
  itinerary: Itinerary;
  className?: string;
}

export function ExportButton({ itinerary, className = '' }: ExportButtonProps) {
  const handleExport = async () => {
    await exportToPDF(itinerary);
  };

  return (
    <button
      onClick={handleExport}
      className={`inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${className}`}
    >
      <Download className="h-5 w-5" />
      Export PDF
    </button>
  );
}