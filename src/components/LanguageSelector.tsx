import React from 'react';
import { useLanguage, type Language } from '../contexts/LanguageContext';

const languages: Record<Language, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  vi: 'Tiếng Việt'
};

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as Language)}
      className="pl-10 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none cursor-pointer"
    >
      {Object.entries(languages).map(([code, name]) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  );
}