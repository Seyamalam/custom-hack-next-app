export async function POST(request: Request) {
  const { text, targetLanguage, sourceLanguage = "auto" } = await request.json();

  if (!text || !targetLanguage) {
    return Response.json(
      { error: "Text and target language are required" },
      { status: 400 }
    );
  }

  try {
    // Simulate translation API call (in a real app, you'd use Google Translate, DeepL, etc.)
    const translatedText = await simulateTranslation(text, targetLanguage, sourceLanguage);
    
    return Response.json({
      success: true,
      originalText: text,
      translatedText,
      sourceLanguage,
      targetLanguage,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Translation error:", error);
    return Response.json(
      { error: "Translation failed" },
      { status: 500 }
    );
  }
}

async function simulateTranslation(text: string, targetLang: string, sourceLang: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  // Simple simulation - in reality you'd call a real translation service
  const translations: Record<string, Record<string, string>> = {
    "hello": {
      "es": "hola",
      "fr": "bonjour",
      "de": "hallo",
      "it": "ciao",
      "pt": "olá",
      "ru": "привет",
      "ja": "こんにちは",
      "ko": "안녕하세요",
      "zh": "你好"
    },
    "goodbye": {
      "es": "adiós",
      "fr": "au revoir",
      "de": "auf wiedersehen",
      "it": "arrivederci",
      "pt": "tchau",
      "ru": "до свидания",
      "ja": "さようなら",
      "ko": "안녕히 가세요",
      "zh": "再见"
    },
    "thank you": {
      "es": "gracias",
      "fr": "merci",
      "de": "danke",
      "it": "grazie",
      "pt": "obrigado",
      "ru": "спасибо",
      "ja": "ありがとう",
      "ko": "감사합니다",
      "zh": "谢谢"
    }
  };

  const lowerText = text.toLowerCase().trim();
  if (translations[lowerText] && translations[lowerText][targetLang]) {
    return translations[lowerText][targetLang];
  }
  
  // Fallback: add language prefix to show "translation"
  const prefixes: Record<string, string> = {
    "es": "[ES] ",
    "fr": "[FR] ",
    "de": "[DE] ",
    "it": "[IT] ",
    "pt": "[PT] ",
    "ru": "[RU] ",
    "ja": "[JA] ",
    "ko": "[KO] ",
    "zh": "[ZH] "
  };
  
  return (prefixes[targetLang] || `[${targetLang.toUpperCase()}] `) + text;
}