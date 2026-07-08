require('dotenv').config();
const { Client, GatewayIntentBits, MessageFlags } = require('discord.js');
const cron = require('node-cron');

const { checkStatusCmd, translateCmd, geminiCmd } = require('./constants/commands');
const translateText = require('./feature/translator');
const askGemini = require('./feature/gemini');
const { morningGreetings, welcomeMessage, goodbyeMessage } = require('./constants/greetings');
const { randomArray } = require('./utils/random');
const findLyric = require('./feature/find-lyric');
const joinVC = require('./feature/stay-in-voice');

const activeTz = 'Asia/Jakarta';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

client.once('clientReady', async () => {
    console.log(`Bot berhasil online`);

    // Join voice channel
    const voiceChannel = await client.channels.fetch(process.env.DISCORD_VOICE_CHANNEL_ID);
    if (voiceChannel) {
        joinVC(voiceChannel);
    }

    // Jam 6 pagi
    cron.schedule('0 6 * * *', async () => {
        try {
            const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL_ID);

            if (channel) {
                await channel.send(randomArray(morningGreetings));
            }
        } catch (error) {
            console.error('Gagal mengirim pesan terjadwal pada jam 6 pagi:', error);
        }
    }, {
        scheduled: true,
        timezone: activeTz,
    });
});

client.on('guildMemberAdd', async (member) => {
    const memberId = member.user.id;
    const channel = await client.channels.fetch(process.env.DISCORD_WELCOME_CHANNEL_ID);
    if (channel) {
        await channel.send(randomArray(welcomeMessage) + ` <@${memberId}>`);
    }
});

client.on('guildMemberRemove', async (member) => {
    const memberName = member.displayName;
    const channel = await client.channels.fetch(process.env.DISCORD_WELCOME_CHANNEL_ID);
    if (channel) {
        await channel.send(randomArray(goodbyeMessage) + ' ' + memberName);
    }
});

client.on('messageCreate', async (message) => {
    const musicChannelId = process.env.DISCORD_MUSIC_CHANNEL_ID;
    if (message.author.bot && message.channel.id === musicChannelId) {
        const channel = await client.channels.fetch(musicChannelId);
        const botMusicMsg = message.embeds?.[0]?.description ?? '';

        if (channel && botMusicMsg.includes('Started playing')) {
            // await message.channel.sendTyping();

            const lyric = await findLyric(botMusicMsg);
            if (lyric) {
                await message.reply({
                    content: lyric,
                    flags: MessageFlags.SuppressNotifications
                });
            }
        }
    }

    if (message.author.bot) return;

    const msgUser = message.content.toLowerCase();

    if (msgUser.startsWith(translateCmd)) {
        const originalText = message.content.slice(translateCmd.length).trim();

        if (!originalText) {
            return message.reply('Apa yang mau ditranslate? Contoh: `translate king aku cinta kamu`');
        }

        try {
            // await message.channel.sendTyping();

            const resultTranslated = await translateText(originalText);
            await message.reply(resultTranslated);
        } catch (error) {
            await message.reply('Translate aja sendiri lah');
        }
    }

    if (msgUser.startsWith(geminiCmd)) {
        const question = message.content.slice(geminiCmd.length).trim();

        if (!question) {
            return message.reply('Mana pertanyaannya? Contoh: `tanya king apa itu roblox?`');
        }

        try {
            // await message.channel.sendTyping();

            const answer = await askGemini(question);
            await message.reply(answer);
        } catch (error) {
            await message.reply('Duh lagi males mikir');
        }
    }

    if (msgUser === checkStatusCmd) {
        message.reply('GA USAH SOK ASIK!');
    }
});

client.login(process.env.DISCORD_TOKEN);