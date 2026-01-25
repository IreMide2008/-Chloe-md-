module.exports = async function deleteBotCommand(sock, chatId, userMessage, senderId) {
  const fakeLeaveMsg = `
⚠️ *©️Chloe™️ is being deleted from this chat...*

🔧 Deleting core files...
🧠 Erasing memory...
📴 Shutting down commands...

💥 *BOT HAS BEEN REMOVED FROM GROUP*

Goodbye forever b*tches, i hate y'all... 😵
  `;

  await sock.sendMessage(chatId, { text: fakeLeaveMsg });
  await sleep(5000);

  const fakeJoinMsg = `
🔄 *SYSTEM OVERRIDE DETECTED*
🔁 *Auto-Rejoining...*

🔐 Security Patched
✅ *©️Chloe™️ IS BACK ONLINE motherfvckers!*

👁️ Someone tried to delete me... *©️Chloe™️ don't die that easy.*
  `;

  await sock.sendMessage(chatId, { text: fakeJoinMsg });
};
