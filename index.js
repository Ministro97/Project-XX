const { Telegraf, Markup } = require('telegraf');
const fs = require('fs');
const path = require('path');
const { schedule } = require('@netlify/functions');




const bot = new Telegraf('6823072792:AAGd_72YdUJtDvU3PlHPdc-UhaCgBZVs02A');

let timerActive = false;
let set_tags_active = true;
let canOpenSession = true;
let intervalId;
let messageId;
let countdownMessageId;
let messageCounts = {};
let ideas = [];










// Funzione per leggere i prefissi validi da un file JSON
function getValidPrefixes() { const filePath = path.join(__dirname, 'validPrefixes.json'); if (fs.existsSync(filePath)) { const data = fs.readFileSync(filePath); const prefixes = JSON.parse(data); return prefixes.validPrefixes; } else { console.error('File validPrefixes.json non trovato.'); return []; } }




// Middleware per verificare i prefissi nei messaggi
bot.use(async(ctx, next) => {

    if (timerActive && ctx.message && ctx.message.text) {
        const validPrefixes = getValidPrefixes(); // [firstPrefix, secondPrefix, thirdPrefix, fourthPrefix];
        const botMentioned = ctx.message.entities && ctx.message.entities.some(entity => entity.type === 'mention' && ctx.message.text.substring(entity.offset, entity.offset + entity.length) === `@${ctx.botInfo.username}`);
        if (!validPrefixes.some(prefix => ctx.message.text.startsWith(prefix)) || ctx.message.text.startsWith('/') || botMentioned) {
            ctx.deleteMessage(ctx.message.message_id).catch((err) => console.error('Errore nell\'eliminazione del messaggio:', err));
            return;
        }
    }
    await next();
});








// Funzione per salvare i prefissi validi in un file JSON 
function saveValidPrefixes(prefixes) {
    const filePath = path.join(__dirname, 'validPrefixes.json');
    const data = JSON.stringify({ validPrefixes: prefixes }, null, 2);
    fs.writeFileSync(filePath, data);
}


// Funzione per verificare se l'utente è un amministratore
async function isAdmin(ctx) {
    const member = await ctx.telegram.getChatMember(ctx.chat.id, ctx.from.id);
    return member.status === 'administrator' || member.status === 'creator';
}



// Comando per cambiare i prefissi
bot.command('set_tags_XX', async(ctx) => {
    if (await isAdmin(ctx) && set_tags_active === true) {
        const args = ctx.message.text.split(' ').slice(1).join(' ').split(',');
        if (args.length !== 4) {
            await ctx.replyWithHTML('Devi specificare esattamente 4 tags. \n\n\n<code> © 2024-2025 Project XX </code>');
            return;
        }

        const newPrefixes = args.map(prefix => prefix.trim()).filter(prefix => prefix.startsWith('#') && prefix.length <= 15);
        if (newPrefixes.length !== args.length) {
            await ctx.replyWithHTML('Ogni tags deve essere preceduto da # e non più lungo di 10 lettere.\n\n\n<code> © 2024-2025 Project XX </code>');
            return;
        }

        saveValidPrefixes(newPrefixes);
        await ctx.reply(`Tags aggiornati: ${newPrefixes.join(', ')}`);
    } else if (set_tags_active === false) {
        await ctx.reply('Non puoi cambiare i tags mentre la sessione di Brain Storming XX è attiva.');

    } else {
        await ctx.replyWithHTML('Solo gli amministratori possono aggiornare i tags. \n\n\n<code> © 2024-2025 Project XX </code>');
    }
});







// Funzione per generare la classifica degli utenti
async function generateLeaderboard(ctx) {
    try {
        const userFiles = fs.readdirSync('./').filter(file => file.endsWith('.json') && file !== 'package.json' && file !== 'package-lock.json' && file !== 'validPrefixes.json');
        const userVotes = {};
        for (const file of userFiles) {
            try {
                const data = fs.readFileSync(path.join('./', file));
                const userMessages = JSON.parse(data);
                const username = path.basename(file, '.json');
                userVotes[username] = userMessages.reduce((total, msg) => total + (msg.voti || 0), 0);
            } catch (err) { console.error(`Errore durante la lettura del file ${file}:`, err); }
        }
        const sortedUsers = Object.entries(userVotes).sort((a, b) => b[1] - a[1]);
        let leaderboard = 'Classifica degli utenti 🏆\n\n';
        sortedUsers.forEach(([username, votes], index) => {
            let rank;
            if (votes >= 1000) { rank = '<i>Mentore XX</i>'; } else if (votes >= 500) { rank = '<i>Veterano XX</i>'; } else if (votes >= 300) { rank = '<i>Esperto XX</i>'; } else if (votes >= 200) { rank = '<i>Assistente</i>'; } else if (votes >= 100) { rank = '<I>Apprendista Grado 1</i>'; } else if (votes >= 50) { rank = '<i>Apprendista Grado 2</i>'; } else { rank = '<i>Apprendista Grado 3</i>'; }
            leaderboard += `${index + 1}. ${username}: ${votes} voti \n- ${rank}\n\n\n <code> © 2024-2025 Project XX </code>`;
        });
        await ctx.replyWithHTML(leaderboard);
    } catch (err) {
        console.error('Errore durante la generazione della classifica:', err);
        await ctx.replyWithHTML('Si è verificato un errore durante la generazione della classifica. Per favore, riprova più tardi. \n\n\n<code> © 2024-2025 Project XX </code>');
    }
}




bot.command('leaderboard_XX', async(ctx) => { await generateLeaderboard(ctx); });


bot.use(async(ctx, next) => { if (ctx.message && ctx.message.text && ctx.message.text.toLowerCase().includes('classifica') && !ctx.message.text.startsWith('/')) { await generateLeaderboard(ctx); } else { await next(); } });














bot.command('brain_storming_xx', async(ctx) => {
    if (canOpenSession === true) {
        await startBrainstorming(ctx);

    }
});


const validPrefixes = getValidPrefixes();
const firstPrefix = validPrefixes.length > 0 ? validPrefixes[0] : null;
const secondPrefix = validPrefixes.length > 1 ? validPrefixes[1] : null;
const thirdPrefix = validPrefixes.length > 2 ? validPrefixes[2] : null;
const fourthPrefix = validPrefixes.length > 3 ? validPrefixes[3] : null;





const badWords = ['cazzo', 'figa', 'porco', 'porca']; // Aggiungi qui le parole inappropriate file json

function containsBadWords(text) {
    return badWords.some(word => text.toLowerCase().includes(word));
}

bot.on('text', async(ctx) => {
    if (ctx.message.text.toLowerCase().includes('brain storming xx') && ctx.message.entities) {
        const botWasMentioned = ctx.message.entities.some(entity => entity.type === 'mention' && ctx.message.text.substring(entity.offset, entity.offset + entity.length) === `@${ctx.botInfo.username}`);
        if (botWasMentioned && await isAdmin(ctx) && canOpenSession === true) {
            await startBrainstorming(ctx);
        }
    } else if (timerActive) {
        const validPrefixes = [firstPrefix, secondPrefix, thirdPrefix, fourthPrefix];
        if (validPrefixes.some(prefix => ctx.message.text.startsWith(prefix))) {

            let username = ctx.from.username || ctx.from.first_name;
            username = username.replace(/\s+/g, '_'); // Sostituisce gli spazi con _
            const prefix = validPrefixes.find(prefix => ctx.message.text.startsWith(prefix));
            const text = ctx.message.text.replace(prefix, '').trim();

            if (!text) { ctx.deleteMessage(ctx.message.message_id).catch((err) => console.error('Errore nell\'eliminazione del messaggio:', err)); return; }

            // Controlla se il messaggio contiene parole inappropriate
            if (containsBadWords(text)) {
                const warningMessage = await ctx.replyWithHTML('Il tuo messaggio contiene contenuti inappropriati e non è stato inviato. \n\n\n<code> © 2024-2025 Project XX </code>');
                setTimeout(() => {
                    ctx.deleteMessage(warningMessage.message_id).catch((err) => console.error('Errore nell\'eliminazione del messaggio di avviso:', err));
                }, 3000);
                ctx.deleteMessage(ctx.message.message_id).catch((err) => console.error('Errore nell\'eliminazione del messaggio:', err));
                return;
            }

            // Limita il messaggio a 20 parole e 80 lettere
            const words = text.split(' ');
            if (words.length > 20 || text.length > 80) {
                const warningMessage = await ctx.replyWithHTML('Il messaggio è troppo lungo. Per favore, limita il tuo messaggio a 20 parole e 80 lettere. \n\n\n<code> © 2024-2025 Project XX </code>');
                setTimeout(() => {
                    ctx.deleteMessage(warningMessage.message_id).catch((err) => console.error('Errore nell\'eliminazione del messaggio di avviso:', err));
                }, 3000);
                ctx.deleteMessage(ctx.message.message_id).catch((err) => console.error('Errore nell\'eliminazione del messaggio:', err));
                return;
            }

            const timestamp = new Date().toLocaleString();
            const messageData = { hashtag: prefix, messaggio: text, voti: 0, id: ctx.message.message_id, autore: username, timestamp: timestamp };
            ideas.push(messageData);




            if (!messageCounts[username]) {
                messageCounts[username] = {};
                validPrefixes.forEach(prefix => { messageCounts[username][prefix] = 0; });
            }
            messageCounts[username][prefix]++;










            // Aggiungi pulsanti di votazione
            await ctx.replyWithHTML(`${prefix} ${text} (<i>di ${username}</i>)`, Markup.inlineKeyboard([
                Markup.button.callback('🔥', `vote_${ctx.message.message_id}`)
            ]));
        } else {
            ctx.deleteMessage().catch((err) => console.error('Errore nell\'eliminazione del messaggio:', err));
        }
    } else if (ctx.message.entities) {
        const botWasMentioned = ctx.message.entities.some(entity => entity.type === 'mention' && ctx.message.text.substring(entity.offset, entity.offset + entity.length) === `@${ctx.botInfo.username}`);
        if (botWasMentioned && await isAdmin(ctx)) {
            const args = ctx.message.text.split(' ');
            if (args.length === 2) {
                let username = args[1];
                username = username.replace(/\s+/g, '_'); // Sostituisce gli spazi con _
                
            } else {
                ctx.reply('Per favore, specifica il nome dell\'utente.');
            }
        }
    }
});



bot.action(/vote_(\d+)/, async(ctx) => {
    try {
        const ideaId = parseInt(ctx.match[1]);
        const idea = ideas.find(i => i.id === ideaId);
        const userId = ctx.from.id;

        if (idea) {
            if (!idea.voters) {
                idea.voters = new Set();
            }

            if (!idea.voters.has(userId)) {
                idea.voti++;
                idea.voters.add(userId);

                // Aggiorna il file JSON dell'utente
                const filePath = `${idea.autore}.json`;
                if (fs.existsSync(filePath)) {
                    const data = fs.readFileSync(filePath);
                    const userMessages = JSON.parse(data);
                    const messageIndex = userMessages.findIndex(msg => msg.id === ideaId);
                    if (messageIndex !== -1) {
                        userMessages[messageIndex].voti = idea.voti;
                        fs.writeFileSync(filePath, JSON.stringify(userMessages, null, 2));
                    }
                }

                // Escape dei caratteri speciali nel messaggio
                const autore = idea.autore.replace(/(_*[\~`>#+\-=|{}.!])/g, '\\$1');
                const messaggio = idea.messaggio.replace(/(_*[\~`>#+\-=|{}.!])/g, '\\$1');

                await ctx.answerCbQuery(`Hai votato per l'idea di ${autore}: ${messaggio}`);
            } else {
                await ctx.answerCbQuery('Hai già votato per questa idea.');
            }
        } else {
            await ctx.answerCbQuery('Idea non trovata.');
        }
    } catch (err) {
        console.error('Errore durante l\'azione di voto:', err);
        await ctx.answerCbQuery('Si è verificato un errore durante il voto. Per favore, riprova più tardi.');
    }
});









const startBrainstorming = async (ctx) => {
  
  let canOpenSession = false;

let set_tags_active = false;
  
  const validPrefixes = getValidPrefixes();

const firstPrefix = validPrefixes.length > 0 ? validPrefixes[0] : null;

const secondPrefix = validPrefixes.length > 1 ? validPrefixes[1] : null;
const thirdPrefix = validPrefixes.length > 2 ? validPrefixes[2] : null;
const fourthPrefix = validPrefixes.length > 3 ? validPrefixes[3] : null;
  
  
    try {
        if (await isAdmin(ctx)) {
            const seconds = 50; // Imposta sempre a 50 secondi
            timerActive = true;
            let remainingTime = seconds;
            messageCounts = {}; // Resetta i contatori dei messaggi
            ideas = []; // Resetta le idee

            await ctx.replyWithHTML(`
<b>Sessione di Brain storming XX</b> 🔥 

Benvenuti creativi allenatori! È il momento di liberare la vostra immaginazione e contribuire con idee straordinarie per Pokémon XX. Fino allo scadere del tempo, potrete inviare in questo gruppo dei messaggi testuali con qualsiasi vostra idea. Ci sono solo due regole: \n\n1. Prima di ogni messaggio, aggiungete il tags corretto per l’argomento. \n\n2. La lunghezza dei messaggi è fissata a un massimo di 20 parole e 80 lettere, quindi non dovrete scrivere dei poemi, l'idea deve essere breve e concisa \n\n

Ecco i tags che potrete utilizzare: 

${firstPrefix} + [il tuo messaggio]  
${secondPrefix} + [il tuo messaggio]
${thirdPrefix} + [il tuo messaggio] 
${fourthPrefix} + [il tuo messaggio] 

Non vedo l’ora di vedere le vostre idee folli! 💡

<code> © 2024-2025 Project XX </code>
`);

            const message = await ctx.reply(`Tempo rimanente: ${remainingTime} secondi.`);
            messageId = message.message_id;

            await ctx.telegram.pinChatMessage(ctx.chat.id, messageId);

            const updateTimer = async () => {
                if (remainingTime > 0) {
                    remainingTime -= 10;
                    await ctx.telegram.editMessageText(ctx.chat.id, messageId, null, `Tempo rimanente: ${remainingTime} secondi.`);
                    await ctx.telegram.pinChatMessage(ctx.chat.id, messageId);
                } else {
                    clearInterval(intervalId);
                    const countdownMessage = await ctx.replyWithHTML(`Tempo rimanente: 0 secondi.`);
                    countdownMessageId = countdownMessage.message_id;

                    const countdownIntervalId = setInterval(async () => {
                        if (remainingTime > 0) {
                            remainingTime--;
                            await ctx.telegram.editMessageText(ctx.chat.id, countdownMessageId, null, `Tempo rimanente: ${remainingTime} secondi.`);
                            await ctx.telegram.pinChatMessage(ctx.chat.id, countdownMessageId);
                        } else {
                            clearInterval(countdownIntervalId);
                            await ctx.telegram.editMessageText(ctx.chat.id, countdownMessageId, null, 'La sessione di Brain Storming XX è terminata, di seguito potrete visualizzare i risultati della sessione.');
                            timerActive = false;
                            await ctx.telegram.unpinChatMessage(ctx.chat.id, countdownMessageId);
                            await sendSummary(ctx);
                        }
                    }, 3000);
                }
            };

            const intervalId = setInterval(updateTimer, 10000);
        } else {
            ctx.reply('Solo gli amministratori possono padroneggiare il potere di Brain Storming XX.');
        }
    } catch (err) {
        console.error('Errore durante l\'avvio della sessione di brainstorming:', err);
        await ctx.reply('Si è verificato un errore durante l\'avvio della sessione di brainstorming. Per favore, riprova più tardi.');
    }
};


/*
async function deleteRemainingTimeMessages(ctx) {
    try {
        const chatId = ctx.chat.id;
        const messages = await ctx.telegram.getChat(chatId);
        for (const message of messages) {
            if (message.from.is_bot && message.text.includes('Tempo rimanente')) {
                setTimeout(async() => {
                    await ctx.telegram.deleteMessage(chatId, message.message_id);
                }, 10000);
            }
        }
    } catch (err) {
        console.error('Errore durante l\'eliminazione dei messaggi "Tempo rimanente":', err);
    }
} */

async function sendSummary(ctx) {
    if (Object.keys(messageCounts).length === 0) {
        await ctx.replyWithHTML('Non sono state aggiunte altre idee dai partecipanti del gruppo in questa sessione di Brain Storming.\n\n\n<code> © 2024-2025 Project XX </code>');
        set_tags_active = true;
        canOpenSession = true;
    } else {
        const data = new Date().toLocaleDateString()
        let summary = `<b>Risultati Brain Storming XX</b> 📊\n\nData sessione: ${data} \n\n`;
        for (const [username, counts] of Object.entries(messageCounts)) {
            summary += `👤 ${username}:\n`;
            for (const [prefix, count] of Object.entries(counts)) {
                summary += `  ${prefix}: ${count}\n`;
            }
            summary += '\n';
        }
        summary += '\n\n🔥 Classifica idee  🔥';
        ideas.sort((a, b) => b.voti - a.voti);
        ideas.forEach(idea => {
            summary += `\n\n💡 ${idea.messaggio} (<i>di ${idea.autore}</i>) \n- Voti: ${idea.voti}\n\n`;
        });
        await ctx.replyWithHTML(`${summary}\n\n\n<code> © 2024-2025 Project XX </code>`);



        set_tags_active = true;
        canOpenSession = true;


    }

    // await deleteRemainingTimeMessages(ctx);



}










//AWS handler 
exports.handler = async event => {
  try {
    await bot.handleUpdate(JSON.parse(event.body));
    return { statusCode: 200, body: "" };
  } catch (e) {
    console.error("error in handler:", e);
    return { statusCode: 400, body: "This endpoint is meant for bot and telegram communication" };
  }
};


module.exports.handler = schedule('@hourly', startBrainstorming);












