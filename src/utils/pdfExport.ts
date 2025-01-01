import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { type Itinerary } from '../types/itinerary';

export async function exportToPDF(itinerary: Itinerary) {
  const element = document.getElementById('itinerary-content');
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`${itinerary.destination}-itinerary.pdf`);
  } catch (error) {
    console.error('Failed to generate PDF:', error);
  }
}