require('dotenv').config();

const welcomeMessage = [
    `Loh ada tamu ges, tolong siapin jamuan ya di <#${process.env.DISCORD_CHANNEL_ID}>.`,
    `Selamat datang! Silakan masuk ke <#${process.env.DISCORD_CHANNEL_ID}>, anggap aja rumah sendiri.`,
    `Eh ada tamu, mau nyari siapa ya? Ayo masuk dulu ke <#${process.env.DISCORD_CHANNEL_ID}>.`,
];

const goodbyeMessage = [
    `Loh udah pulang lagi aja.`,
    `Hati-hati di jalan ya, jangan sungkan buat mampir lagi.`,
    `Jangan kapok ya main ke sini lagi.`,
];

const morningGreetings = [
    "Selamat pagi semuanya! Semoga hari ini penuh dengan semangat dan energi positif. ☀️",
    "Pagi keluargaku! Ayo awali hari ini dengan pikiran yang tenang. ✨",
    "Good morning! Jangan lupa sarapan dulu ya sebelum beraktivitas. 🍳",
    "Pagi ges! Selamat beraktivitas dan berikan yang terbaik untuk hari ini. 🚀",
    "Selamat pagi! Semoga segala urusan kalian hari ini dilancarkan. 🙏",
    "Semangat pagi! Mari kita buat hari ini lebih baik dari hari kemarin. 🌟",
    "Pagi! Jangan lupa bahagia ya! 🫶",
    "Selamat pagi semuanya! Tetap jaga kesehatan dan jangan lupa minum air putih. 🥤",
    "Bangun dengan syukur, jalani dengan ikhlas. Selamat pagi dan selamat beraktivitas! ☕",
    "Pagi semuanya! Mari kita sambut hari ini dengan semangat yang baru. 🌈",
    "Selamat pagi! Yuk kumpulin nyawa dulu sebelum mulai aktivitas hari ini. ☕",
    "Morning! Buka jendela, hirup udara segar, dan mari bersiap menaklukkan tantangan hari ini. 🌬️",
    "Selamat pagi! Awali hari dengan bismillah dan rasa syukur. Semoga hari ini membawa kabar baik buat kita semua. 🙏",
    "Morning all! Waktunya bangun dari kasur dan mulai kejar target kalian. Jangan ditunda lagi! 🎯",
    "Pagi! AFK dari kasurnya udah selesai ya, waktunya *login* ke dunia nyata dan jalani rutinitas. Selamat beraktivitas! 🎮☀️",

    // Personal
    `Pagi semuanya! Alsaa jangan lupa ketawa ya <@${process.env.ALSA_DC_ID}> 🤣`,
    `Morning! AUNTY <@${process.env.AUNTY_DC_ID}> KERJAAA!!! 🫵`,
    // `Selamat pagi! Car <@${process.env.CAR_DC_ID}> siap-siap, kita berangkat ke Madura! 🚗💨`,
    `Pagi ges! Jangan kebanyakan make ya piww <@${process.env.PIW_DC_ID}>? 🌧️`,
    `Good morning! Tetaplah ceria lupi <@${process.env.LUPI_DC_ID}> 😊`,
    `Ohio! p info animek <@${process.env.EMMA_DC_ID}> di pagi hari. 😁`
]

const lunchGreetings = [
    "Selamat makan siang semuanya! Jangan lupa istirahat sejenak. 🍽️",
    "Waktu istirahat telah tiba. Selamat menikmati makan siang! 🍱",
    "Jam 12 siang nih, yuk rehat dulu dan isi perut biar semangat lagi. ⏰",
    "Pekerjaan bisa menunggu, tapi kesehatan nomor satu. Selamat makan siang! 🥗",
    "Selamat beristirahat dan makan siang. Semoga sisa harinya menyenangkan! ✨",
    "Waktunya rehat sejenak. Selamat makan siang semuanya! 🍛",
    "Sudah jam makan siang. Jangan lupa isi energi dulu ya! 🔋",
    "Selamat istirahat siang. Jangan lupa makan dan minum yang cukup! 🥤",
    "Makan siang dulu yuk, biar semangat aktivitasnya jalan terus! 🚀",
    "Rehat sejenak, selamat menikmati menu makan siang hari ini. 🍜",
    "Sudah tengah hari, waktunya memanjakan perut. Selamat makan! 😋",
    "Jangan biarkan perut kosong, selamat istirahat dan makan siang. 🥪",
    "Sempatkan waktu untuk makan siang agar fokus kembali penuh. 🎯",
    "Waktunya menjauh dari layar sebentar. Selamat makan siang! 💻🏃‍♂️",
    "Mari istirahat. Makan siang yang enak bikin *mood* jadi bagus lagi! 🌟",
    "Semangat siang! Jangan lupa makan biar kuat jalani sisa hari ini. 💪",
    "Istirahat dulu, kerjaan bisa dilanjut nanti. Selamat makan siang semuanya! 🍲",
    "Waktunya *break* siang. Selamat menikmati hidangan masing-masing! 🍽️"
];

const nightGreetings = [
    "Selamat malam semuanya! Waktunya beristirahat setelah seharian beraktivitas. Semoga tidur kalian nyenyak. 🌙",
    "Terima kasih atas kerja kerasnya hari ini. Selamat beristirahat dan kumpulkan energi untuk esok hari yang lebih baik. ✨",
    "Hari ini sudah usai. Mari tenangkan pikiran, rebahkan badan, dan selamat malam semuanya! 🛌",
    "Selamat malam! Jangan lupa bersyukur untuk semua hal baik yang terjadi hari ini. Waktunya istirahat. 🌌",
    "Waktunya istirahat. Jauhkan sejenak semua beban pikiran dan selamat tidur yang lelap! 😴",
    "Selamat malam dan selamat beristirahat. Semoga esok hari membawa lebih banyak kelancaran untuk segala urusan kita. 🌟",
    "Malam telah tiba, waktunya memanjakan tubuh dengan istirahat yang cukup. Selamat tidur semuanya! 🌃",
    "Selamat malam! Waktunya pelan-pelan mengurangi menatap layar HP, saatnya memejamkan mata agar besok bangun dengan segar. 📱💤",
    "Hari yang panjang telah selesai. Mari tutup hari ini dengan rasa damai. Selamat malam dan selamat beristirahat. 🌠",
    "Selamat tidur! Semoga esok hari kita semua bangun dengan semangat yang baru. 🌅",
    "Beristirahatlah dengan tenang, biarkan segala penat hari ini memudar. Selamat malam semuanya! 🍃",
    "Selamat malam. Jangan lupa berterima kasih pada diri sendiri karena sudah berusaha keras hari ini. Waktunya istirahat. 🤍",
    "Kegelapan malam adalah waktu terbaik untuk memulihkan tenaga. Selamat beristirahat, teman-teman! 🌌",
    "Selamat malam! Semoga esok hari menyapa kita semua dengan harapan dan kelancaran yang baru. 🌤️",
    "Istirahat yang cukup adalah kunci semangat untuk hari esok. Selamat tidur semuanya! 🔋",
    "Terkadang hal terbaik yang bisa kita lakukan setelah hari yang panjang adalah berhenti sejenak dan tertidur pulas. Selamat malam. 😴",
    "Selamat malam. Mari lepaskan lelah, tenangkan jiwa, dan bersiap menyambut pagi esok dengan senyuman. 🌠",
    "Aktivitas hari ini sudah cukup, saatnya memberikan hak tubuh untuk beristirahat. Selamat malam dan selamat tidur. 🛌",
    "Selamat tidur! Semoga kedamaian dan ketenangan selalu menyertai waktu istirahat malam kalian. 🌙",
    "Malam adalah pengingat bahwa setiap perjuangan butuh jeda. Selamat beristirahat dan sampai jumpa besok! 👋",
];

module.exports = {
    lunchGreetings,
    morningGreetings,
    nightGreetings,
    welcomeMessage,
    goodbyeMessage,
};
