const cron = require('node-cron');

let scheduledTask = null;
let currentSchedule = null;

function startCron(client, schedule) {
    if (!cron.validate(schedule)) {
        throw new Error(`Cron expression tidak valid: ${schedule}`);
    }

    // Hentikan cron sebelumnya jika masih ada
    if (scheduledTask) {
        scheduledTask.stop();
    }

    scheduledTask = cron.schedule(schedule, async () => {
        try {
            const channel = await client.channels.fetch(
                process.env.DISCORD_BIG_FAMILY_CHANNEL_ID
            );

            if (channel) {
                await channel.send('Semalam tuh kalian ngetag ada apa?');
            }
        } catch (error) {
            console.error('Gagal mengirim pesan terjadwal:', error);
        }
    }, {
        timezone: 'Asia/Jakarta'
    });

    currentSchedule = schedule;

    console.log(`Cron aktif: ${schedule}`);
}

function stopCron() {
    if (!scheduledTask) {
        console.log('Cron belum dibuat.');
        return;
    }

    scheduledTask.stop();
    console.log('Cron berhasil dihentikan.');
}

function getCurrentSchedule() {
    return currentSchedule;
}

module.exports = {
    startCron,
    stopCron,
    getCurrentSchedule
};