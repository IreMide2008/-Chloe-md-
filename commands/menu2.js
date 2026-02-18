const settings = require('../settings');
const fs = require('fs');
const path = require('path');

function formatTime(seconds) {
    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds %= (24 * 60 * 60);
    const hours = Math.floor(seconds / (60 * 60));
    seconds %= (60 * 60);
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);

    let time = '';
    if (days > 0) time += `${days}d `;
    if (hours > 0) time += `${hours}h `;
    if (minutes > 0) time += `${minutes}m `;
    if (seconds > 0 || time === '') time += `${seconds}s`;

    return time.trim();
}

async function helpCommand(sock, chatId, message) {
    const start = Date.now();
    await sock.sendMessage(chatId, { text: '⏳ *Loading ©️Chloe™️2 menu...* ♻️' }, { quoted: message });
    const end = Date.now();
    const ping = Math.round((end - start) / 2);
    const uptimeFormatted = formatTime(process.uptime());

  const helpMessage = `
╔══════════════════════════════════╗
        🌚  ${settings.botName}  🌚
          
╚══════════════════════════════════╝

👑 Owner: ${settings.botOwner}
⚡ Speed: ${ping} ms
⏳ Uptime: ${uptimeFormatted}
🕰️ Time: ${new Date().toLocaleString()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🥶  OTP VAULT
╭──────────────────────────╮
│ 🌍 .otp countries
│ 📱 .otp services
│ 🔄 .otp get <country> <service>
│ 📥 .otp check
│ 📊 .otp status
│ 🧹 .otp clear
│ 📋 .otp recent
╰──────────────────────────╯

🤓  COMMAND CENTER
╭──────────────────────────╮
│ 📜 .menu      📶 .ping
│ ⏱️ .runtime    👑 .owner
│ 😂 .joke      💬 .quote
│ 🧠 .fact      🌦️ .weather
│ 📰 .news      🎱 .8ball
│ 📸 .ss        🔍 .jid
╰──────────────────────────╯

🥵  ADMIN CONTROL
╭──────────────────────────╮
│ 🔴 .ban        🔵 .unban
│ 👑 .promote    👥 .demote
│ 👋 .kick       🗑️ .delete
│ 🚫 .antilink   🚫 .antibadword
│ 🤖 .chatbot    🔗 .resetlink
│ 🛡️ .sudo       ❌ .delsudo
╰──────────────────────────╯

🌚  AI LAB
╭──────────────────────────╮
│ 🤖 .gpt      💡 .gptgo
│ 🧬 .gemini   🧠 .flux
│ 🎨 .imagine
╰──────────────────────────╯

🥸  ELITE FUN ZONE
╭──────────────────────────╮
│ 💘 .compliment   😡 .insult
│ 😍 .flirt        💋 .kiss
│ 🚢 .ship         😈 .simp
│ 🧠 .mindread     👻 .ghost
│ 💣 .explode      🌈 .gaycheck
╰──────────────────────────╯

🎮  GAME ARENA
╭──────────────────────────╮
│ ❌⭕ .tictactoe   🎯 .hangman
│ ❓ .guess        🧠 .trivia
│ 😈 .dare         🤐 .truth
╰──────────────────────────╯

🚀  SYSTEM CORE
╭──────────────────────────╮
│ 🔄 .update
╰──────────────────────────╯

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💎  Premium Access Granted
🔥  Powered by ${settings.botName}
`;

    try {
        const imagePath = path.join(__dirname, '../assets/image.jpg');
        const audioPath = path.join(__dirname, '../assets/menu.mp3');
        const audio3Path = path.join(__dirname, '../assets/audio3.mp3');

        if (fs.existsSync(imagePath)) {
            const imageBuffer = fs.readFileSync(imagePath);
            await sock.sendMessage(chatId, {
                image: imageBuffer,
                caption: helpMessage,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: false,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363281985436737@newsletter',
                        newsletterName: settings.botName,
                        serverMessageId: -1
                    }
                }
            }, { quoted: message });

            if (fs.existsSync(audioPath)) {
                const audioBuffer = fs.readFileSync(audioPath);
                await sock.sendMessage(chatId, {
                    audio: audioBuffer,
                    mimetype: 'audio/mp4',
                    ptt: true
                }, { quoted: message });
            }

            if (fs.existsSync(audio3Path)) {
                const audio3Buffer = fs.readFileSync(audio3Path);
                await sock.sendMessage(chatId, {
                    audio: audio3Buffer,
                    mimetype: 'audio/mp4',
                    ptt: true
                }, { quoted: message });
            }

        } else {
            await sock.sendMessage(chatId, { text: helpMessage });
        }
    } catch (error) {
        console.error('Error in help command:', error);
        await sock.sendMessage(chatId, { text: helpMessage });
    }
}

module.exports = helpCommand;
