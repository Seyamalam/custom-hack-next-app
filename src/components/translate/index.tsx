"use client";

import React, { useState } from "react";
import Section from "../common/section";
import { useCustomer } from "autumn-js/react";

const LANGUAGES = {
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
  ru: "Russian",
  ja: "Japanese",
  ko: "Korean",
  zh: "Chinese"
};

export default function Translate() {
  const { customer, isLoading, allowed, track, refetch, attach } = useCustomer();
  const [text, setText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [isAllowed, setIsAllowed] = useState(true);
  const [error, setError] = useState("");

  const { balance, included_usage } = customer?.features.translations ?? {};

  const handleTranslate = async () => {
    if (!text.trim()) {
      setError("Please enter text to translate");
      return;
    }

    setError("");
    
    // Check Autumn paywall for translations feature
    if (allowed({ featureId: "translations" })) {
      setIsTranslating(true);
      
      try {
        const response = await fetch("/api/translate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text,
            targetLanguage,
            sourceLanguage: "auto"
          }),
        });

        if (!response.ok) {
          throw new Error("Translation failed");
        }

        const result = await response.json();
        setTranslatedText(result.translatedText);
        
        // Track usage with Autumn
        await track({ featureId: "translations" });
        refetch();
        
      } catch (err) {
        setError("Translation failed. Please try again.");
        console.error("Translation error:", err);
      } finally {
        setIsTranslating(false);
      }
    } else {
      // Hit the paywall - show upgrade prompt
      setIsAllowed(false);
    }
  };

  return (
    <Section title={<span data-lingo-skip>🌍 AI Translator</span>}>
      <>
        <div className="flex gap-2">
          <textarea
            placeholder="Enter text to translate..."
            className="border border-gray-300 rounded-md p-2 flex-1 min-h-[100px] resize-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isTranslating}
          />
          <div className="flex flex-col gap-2 min-w-[150px]">
            <select
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
              disabled={isTranslating}
            >
              {Object.entries(LANGUAGES).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
            <button
              onClick={handleTranslate}
              disabled={isTranslating || isLoading || !text.trim()}
              className={`${
                isTranslating || isLoading || !text.trim()
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-primary/80"
              } bg-primary text-white px-4 py-2 rounded-md transition-colors`}
            >
              {isTranslating ? "Translating..." : "Translate"}
            </button>
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        {translatedText && (
          <div className="border border-gray-200 rounded-md p-3 bg-gray-50">
            <div className="text-sm text-gray-600 mb-1">
              Translation to {LANGUAGES[targetLanguage as keyof typeof LANGUAGES]}:
            </div>
            <div className="text-lg">{translatedText}</div>
          </div>
        )}

        <div className="flex justify-between items-center text-sm">
          {balance !== undefined ? (
            <span className="text-gray-600">
              Translations used: {included_usage - balance} / {included_usage}
            </span>
          ) : (
            <span className="text-gray-400">No translations left.</span>
          )}
        </div>

        {!isAllowed && (
          <div className="flex flex-row items-center justify-center gap-2 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="text-red-600 font-medium">
              🚫 Translation limit reached! Upgrade to continue translating.
            </div>
            <button
              type="button"
              disabled={isLoading}
              className={`${
                isLoading ? "cursor-progress opacity-50" : ""
              } bg-primary text-white px-4 py-2 rounded-md cursor-pointer hover:bg-primary/80 transition-colors`}
              onClick={async () => {
                await attach({
                  productId: "pro_monthly",
                  openInNewTab: true,
                });
              }}
            >
              Upgrade Now
            </button>
          </div>
        )}
      </>
    </Section>
  );
}