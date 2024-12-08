const { Telegraf, Markup, Scenes, session } = require('telegraf');
const { WizardScene, Stage } = Scenes;
const { Client, fql} = require('fauna');
const fs = require('fs');
const path = require('path');


const bot = new Telegraf('6823072792:AAGd_72YdUJtDvU3PlHPdc-UhaCgBZVs02A');

let timerActive = false;
let set_tags_active = true;
let canOpenSession = true;
let intervalId;
let messageId;
let countdownMessageId;
let messageCounts = {};
let ideas = [];
let brainstormingActive = false;
let pinnedMessageId = null;
let copyright = "\n\n\n<code> © 2024-2025 Project XX </code>"

let sessionOwner = null;







/*

// Step 1: Ask for the topic title
const step1 = (ctx) => {
  ctx.reply('Per favore, invia il titolo del nuovo topic.');
  return ctx.wizard.next();
};

// Step 2: Create the topic with the provided title and store the title
const step2 = async (ctx) => {
  const topicName = ctx.message.text + " by " + ctx.from.first_name;
  ctx.wizard.state.topicName = topicName; // Store the topic name in the wizard state
  ctx.wizard.state.creator = ctx.from.first_name; // Store the creator's username
  try {
    const topicMessage = await ctx.telegram.createForumTopic(ctx.chat.id, topicName);
    const topicLink = `https://t.me/c/2423172017/${ctx.message.message_id + 1}`;
    await ctx.replyWithMarkdown(`Topic creato da ${ctx.wizard.state.creator}: ${topicName}\n\n${topicLink}`, { parse_mode: 'Markdown' });
    await ctx.telegram.sendMessage(ctx.from.id, `Hai creato un nuovo topic: ${topicName}`, { parse_mode: 'Markdown' });
    // Aggiunta del messaggio predefinito
const predefinedMessage = 'Questo è un messaggio predefinito per il topic.';

    let topicId = ctx.message.message_id + 1;
  
// Invio del messaggio predefinito al topic appena creato
await ctx.telegram.sendMessage(ctx.message.chat.id, predefinedMessage, {
  message_thread_id: topicId 
});
console.log(topicId);

  } catch (error) {
    console.error(error);
    await ctx.reply('Errore nella creazione del topic.');
  }
  return ctx.scene.leave();
};

// Create a wizard scene
const createTopicWizard = new WizardScene('create-topic-wizard', step1, step2);

// Create a stage and register the wizard scene
const stage = new Stage([createTopicWizard]);
bot.use(session());
bot.use(stage.middleware());

// Command to start the wizard
bot.command('createtopic', (ctx) => {
  if (ctx.message.chat.type === 'supergroup' && ctx.message.message_thread_id === undefined) {
    ctx.scene.enter('create-topic-wizard');
  } else {
    ctx.reply('Puoi creare un topic solo dalla chat generale del gruppo.');
  }
});


bot.command('topicinfo', (ctx) => {
  const chatId = ctx.message.chat.id;
  const threadId = ctx.message.message_thread_id;
  ctx.reply(`Chat ID: ${chatId}\nTopic ID: ${threadId}`);
  console.log(`Chat ID: ${chatId}, Topic ID: ${threadId}`);
});




let predefinedMessage = "ciao"

/*
bot.command('send', async (ctx) => {
  try {
    const chatId = "2423172017";
    const messageId = ctx.message.message_id;
    await ctx.telegram.sendMessage(chatId, predefinedMessage, {
      message_thread_id: 239
    });
    console.log(`Messaggio inviato con ID: ${messageId}`);
  } catch (error) {
    console.error('Errore nell\'invio del messaggio:', error);
  }
});
  */




// Configura il client Fauna con il tuo segreto




// Chiama la funzione per verificare la connessione



// Use `require` for CommonJS:
// const { Client, fql, FaunaError } = require('fauna');


// To configure your client:
// const client = new Client({
//   secret: YOUR_FAUNA_SECRET,
// });









///



///

/*

bot.start((ctx) => {
  const client = new Client({
    secret: process.env.FAUNA_SECRET,
    query_timeout_ms: 60_000
  });

// Funzione per verificare la connessione
async function verifyConnection() {
  try {
    // Esegui una semplice query per verificare la connessione
    const result = await client.query(fql`1`);
    console.log('Connessione a FaunaDB riuscita:', result);
  } catch (error) {
    console.error('Errore nella connessione a FaunaDB:', error);
  }
}

  verifyConnection();


  
  const username = ctx.from.id;

  if (!username) {
    ctx.reply('Nome utente non trovato. Assicurati di avere un nome utente impostato su Telegram.');
    return;
  }

  // Query per salvare il nome utente in FaunaDB
  const saveUserQuery = fql`
    Users.create({ username: ${username} }) {
      id,
      username
    }
  `;

  client.query(saveUserQuery)
    .then((response) => {

      const client = new Client({
    secret: process.env.FAUNA_SECRET,
    query_timeout_ms: 60_000
  });
      ctx.reply(`Ciao ${username}, il tuo nome utente è stato salvato!`);
      client.close()
    })
    .catch((error) => {
      console.error('Errore nel salvataggio:', error);
      ctx.reply('Si è verificato un errore nel salvataggio del tuo nome utente.');
      client.close()
    });
  
});

*/




bot.start(async (ctx) => {
  const client = new Client({
    secret: process.env.FAUNA_SECRET,
    query_timeout_ms: 60_000
  });

  const username = ctx.from.id;

  if (!username) {
    ctx.reply('Nome utente non trovato. Assicurati di avere un nome utente impostato su Telegram.');
    return;
  }

  const saveUserQuery = fql`
    Users.create({ username: ${username} }) {
      id,
      username
    }
  `;

  try {
    const response = await client.query(saveUserQuery);
    ctx.reply(`Ciao ${username}, il tuo nome utente è stato salvato!`);
  } catch (error) {
    console.error('Errore nel salvataggio:', error);
    ctx.reply('Si è verificato un errore nel salvataggio del tuo nome utente.');
  } finally {
    client.close();
  }
});







// Comando per ottenere il nome utente salvato


// Comando per ottenere il nome utente salvato


// Comando per ottenere il nome utente salvato
bot.command('getusername', async (ctx) => {
  const client = new Client({
    secret: process.env.FAUNA_SECRET,
    query_timeout_ms: 60_000
  });

  const username = ctx.from.id; // Usa ctx.from.username invece di ctx.from.id

  console.log('Username:', username); // Log per verificare il valore di username

  if (!username) {
    ctx.reply('Nome utente non trovato. Assicurati di avere un nome utente impostato su Telegram.');
    return;
  }

  const getUserQuery = fql`
    Users.where(.username == ${username}) {
      id,
      username
    }
  `;

  try {
    const response = await client.query(getUserQuery);
    console.log('Response:', response);

// Estrai e visualizza i dati correttamente
    const users = response.data.data; // Accedi alla lista di utenti
    console.log('Users:', users);

    
    if (users) {
      // Estrai e visualizza i dati correttamente
      const user = response.data.data[1];
      console.log('User:', user.username);
      ctx.reply(`Il tuo nome utente salvato è: ${user.username}`);
    } else {
      ctx.reply('Nome utente non trovato nel database.');
    }
  } catch (error) {
    console.error('Errore nel recupero del nome utente:', error);
    ctx.reply('Si è verificato un errore nel recupero del tuo nome utente.');
  } finally {
    client.close();
  }
});



//













//

  










// Comando per recuperare il nome utente






/*

// Step 1: Chiedi il titolo del topic
const step1 = (ctx) => {
    ctx.reply('Per favore, invia il titolo del nuovo topic.');
    return ctx.wizard.next();
};

// Step 2: Crea il topic con il titolo fornito e salva i dati su FaunaDB
const step2 = async(ctx) => {

// Funzione per verificare la connessione a FaunaDB
const verifyFaunaConnection = async () => {
  try {
    const result = await client.query(q.Paginate(q.Collections()));
    console.log('Connessione a FaunaDB riuscita:', result);
  } catch (error) {
    console.error('Errore nella connessione a FaunaDB:', error);
  }
};

  verifyFaunaConnection()

  
    const topicName = ctx.message.text + " by " + ctx.from.first_name;
    ctx.wizard.state.topicName = topicName; // Memorizza il nome del topic nello stato del wizard
    ctx.wizard.state.creator = ctx.from.first_name; // Memorizza il nome dell'utente che ha creato il topic
    try {
        const topicMessage = await ctx.telegram.createForumTopic(ctx.chat.id, topicName);
        const topicLink = `https://t.me/c/2423172017/${ctx.message.message_id + 1}`;
        await ctx.replyWithMarkdown(`Topic creato da ${ctx.wizard.state.creator}: ${topicName}\n\n${topicLink}`, { parse_mode: 'Markdown' });
        await ctx.telegram.sendMessage(ctx.from.id, ` Hai creato un nuovo topic: ${topicName}`, { parse_mode: 'Markdown' });

        // Aggiunta del messaggio predefinito
        const predefinedMessage = 'Questo è un messaggio predefinito per il topic.';
        let topicId = ctx.message.message_id + 1;
        await ctx.telegram.sendMessage(ctx.message.chat.id, predefinedMessage, {
            message_thread_id: topicId
        });

        // Salva i dati del topic su FaunaDB
        const result = await client.query(
            q.Create(
                q.Collection('topics'), { data: { name: topicName, creator: ctx.from.first_name, link: topicLink, topicId: topicId } }
            )
        );
        console.log('Topic salvato su FaunaDB:', result);

    } catch (error) {
        console.error(error);
        await ctx.reply('Errore nella creazione del topic.');
    }
    return ctx.scene.leave();
};

// Crea una scena wizard
const createTopicWizard = new WizardScene('create-topic-wizard', step1, step2);

// Crea uno stage e registra la scena wizard
const stage = new Stage([createTopicWizard]);

bot.use(session());
bot.use(stage.middleware());

// Comando per avviare il wizard
bot.command('createtopic', (ctx) => {
    if (ctx.message.chat.type === 'supergroup' && ctx.message.message_thread_id === undefined) {
        ctx.scene.enter('create-topic-wizard');
    } else {
        ctx.reply('Puoi creare un topic solo dalla chat generale del gruppo.');
    }
});


/*
// Listener per i messaggi
bot.on('message', async(ctx) => {
    if (ctx.message.message_thread_id) {
        try {
            const result = await client.query(
                q.Get(
                    q.Match(q.Index('topic_by_id'), ctx.message.message_thread_id)
                )
            );
            const topicName = result.data.name;
            await ctx.reply(`Il nome del topic corrente è: ${topicName}`);
        } catch (error) {
            console.error(error);
            await ctx.reply('Errore nel recupero del nome del topic.');
        }
    }
});
*/






















// Comando per terminare la sessione di brainstorming
bot.command('stop_bs_xx', async(ctx) => {
    if (sessionOwner === null) {
        console.log("No owner: " + sessionOwner);
        await ctx.replyWithHTML('Nessuna sessione di Brainstorming XX è attualmente attiva.\n\n Se desideri avviare una sessione di Brainstorming XX clicca sul comando /start_bs_xx');
    } else if (await ctx.from.id === sessionOwner || await isAdmin(ctx)) {
        console.log("Owner: " + sessionOwner);
        console.log(ctx.from.id === sessionOwner);
        console.log("1 " + ctx.from.id + "2 " + sessionOwner.id)
        brainstormingActive = false;
        sessionOwner = null;
        await ctx.replyWithHTML('La sessione di Brainstorming XX è stata terminata.');
        if (pinnedMessageId) {
            await ctx.telegram.unpinChatMessage(ctx.chat.id, pinnedMessageId);
            pinnedMessageId = null;
        }
        await sendSummary(ctx);
    } else {
        console.log("Err owner: " + sessionOwner);
        const warningMessage = await ctx.replyWithHTML("Non sei autorizzato a terminare questa sessione di Brainstorming XX, per poter terminare questa sessione chiedi all' admin del gruppo o al creatore di questa sessione.");
        setTimeout(() => {
            ctx.deleteMessage(warningMessage.message_id).catch((err) => console.error('Errore nell\'eliminazione del messaggio di avviso:', err));
            ctx.deleteMessage(ctx.message.message_id).catch((err) => console.error('Errore nell\'eliminazione del messaggio dell\'utente:', err));
        }, 3000);
    }
});

// Funzione per salvare i tags validi in un file JSON 
function saveValidPrefixes(prefixes) {
    const filePath = path.join('/tmp/', 'validPrefixes.json');
    try {
        if (!fs.existsSync(filePath)) {
            console.log('File non trovato, creazione del file...');
            const defaultPrefixes = {
                validPrefixes: ["#gameplay", "#storia", "#grafica", "#dialoghi"]
            };
            fs.writeFileSync(filePath, JSON.stringify(defaultPrefixes, null, 2));
        }

        const data = JSON.stringify({ validPrefixes: prefixes }, null, 2);
        fs.writeFileSync(filePath, data);
        console.log('File aggiornato con successo:', filePath);
    } catch (error) {
        console.error('Errore durante la scrittura del file:', error);
    }
}




// Funzione per leggere i tags validi da un file JSON
function getValidPrefixes() {
    const filePath = path.join('/tmp/', 'validPrefixes.json');
    try {
        if (!fs.existsSync(filePath)) {
            console.log('File non trovato, creazione del file con prefissi di default...');
            const defaultPrefixes = {
                validPrefixes: ["#gameplay", "#storia", "#grafica", "#dialoghi"]
            };
            fs.writeFileSync(filePath, JSON.stringify(defaultPrefixes, null, 2));
        }

        const data = fs.readFileSync(filePath, 'utf8');
        const prefixes = JSON.parse(data);
        return prefixes.validPrefixes;
    } catch (error) {
        console.error('Errore durante la lettura del file:', error);
        return [];
    }
}




// Middleware per verificare i prefissi nei messaggi
bot.use(async(ctx, next) => {
    console.log(getValidPrefixes());
    if (brainstormingActive === true && ctx.message && ctx.message.text) {
        const validPrefixes = getValidPrefixes(); // [firstPrefix, secondPrefix, thirdPrefix, fourthPrefix];

        const botMentioned = ctx.message.entities && ctx.message.entities.some(entity => entity.type === 'mention' && ctx.message.text.substring(entity.offset, entity.offset + entity.length) === `@${ctx.botInfo.username}`);
        if (!validPrefixes.some(prefix => ctx.message.text.startsWith(prefix)) || ctx.message.text.startsWith('/') || botMentioned) {
            ctx.deleteMessage(ctx.message.message_id).catch((err) => console.error('Errore nell\'eliminazione del messaggio:', err));
            return;
        }
    }
    await next();
});




// Funzione per verificare se l'utente è un amministratore
async function isAdmin(ctx) {
    const member = await ctx.telegram.getChatMember(ctx.chat.id, ctx.from.id);
    return member.status === 'administrator' || member.status === 'creator';
}




// Comando per cambiare i prefissi
bot.command('set_tags_bs_xx', async(ctx) => {
    if (ctx.message.message_thread_id !== undefined && set_tags_active === true) {
        const args = ctx.message.text.split(' ').slice(1).join(' ').split(',');
        if (args.length !== 4) {
            await ctx.replyWithHTML('Devi specificare esattamente 4 tags. \n\n\n<code> © 2024-2025 Project XX </code>');
            return;
        }

        const newPrefixes = args.map(prefix => prefix.trim()).filter(prefix => prefix.startsWith('#') && prefix.length <= 15);
        if (newPrefixes.length !== args.length) {
            await ctx.replyWithHTML('Ogni tags deve essere preceduto da # e non più lungo di 15 lettere.\n\n\n<code> © 2024-2025 Project XX </code>');
            return;
        }

        saveValidPrefixes(newPrefixes);
        await ctx.reply(`Tags aggiornati: ${newPrefixes.join(', ')}`);
    } else if (set_tags_active === false) {
        await ctx.reply('Non puoi cambiare i tags mentre la sessione di Brain Storming XX è attiva.');
    } else {
        await ctx.replyWithHTML("Non puoi cambiare i tags all'interno del MCS, se hai dubbi sull'uso di questa direttiva clicca su /masterdir");
    }
});





/*

// Funzione per generare la classifica degli utenti
async function generateLeaderboard(ctx) {
    try {
        const userFiles = fs.readdirSync('/tmp/').filter(file => file.endsWith('.json') && file !== 'package.json' && file !== 'package-lock.json' && file !== 'validPrefixes.json');
        const userVotes = {};
        for (const file of userFiles) {
            try {
                const data = fs.readFileSync(path.join('/tmp', file));
                const userMessages = JSON.parse(data);
                const username = path.basename(file, '.json');
                userVotes[username] = userMessages.reduce((total, msg) => total + (msg.voti || 0), 0);
            } catch (err) { console.error(`Errore durante la lettura del file ${file}:`, err); }
        }
        const sortedUsers = Object.entries(userVotes).sort((a, b) => b[1] - a[1]);
        let leaderboard = 'Classifica generale Bs XX 🏆\n\n';
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
*/

/*


async function generateLeaderboard(ctx) {
    const client = new Client({
        secret: process.env.FAUNA_SECRET,
        query_timeout_ms: 60_000
    });

    try {
        // Query per ottenere tutti i voti degli utenti
        const result = await client.query(
            fql`
                Users.all()
                .map(msg => ({
                    userId: msg.userId,
                    voti: msg.voti,
                    username: msg.username
                }))
            `
        );

        const userVotes = {};


      console.log(result)

        // Calcola i voti totali per ogni utente
        result.data.data.forEach(doc => {
            const { userId, voti} = doc;
            if (!userVotes[userId]) {
                userVotes[userId] = 0;
            }
            userVotes[userId] += voti;
        });

        // Ordina gli utenti in base ai voti
        const sortedUsers = Object.entries(userVotes).sort((a, b) => b[1] - a[1]);
        let leaderboard = 'Classifica generale Bs XX 🏆\n\n';

        // Genera la stringa della classifica
        sortedUsers.forEach(([userId, votes, username], index) => {
            let rank;
            if (votes >= 1000) {
                rank = '<i>Mentore XX</i>';
            } else if (votes >= 500) {
                rank = '<i>Veterano XX</i>';
            } else if (votes >= 300) {
                rank = '<i>Esperto XX</i>';
            } else if (votes >= 200) {
                rank = '<i>Assistente</i>';
            } else if (votes >= 100) {
                rank = '<i>Apprendista Grado 1</i>';
            } else if (votes >= 50) {
                rank = '<i>Apprendista Grado 2</i>';
            } else {
                rank = '<i>Apprendista Grado 3</i>';
            }
            leaderboard += `${index + 1}. ${username}: ${votes} voti \n- ${rank}\n\n\n`;
        });

        // Invia la classifica all'utente
        await ctx.replyWithHTML(leaderboard + copyright);
    } catch (err) {
        console.error('Errore durante la generazione della classifica:', err);
        await ctx.replyWithHTML('Si è verificato un errore durante la generazione della classifica. Per favore, riprova più tardi. \n\n\n<code> © 2024-2025 Project XX </code>');
    } finally {
        client.close();
    }
}

*/


// 



/*

// Funzione per ottenere gli utenti con paginazione
async function getUsers(afterCursor) {
  const client = new Client({
    secret: process.env.FAUNA_SECRET,
    query_timeout_ms: 60_000
});
  
  const query = fql`
    Users.all()
    .map(msg => ({
      userId: msg.userId,
      voti: msg.voti,
      username: msg.username,
      ideaId: msg.ideaId,
      idea: msg.idea
    }))
    .pageSize(10)  // Specifica la dimensione della pagina se necessario
  `;

  const response = await client.query(
    afterCursor ? fql`Set.paginate(${afterCursor})` : query
  );

  const data = response.data.data;
  const nextCursor = response.data.after;

  console.log("Data:", data);
  console.log("Next cursor:", nextCursor);

  return { data, nextCursor };
}

// Funzione per ottenere tutti gli utenti
async function getAllUsers() {
  let allUsers = [];
  let afterCursor;

  do {
    const { data, nextCursor } = await getUsers(afterCursor);
    allUsers = allUsers.concat(data);
    afterCursor = nextCursor;
  } while (afterCursor);

  return allUsers;
}

async function generateLeaderboard(ctx) {
    const client = new Client({
        secret: process.env.FAUNA_SECRET,
        query_timeout_ms: 60_000
    });

    try {
        const allUsers = await getAllUsers();

        const userVotes = {};
        const userNames = {};

        console.log(allUsers); // Verifica i dati ricevuti

        // Calcola i voti totali per ogni utente
        allUsers.forEach(doc => {
            const { userId, voti, username } = doc;
            console.log(`User ID: ${userId}, Voti: ${voti}, Username: ${username}`); // Verifica i singoli documenti

            if (!userVotes[userId]) {
                userVotes[userId] = 0;
                userNames[userId] = username;
            }

            // Assicurati che i voti siano numeri
            userVotes[userId] += Number(voti);
        });

        // Ordina gli utenti in base ai voti
        const sortedUsers = Object.entries(userVotes).sort((a, b) => b[1] - a[1]);
        let leaderboard = 'Classifica generale Bs XX 🏆\n\n';

        // Genera la stringa della classifica
        sortedUsers.forEach(([userId, votes], index) => {
            let rank;
            if (votes >= 1000) {
                rank = '<i>Mentore XX</i>';
            } else if (votes >= 500) {
                rank = '<i>Veterano XX</i>';
            } else if (votes >= 300) {
                rank = '<i>Esperto XX</i>';
            } else if (votes >= 200) {
                rank = '<i>Assistente</i>';
            } else if (votes >= 100) {
                rank = '<i>Apprendista Grado 1</i>';
            } else if (votes >= 50) {
                rank = '<i>Apprendista Grado 2</i>';
            } else {
                rank = '<i>Apprendista Grado 3</i>';
            }
            leaderboard += `${index + 1}. ${userNames[userId]}: ${votes} voti \n- ${rank}\n\n\n`;
        });

        // Invia la classifica all'utente
        await ctx.replyWithHTML(leaderboard + '<code> © 2024-2025 Project XX </code>');
    } catch (err) {
        console.error('Errore durante la generazione della classifica:', err);
        await ctx.replyWithHTML('Si è verificato un errore durante la generazione della classifica. Per favore, riprova più tardi. \n\n\n<code> © 2024-2025 Project XX </code>');
    } finally {
        client.close();
    }
}

*/







// 





// Funzione per ottenere gli utenti con paginazione
async function getUsers(afterCursor) {
  const client = new Client({
    secret: process.env.FAUNA_SECRET,
    query_timeout_ms: 60_000
  });

  const query = fql`
    Users.all()
    .map(msg => ({
      userId: msg.userId,
      voti: msg.voti,
      username: msg.username,
      ideaId: msg.ideaId,
      idea: msg.idea
    }))
    .pageSize(10)
  `;

  const response = await client.query(
    afterCursor ? fql`Set.paginate(${afterCursor})` : query
  );

  const data = response.data.data;
  const nextCursor = response.data.after;

  return { data, nextCursor };
}

// Funzione per ottenere tutti gli utenti
async function getAllUsers() {
  let allUsers = [];
  let afterCursor;

  do {
    const { data, nextCursor } = await getUsers(afterCursor);
    allUsers = allUsers.concat(data);
    afterCursor = nextCursor;
  } while (afterCursor);

  return allUsers;
}

// Funzione per generare la classifica
async function generateLeaderboard() {
  const client = new Client({
    secret: process.env.FAUNA_SECRET,
    query_timeout_ms: 60_000
  });

  try {
    const allUsers = await getAllUsers();

    const userVotes = {};
    const userNames = {};

    allUsers.forEach(doc => {
      const { userId, voti, username } = doc;

      if (!userVotes[userId]) {
        userVotes[userId] = 0;
        userNames[userId] = username;
      }

      userVotes[userId] += Number(voti);
    });

    const sortedUsers = Object.entries(userVotes).sort((a, b) => b[1] - a[1]);
    return sortedUsers.map(([userId, votes], index) => {
      let rank;
      if (votes >= 1000) {
        rank = 'Mentore XX';
      } else if (votes >= 500) {
        rank = 'Veterano XX';
      } else if (votes >= 300) {
        rank = 'Esperto XX';
      } else if (votes >= 200) {
        rank = 'Assistente';
      } else if (votes >= 100) {
        rank = 'Apprendista Grado 1';
      } else if (votes >= 50) {
        rank = 'Apprendista Grado 2';
      } else {
        rank = 'Apprendista Grado 3';
      }
      return { userId, username: userNames[userId], votes, rank, position: index + 1 };
    });
  } catch (err) {
    console.error('Errore durante la generazione della classifica:', err);
    throw err;
  } finally {
    client.close();
  }
}

// Funzione per promuovere un membro del gruppo a amministratore
async function promoteToAdmin(ctx, userId) {
  await ctx.telegram.promoteChatMember(ctx.chat.id, userId, {
    can_change_info: true,
    can_post_messages: true,
    can_edit_messages: true,
    can_delete_messages: true,
    can_invite_users: true,
    can_restrict_members: true,
    can_pin_messages: true,
    can_promote_members: true
  });
}

// Funzione per impostare il titolo personalizzato di un amministratore
async function setCustomTitle(ctx, userId, rank) {
  await ctx.telegram.setChatAdministratorCustomTitle(ctx.chat.id, userId, rank);
}

// Funzione per aggiornare i ruoli degli utenti
async function updateRoles(ctx, leaderboard, creatorId) {
  for (const user of leaderboard) {
    const { userId, username, rank } = user;

    // Escludi il creatore del gruppo
    if (userId === creatorId) continue;

    try {
      // Promuovi l'utente a amministratore
      await promoteToAdmin(ctx, userId);
      // Imposta il titolo personalizzato
      await setCustomTitle(ctx, userId, rank);
      console.log(`Ruolo di ${username} aggiornato a ${rank}`);
    } catch (err) {
      console.error(`Errore nell'aggiornare il ruolo di ${username}:`, err);
    }
  }
}

// Comando per mostrare la classifica e aggiornare i ruoli
bot.command('leaderboard', async (ctx) => {
  try {
    // Ottieni gli amministratori del gruppo
    const administrators = await ctx.telegram.getChatAdministrators(ctx.chat.id);

    // Trova il creatore del gruppo
    const creator = administrators.find(admin => admin.status === 'creator');
    const creatorId = creator.user.id;
    
console.log("ID CREATORE 1 "  + creatorId);
    console.log "ID CREATORE FROM " + creator.from.id)
    const leaderboard = await generateLeaderboard();
    await updateRoles(ctx, leaderboard, creatorId);

    let leaderboardMessage = 'Classifica generale Bs XX 🏆\n\n';
    leaderboard.forEach(user => {
      leaderboardMessage += `${user.position}. ${user.username}: ${user.votes} voti \n- ${user.rank}\n\n\n`;
    });

    await ctx.replyWithHTML(leaderboardMessage + '<code> © 2024-2025 Project XX </code>');
  } catch (err) {
    await ctx.replyWithHTML('Si è verificato un errore durante la generazione della classifica. Per favore, riprova più tardi. \n\n\n<code> © 2024-2025 Project XX </code>');
  }
});










//














bot.command('leaderboard_xx', async(ctx) => { await generateLeaderboard(ctx); });


bot.use(async(ctx, next) => { if (ctx.message && ctx.message.text && ctx.message.text.toLowerCase().includes('classifica') && !ctx.message.text.startsWith('/')) { await generateLeaderboard(ctx); } else { await next(); } });





bot.command('start_bs_xx', async(ctx) => {
    if (canOpenSession === true) {
        await startBrainstorming(ctx);

    }
});


const badWords = ['parola1']; // Aggiungere file json BadWords.json

function containsBadWords(text) {
    return badWords.some(word => text.toLowerCase().includes(word));
}

bot.on('text', async(ctx) => {


    const validPrefixes = getValidPrefixes();
    const firstPrefix = validPrefixes.length > 0 ? validPrefixes[0] : null;
    const secondPrefix = validPrefixes.length > 1 ? validPrefixes[1] : null;
    const thirdPrefix = validPrefixes.length > 2 ? validPrefixes[2] : null;
    const fourthPrefix = validPrefixes.length > 3 ? validPrefixes[3] : null;



    if (ctx.message.text.toLowerCase().includes('brain storming xx') && ctx.message.entities) {
        const botWasMentioned = ctx.message.entities.some(entity => entity.type === 'mention' && ctx.message.text.substring(entity.offset, entity.offset + entity.length) === `@${ctx.botInfo.username}`);
        if (botWasMentioned && await isAdmin(ctx) && canOpenSession === true) {
            await startBrainstorming(ctx);
        }
    } else if (brainstormingActive === true) {
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




            const oldTimestamp = new Date().toLocaleString();

            const date = new Date(oldTimestamp);
            date.setHours(date.getHours() + 1);

            const timestamp = date.toLocaleString();





            const messageData = { hashtag: prefix, userId: ctx.from.id,  messaggio: text, voti: 0, id: ctx.message.message_id, autore: username, timestamp: timestamp };
            ideas.push(messageData);




            if (!messageCounts[username]) {
                messageCounts[username] = {};
                validPrefixes.forEach(prefix => { messageCounts[username][prefix] = 0; });
            }
            messageCounts[username][prefix]++;




//await saveMessageData(ctx, prefix, text, timestamp);
  
          




    // 



const client = new Client({
    secret: process.env.FAUNA_SECRET,
    query_timeout_ms: 60_000
});


        // Query per creare un nuovo utente
        const saveUsersIdeaQuery = fql`
            Users.create({
                userId: ${ctx.from.id},
                username: ${username},
                ideaId: ${ctx.message.message_id},
                idea: ${text},
                hashtag: ${prefix},
                voti: 0
            }) {
                userId,
                username,
                ideaId,
                idea,
                hashtag,
                voti
            }
        `;

      
            try {
    const response = await client.query(saveUsersIdeaQuery);
    console.log("salvataggio: " + response);
} catch (error) {
    console.error("Errore durante l'aggiunta dell'idea:", error);
} finally {
    client.close();
            }

          







          

/*

const client = new Client({
    secret: process.env.FAUNA_SECRET,
    query_timeout_ms: 60_000
});

try {
    // Query per trovare l'utente
    const userQuery = fql`
        Users.where(.userId == ${ctx.from.id}).first()
    `;
    const user = await client.query(userQuery);


  console.log(user)
    console.log(user.data);
  console.log(user.data.id)
  

    if (user == null) {
        // Query per creare un nuovo utente
        const saveUsersIdeaQuery = fql`
            Users.create({
                userId: ${ctx.from.id},
                username: ${username},
                hashtag: ${prefix},
                idea: ${text},
                voti: 0
            }) {
                userId,
                username,
                hashtag,
                idea,
                voti
            }
        `;

        try {
            const response = await client.query(saveUsersIdeaQuery);
            console.log('Dati autore salvati:', response);
        } catch (error) {
            console.error('Errore nel salvataggio dei dati autore:', error);
        }
    }
} catch (error) {
    console.error('Errore durante la ricerca dell\'utente:', error);
} finally {
    client.close();
}
          


          
*/



            // Salva il messaggio nel file JSON dell'utente
            const filePath = `/tmp/${username}.json`;
            let userMessages = [];
            if (fs.existsSync(filePath)) {
                const data = fs.readFileSync(filePath);
                userMessages = JSON.parse(data);
            }
            userMessages.push(messageData);
            fs.writeFileSync(filePath, JSON.stringify(userMessages, null, 2));

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

let userId = args[1];


              
///


              /*

const client = new Client({
    secret: process.env.FAUNA_SECRET,
    query_timeout_ms: 60_000
});

              let parsingArgs = parseInt(args[1])
              
        // Query per ottenere i dati dell'utente tramite id
        const getUsersQuery = fql`
            Users.where(.userId == ${parsingArgs} ) {
            id,
                userId,
                username,
                ideaId,
                idea,
                hashtag,
                voti
            }
        `;
  
            try {
    const response = await client.query(getUsersQuery);
              
        const data = response.data.data

              let message = '';

message += `<b>Utente:</b> ${data[0].username.replace(/\s+/g, ' ')}\n\n<b>Idee totali:</b> ${data.length}\n\n`;

data.forEach(item => {
  message += `


<i>${item.idea}</i>

<pre>
  • ID: ${item.ideaId}
  • Tag: ${item.hashtag}
  • Voti: ${item.voti}
  
</pre>`;
});

// Invia il messaggio completo
ctx.replyWithHTML(message + copyright);

              
} catch (error) {
    console.error("non ci sono dati per l'utente:", error);
} finally {
    client.close();
            }
*/






async function getUsers(parsingArgs, afterCursor) {
  
  const client = new Client({
    secret: process.env.FAUNA_SECRET,
    query_timeout_ms: 60_000
});
  
  const query = fql`
    Users.where(.userId == ${parsingArgs}) {
      id,
      userId,
      username,
      ideaId,
      idea,
      hashtag,
      voti
    }
  `;

  const response = await client.query(
    afterCursor ? fql`Set.paginate(${afterCursor})` : query
  );

  const data = response.data.data;
  const nextCursor = response.data.after;

  console.log("Data:", data);
  console.log("Next cursor:", nextCursor);

  return { data, nextCursor };
}

async function getAllUserIdeas(parsingArgs) {
  let allIdeas = [];
  let afterCursor;

  do {
    const { data, nextCursor } = await getUsers(parsingArgs, afterCursor);
    allIdeas = allIdeas.concat(data);
    afterCursor = nextCursor;
  } while (afterCursor);

  return allIdeas;
}



          /*
       async function generateUserIdeas(ctx, args) {
         
    const client = new Client({
    secret: process.env.FAUNA_SECRET,
    query_timeout_ms: 60_000
});

    let parsingArgs = parseInt(args[1]);

    try {
        const allIdeas = await getAllUserIdeas(parsingArgs);

        let message = '';

        // Aggiungi l'intestazione una sola volta
        message += `<b>Utente:</b> ${allIdeas[0].username.replace(/\s+/g, ' ')}\n\n<b>Idee totali:</b> ${allIdeas.length}\n\n`;

        allIdeas.forEach(item => {
            message += `
<i>${item.idea}</i>

<pre>
  • ID: ${item.ideaId}
  • Tag: ${item.hashtag}
  • Voti: ${item.voti}
</pre>`;
        });

        // Invia il messaggio completo
        await ctx.replyWithHTML(message + copyright);

    } catch (error) {
        console.error("Non ci sono dati per l'utente:", error);
        await ctx.replyWithHTML('Si è verificato un errore durante il recupero dei dati. Per favore, riprova più tardi.');
    } finally {
        client.close();
    }
       }       
              
generateUserIdeas(ctx, args)

*/

              const client = new Client({
    secret: process.env.Fauna_SECRET,
    query_timeout_ms: 60_000
});

let parsingArgs = parseInt(args[1]);

try {
    const allIdeas = await getAllUserIdeas(parsingArgs);

    let message = '';

    // Aggiungi l'intestazione una sola volta
    message += `<b>Idea~Chain</b> 💡\n\n\n<b>Utente:</b> ${allIdeas[0].username.replace(/_/g, ' ')}\n\n<b>Idee totali:</b> ${allIdeas.length}\n\n`;

    allIdeas.forEach(item => {
        message += `
<i>${item.idea}</i>

<pre>
  • ID: ${item.ideaId}
  • Tag: ${item.hashtag}
  • Voti: ${item.voti}
  
</pre>`;
    });

    // Invia il messaggio completo
    await ctx.replyWithHTML(message + copyright);

} catch (error) {
    console.error("Non ci sono dati per l'utente:", error);
    await ctx.replyWithHTML('Si è verificato un errore durante il recupero dei dati. Per favore, riprova più tardi.');
} finally {
    client.close();
}


              
              

              

              
             username = username.replace(/\s+/g, '_'); // Sostituisce gli spazi con _
                const filePath = `/tmp/${username}.json`;
                if (fs.existsSync(filePath)) {
                    const data = fs.readFileSync(filePath);
                    const userMessages = JSON.parse(data);
                    let response = `Idee totali inviate da ${username}: ${userMessages.length}\n\n`;
                    userMessages.forEach(msg => {
                      response += `Tag: ${msg.hashtag}\nIdea: ${msg.messaggio}\nVoti: ${msg.voti}\nTimestamp: ${msg.timestamp}\n\n`;
                    
                    }); 
                  ctx.replyWithHTML(response + copyright); 

                  
                } else {
                    ctx.reply(`c`);
                }
            }  else {
                ctx.reply('c');
        } 
        }
    }
});






/*

bot.action(/vote_(\d+)/, async(ctx) => {
    try {
        const ideaId = parseInt(ctx.match[1]);
        const idea = ideas.find(i => i.id === ideaId);
        const userId = ctx.from.id;

        console.log("I " + idea.autore + "U " + ctx.from.first_name);
        console.log(idea.autore === ctx.from.first_name);




      
        if (idea) {
            if (idea.autore === ctx.from.first_name) {
                await ctx.answerCbQuery('Non puoi votare per la tua idea.');
              await saveVotes(ctx, ideaId, idea.voti);
                return;
            }

            if (!idea.voters) {
                idea.voters = new Set();
            
            }

            if (!idea.voters.has(userId)) {
                idea.voti++;
                idea.voters.add(userId);


              

                // Aggiorna il file JSON dell'utente
                const filePath = `/tmp/${idea.autore}.json`;

              
                if (fs.existsSync(filePath)) {
                    const data = fs.readFileSync(filePath);
                    const userMessages = JSON.parse(data);
                    const messageIndex = userMessages.findIndex(msg => msg.id === ideaId);
                    if (messageIndex !== -1) {
                        userMessages[messageIndex].voti = idea.voti;
                      await saveVotes(ctx, ideaId, idea.voti);
                        fs.writeFileSync(filePath, JSON.stringify(userMessages, null, 2));
                    }
                }

                await ctx.answerCbQuery(`Hai votato per l'idea di ${idea.autore}: ${idea.messaggio}`);
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


\*


//

/*

bot.action(/vote_(\d+)/, async (ctx) => {
  const client = new Client({
    secret: process.env.FAUNA_SECRET,
    query_timeout_ms: 60_000
  }); 

  try {
    const ideaId = parseInt(ctx.match[1]);
    if (isNaN(ideaId)) {
      await ctx.answerCbQuery('ID idea non valido.');
      return;
    }

    const idea = ideas.find(i => i.id === ideaId);
    if (!idea) {
      await ctx.answerCbQuery('Idea non trovata.');
      return;
    }

    const userId = ctx.from.id.toString(); // Convert userId to string
    console.log(`Idea: ${idea.autore}, Utente: ${ctx.from.first_name}`);

    if (idea.autore === ctx.from.first_name) {
      await ctx.answerCbQuery('Non puoi votare per la tua idea.');
      return;
    }

    if (!idea.voters) {
      idea.voters = new Set();
    }

    if (!idea.voters.has(userId)) {
      idea.voti++;
      idea.voters.add(userId);

      const filePath = `/tmp/${idea.autore}.json`;
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        const userMessages = JSON.parse(data);
        const messageIndex = userMessages.findIndex(msg => msg.id === ideaId);
        if (messageIndex !== -1) {
          userMessages[messageIndex].voti = idea.voti;
          fs.writeFileSync(filePath, JSON.stringify(userMessages, null, 2));
        }
      }

      // Cast to Any type
  /*    const saveVotesQuery = fql`
        Messages.create({
            ideaId: ${ideaId} ,
            userId : ${userId},
          voti: ${idea.voti}
        }) {
       id,
       ideaId,
       userId,
       voti
        }
      `;

      try {
        const response = await client.query(saveVotesQuery);
        console.log('Voti salvati:', response);
      } catch (error) {
        console.error('Errore nel salvataggio dei voti:', error);
      }
      


      try {
      await ctx.answerCbQuery(`Hai votato per l'idea di ${idea.autore}: ${idea.messaggio}`);
    } else {
      await ctx.answerCbQuery('Hai già votato per questa idea.');
    }
  } catch (err) {
    console.error('Errore durante l\'azione di voto:', err);
    await ctx.answerCbQuery('Si è verificato un errore durante il voto. Per favore, riprova più tardi.');
  } finally {
    client.close();
  }
});

*/

  

//


bot.action(/vote_(\d+)/, async(ctx) => {
    try {
        const ideaId = parseInt(ctx.match[1]);
        const idea = ideas.find(i => i.id === ideaId);
        const userId = ctx.from.id;

        // Sostituisci il simbolo _ con uno spazio
        const ideaAutore = idea.autore.replace(/_/g, ' ');
        const userFirstName = ctx.from.first_name.replace(/_/g, ' ');

        console.log("I " + ideaAutore + " U " + userFirstName);
        console.log(ideaAutore === userFirstName);

        if (idea) {
            if (ideaAutore === userFirstName) {
                await ctx.answerCbQuery('Non puoi votare per la tua idea.');
                return;
            }

            if (!idea.voters) {
                idea.voters = new Set();
            }

            if (!idea.voters.has(userId)) {
                idea.voti++;
                idea.voters.add(userId);






//update idea



const client = new Client({
    secret: process.env.FAUNA_SECRET,
    query_timeout_ms: 60_000
});

              try {
    // Query per trovare l'utente e poi aggiorna l'idea +1

              console.log (ideaId)

              //let lastIdea = 1609
    const userQuery = fql`
        Users.where(.ideaId == ${ideaId}) //ideaId
    `;
    const user = await client.query(userQuery);

    console.log(user.data.data);
  console.log( "idea catturata " + user.data.data[0].id);

   if (user.data.data[0].ideaId == ideaId) {
        // Query per creare un nuovo utente
        const saveUsersIdeaQuery = fql`
          Users.byId(${user.data.data[0].id})!.update({voti: ${idea.voti}}){    
          id, 
          voti
          
          }
            `

        try {
            const response = await client.query(saveUsersIdeaQuery);
            console.log('Update dati autore effettuato con successo:', response);
        } catch (error) {
            console.error("Errore nell'update dei dati dell'autore:", error);
        }
    }
} catch (error) {
    console.error('Errore durante la ricerca dell\'utente:', error);
}  finally {
    client.close();
}


// TEST



  
  try {
    // Ottieni gli amministratori del gruppo
    const administrators = await ctx.telegram.getChatAdministrators(ctx.chat.id);

    // Trova il creatore del gruppo
    const creator = administrators.find(admin => admin.status === 'creator');
    const creatorId = creator.user.id;

    const leaderboard = await generateLeaderboard();
    await updateRoles(ctx, leaderboard, creatorId);

    
    
  } catch (err) {
    await ctx.replyWithHTML('Si è verificato un errore durante la generazione della classifica. Per favore, riprova più tardi. \n\n\n<code> © 2024-2025 Project XX </code>');
  }





//








              



              

                // Aggiorna il file JSON dell'utente
                const filePath = `/tmp/${idea.autore}.json`;
                if (fs.existsSync(filePath)) {
                    const data = fs.readFileSync(filePath);
                    const userMessages = JSON.parse(data);
                    const messageIndex = userMessages.findIndex(msg => msg.id === ideaId);
                    if (messageIndex !== -1) {
                        userMessages[messageIndex].voti = idea.voti;
                        fs.writeFileSync(filePath, JSON.stringify(userMessages, null, 2));
                    }
                }

                await ctx.answerCbQuery(`Hai votato per l'idea di ${idea.autore}: ${idea.messaggio}`);
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

        


//


async function startBrainstorming(ctx) {
    canOpenSession = false;
    set_tags_active = false;

    const validPrefixes = getValidPrefixes();
    const firstPrefix = validPrefixes.length > 0 ? validPrefixes[0] : null;
    const secondPrefix = validPrefixes.length > 1 ? validPrefixes[1] : null;
    const thirdPrefix = validPrefixes.length > 2 ? validPrefixes[2] : null;
    const fourthPrefix = validPrefixes.length > 3 ? validPrefixes[3] : null;

    try {
        if (sessionOwner === null) {
            console.log("pre: " + sessionOwner);
            sessionOwner = ctx.from.id;
            console.log("start: " + sessionOwner);
            brainstormingActive = true;
            messageCounts = {}; // Resetta i contatori dei messaggi
            ideas = []; // Resetta le idee


            const message = await ctx.replyWithHTML('<b>Sessione di BrainStorming XX per Pokémon XX ♀️</b>')


            await ctx.replyWithHTML(`<i> Avviata da ${ctx.from.first_name}</i>


Benvenuti zii! È il momento di liberare la vostra immaginazione e contribuire con delle idee straordinarie per Pokémon XX. Fino allo scadere del tempo, potrete inviare in questo gruppo dei messaggi testuali con qualsiasi vostra idea. Ci sono solo due regole: \n\n1. Prima di ogni messaggio, aggiungete il tag corretto per l’argomento. \n\n2. La lunghezza dei messaggi è fissata a un massimo di 20 parole e 80 lettere, quindi non dovrete scrivere dei poemi, l'idea deve essere breve e concisa! \n\n

Ecco i tags che potrete utilizzare: 

${firstPrefix} + [il tuo messaggio]  
${secondPrefix} + [il tuo messaggio]
${thirdPrefix} + [il tuo messaggio] 
${fourthPrefix} + [il tuo messaggio] 

Non vedo l’ora di vedere le vostre idee folli!💡


Nota: la sessione verrà automaticamente terminata se non saranno inviate nuove idee.




<code> © 2024-2025 Project XX </code>
`);

            // const message = await ctx.reply('La sessione di Brainstorming XX è ora attiva!');
            pinnedMessageId = message.message_id;
            await ctx.telegram.pinChatMessage(ctx.chat.id, pinnedMessageId);
        } else {
            ctx.reply('Solo gli amministratori possono padroneggiare il potere di Brain Storming XX.');
        }
    } catch (err) {
        console.error('Errore durante l\'avvio della sessione di brainstorming:', err);
        await ctx.reply('Si è verificato un errore durante l\'avvio della sessione di brainstorming. Per favore, riprova più tardi.');
    }
}






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
        await ctx.telegram.unpinAllChatMessages(ctx.chat.id);
    } else {
        await ctx.telegram.unpinAllChatMessages(ctx.chat.id);
        const data = new Date().toLocaleDateString()
        let summary = `<b>Risultati Brain Storming XX</b> 📊\n\nData sessione: ${data} \n\n\n\n`;
        for (const [username, counts] of Object.entries(messageCounts)) {
            summary += `👤 ${username}:\n`;
            for (const [prefix, count] of Object.entries(counts)) {
                summary += `  ${prefix}: ${count}\n`;
            }
            summary += '\n';
        }
        summary += '\n\n🔥 Classifica idee 🔥\n\n';
        ideas.sort((a, b) => b.voti - a.voti);
        ideas.forEach(idea => {
            summary += `\n\n💡 ${idea.messaggio} (<i>di ${idea.autore}</i>) \n• Voti: ${idea.voti}\n\n`;
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
