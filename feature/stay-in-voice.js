const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  VoiceConnectionStatus,
  entersState,
} = require("@discordjs/voice");

async function joinVC(channel) {
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
    selfDeaf: false,
  });

  await entersState(
    connection,
    VoiceConnectionStatus.Ready,
    30000
  );

  console.log("Voice Ready");

  const player = createAudioPlayer();

  const resource = createAudioResource("../assets/audio/walls-ice-cream.mp3");

  connection.subscribe(player);

  player.play(resource);

  player.on(AudioPlayerStatus.Playing, () => {
    console.log("Sedang memutar...");
  });

  player.on(AudioPlayerStatus.Idle, () => {
    console.log("Lagu selesai.");

    connection.destroy();
  });

  player.on("error", console.error);

  connection.on(VoiceConnectionStatus.Disconnected, async () => {
    setTimeout(() => {
      joinVC(channel);
    }, 5000);
  });
}

module.exports = joinVC;