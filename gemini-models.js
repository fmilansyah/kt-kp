require('dotenv').config();

async function geminiAiModels() {
    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

    try {
        console.log("Menghubungi server Google untuk mencari model...");
        const response = await fetch(url);
        const data = await response.json();

        console.log("\n=== DAFTAR MODEL YANG BISA ANDA GUNAKAN ===");

        // Filter hanya model yang mendukung fitur "generateContent" (chatting)
        data.models.forEach(model => {
            if (model.supportedGenerationMethods.includes("generateContent")) {
                // Menghapus tulisan "models/" di depan agar langsung bisa di-copy
                console.log(`✅ ${model.name.replace('models/', '')}`);
            }
        });
        console.log("===========================================\n");
    } catch (error) {
        console.error("Gagal mengambil data:", error);
    }
}

geminiAiModels();