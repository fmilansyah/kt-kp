function maxChar(text) {
    let sanitizedText = text;
    if (sanitizedText.length > 2000) { // Jika jawaban melebihi batas karakter Discord, potong dan tambahkan ellipsis
        sanitizedText = sanitizedText.slice(0, 1972) + '...\nKalo rame lanjut part 2';
    }
    return sanitizedText;
}

module.exports = maxChar;