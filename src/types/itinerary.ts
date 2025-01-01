export interface DayPlan {
  day: number;
  activities: string[];
  meals: string[];
  notes?: string;
}

export interface Itinerary {
  destination: string;
  days: DayPlan[];
}