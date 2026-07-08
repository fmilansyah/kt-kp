require('dotenv').config();

const url = `https://translation.googleapis.com/language/translate/v2?key=${process.env.TRANSLATOR_API_KEY}`;

async function translateText(textToTranslate) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        q: textToTranslate,
        target: 'id',
        format: 'text'
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();
    return data.data.translations[0].translatedText;
  } catch (error) {
    throw error;
  }
}

module.exports = translateText;