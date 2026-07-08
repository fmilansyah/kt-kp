const {
  joinVoiceChannel,
  VoiceConnectionStatus,
} = require("@discordjs/voice");

function joinVC(channel) {
  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
    selfMute: true,
    selfDeaf: true,
  });

  connection.on(VoiceConnectionStatus.Disconnected, async () => {
    setTimeout(() => {
      joinVC(channel);
    }, 5000);
  });
}

module.exports = joinVC;