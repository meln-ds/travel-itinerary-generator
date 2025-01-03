export interface DayPlan {
  day: number;
  title: string;
  activities: string[];
  meals: string[];
  notes?: string;
}

export interface Itinerary {
  destination: string;
  description: string;
  days: DayPlan[];
}