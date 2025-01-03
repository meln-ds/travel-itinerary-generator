import OpenAI from 'openai';
import { type Itinerary } from '../types/itinerary';
import { type Language } from '../contexts/LanguageContext';
import { type Vibe } from '../components/VibeSelector';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const languagePrompts: Record<Language, string> = {
  en: 'in English',
  es: 'in Spanish (Español)',
  fr: 'in French (Français)',
  vi: 'in Vietnamese (Tiếng Việt)'
};

const vibeDescriptions: Record<Vibe, string> = {
  art: 'art galleries, museums, cultural venues, street art, and creative spaces',
  food: 'local cuisine, food markets, cooking classes, restaurants, and culinary experiences',
  history: 'historical sites, monuments, ancient architecture, and cultural heritage',
  adventure: 'outdoor activities, thrilling experiences, nature exploration, and active pursuits'
};

export async function generateItinerary(
  destination: string,
  days: number,
  language: Language,
  vibes: Vibe[]
): Promise<Itinerary> {
  const vibePreference = vibes.length > 0
  ? `Focus on ${vibes.map(v => vibeDescriptions[v]).join(', and ')}.`
  : '';
  
  const prompt = `Create a detailed ${days}-day travel itinerary for ${destination} and ${vibePreference} in ${languagePrompts[language]}. For each activity, include:
  
  First, write an engaging paragraph (max 100 words) describing what ${destination} is known for, including its main attractions, culture, and unique experiences.
  
  Then, create a day-by-day itinerary. For each day, include:
  - A brief title summarizing the day's focus
  - Estimated duration of time spent at each attraction
  - Travel time and distance between locations (in km and hours/minutes)
  
  Format the response as a JSON object with the following structure:
  {
    "destination": "city name",
    "description": "engaging paragraph about the destination",
    "days": [
      {
        "day": number,
        "title": "Historical Center Exploration",
        "activities": [
          "Activity 1 (2 hours). From previous location: 3 km, 15 min by taxi",
          "Activity 2 (1.5 hours). From previous location: 1.2 km, 8 min walking"
        ],
        "meals": ["Breakfast", "Lunch", "Dinner"],
        "notes": "optional additional information"
      }
    ]
  }
  
  Make sure activities are logically ordered to minimize travel time and include specific travel details between each location.`;

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-4o-mini",
    temperature: 0.7,
    response_format: { type: "json_object" },
  });

  const response = completion.choices[0].message.content;
  if (!response) throw new Error('Failed to generate itinerary');
  
  return JSON.parse(response) as Itinerary;
}