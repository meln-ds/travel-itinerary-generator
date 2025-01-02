import OpenAI from 'openai';
import { type Itinerary } from '../types/itinerary';
import { type Language } from '../contexts/LanguageContext';

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

export async function generateItinerary(
  destination: string,
  days: number,
  language: Language
): Promise<Itinerary> {
  const prompt = `Create a detailed ${days}-day travel itinerary for ${destination} ${languagePrompts[language]}. For each activity, include:
  - Estimated duration of time spent at each attraction
  - Travel time and distance between locations (in km and hours/minutes)
  
  Format the response as a JSON object with the following structure:
  {
    "destination": "city name",
    "days": [
      {
        "day": number,
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