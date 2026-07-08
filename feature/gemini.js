require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const maxChar = require('../utils/normalize');

// Inisialisasi Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const aiModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// Fungsi utama untuk bertanya ke Gemini
async function askGemini(question) {
    try {
        const result = await aiModel.generateContent(question);
        const response = await result.response;
        return maxChar(response.text());
    } catch (error) {
        throw error;
    }
}

// Ekspor fungsi agar bisa dipakai di file lain
module.exports = askGemini;