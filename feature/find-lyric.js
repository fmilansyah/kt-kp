const maxChar = require("../utils/normalize");

async function findLyric(botMusicMsg) {
    const match = botMusicMsg.match(/\*\*(.*?)\*\* \*\*by\*\* \*\*(.*?)\*\*/);

    if (match !== undefined && match !== null) {
        const title = match[1];
        const artist = match[2];

        try {
            const response = await fetch(`https://lrclib.net/api/get?artist_name=${artist}&track_name=${title}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await response.json();
            if (data?.plainLyrics) {
                return maxChar(`**Lirik ${title} - ${artist}**\n` + data?.plainLyrics);
            }
            return null
        } catch (error) {
            throw error;
        }
    } else {
        return null;
    }
}

module.exports = findLyric;