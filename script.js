

function getTelegramUserId() {
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe) {
        return window.Telegram.WebApp.initDataUnsafe.user.id;
    }
    return null;
}


const userId = getTelegramUserId();
    if (userId) {


function getFirstName(fullName) {
    return fullName.split(' ')[0];
}

        
        document.getElementById("cardHolder").textContent = getFirstName(window.Telegram.WebApp.initDataUnsafe.user.first_name);
        document.getElementById("avatar").src = window.Telegram.WebApp.initDataUnsafe.user.photo_url;
        document.getElementById("userName").textContent = window.Telegram.WebApp.initDataUnsafe.user.first_name;
        document.getElementById("userId").textContent = userId;
        document.getElementById("deviceId").textContent = sessionStorage.getItem('deviceId');
        document.getElementById("key").textContent = sessionStorage.getItem('authToken');
    } else {
        document.body.getElementById("userId").textContent = ` /`;
    }








const buttons = document.querySelectorAll(".card-buttons button");
const sections = document.querySelectorAll(".card-section");
const card = document.querySelector(".card");

const handleButtonClick = e => {
    const targetSection = e.target.getAttribute("data-section");
    const section = document.querySelector(targetSection);

    targetSection !== "#about" ?
    card.classList.add("is-active") :
    card.classList.remove("is-active");

    card.setAttribute("data-state", targetSection);

    sections.forEach(s => s.classList.remove("is-active"));
    buttons.forEach(b => b.classList.remove("is-active"));

    e.target.classList.add("is-active");
    section.classList.add("is-active");
};

buttons.forEach(btn => {
    btn.addEventListener("click", handleButtonClick);
});





const messageElement = document.getElementById('message');
        const token = sessionStorage.getItem('authToken');

        if (token) {
            // Verifica il token
            if (token) { // Se il token esiste, l'autenticazione è riuscita

                window.Telegram.WebApp.ready();
document.getElementById('message').remove();
document.getElementById('socket').style.display = "block";






                
            } else {
                
                document.getElementById('user_card').style.display = "none";
                document.getElementById('user_card').remove();
                messageElement.textContent = 'Token non valido. Autenticazione fallita.';
                messageElement.classList.add('error');
            }
        } else {
           document.getElementById('user_card').style.display = "none";
            document.getElementById('user_card').remove();
            
            messageElement.textContent = 'Nessun token fornito. Autenticazione fallita.';
            messageElement.classList.add('error');
        }
















document.querySelectorAll('.card-contact').forEach(function(contact) {
  contact.addEventListener('mouseover', function() {
    const tooltip = this.querySelector('.tooltip');
    tooltip.style.display = 'block';
    tooltip.style.opacity = '1';

    setTimeout(function() {
      tooltip.style.opacity = '0';
      setTimeout(function() {
        tooltip.style.display = 'none';
      }, 500); // Tempo per il fade out
    }, 1000); // Tempo di visualizzazione del tooltip
  });
});

  
  
  
  
  
  
  
  document.addEventListener('DOMContentLoaded', (event) => {
  const card = document.getElementById('card');

  window.addEventListener('deviceorientation', (event) => {
    const { beta, gamma } = event; // beta: tilt front-back, gamma: tilt left-right

    // Limita i valori per evitare movimenti eccessivi
    const maxTilt = 15;
    const tiltX = Math.min(Math.max(gamma, -maxTilt), maxTilt);
    const tiltY = Math.min(Math.max(beta, -maxTilt), maxTilt);

    // Applica la trasformazione alla carta
    card.style.transform = `rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;
  });
});





/////



import { Client, fql } from 'https://cdn.jsdelivr.net/npm/fauna@latest/dist/browser/index.js';



let parsingArgs = userId;



async function getData(parsingArgs, afterCursor) {
  const client = new Client({
    secret: 'fnAFxtsXDxAA0LibsGU247WuElz_sQg8quL3TxB7',
    query_timeout_ms: 60_000
  });

  const query = fql`
    Users.where(.userId == ${parsingArgs}) {
      id,
      userId,
      xxCoin,
      voti,
      ideaId
    }
  `;

  const response = await client.query(afterCursor ? fql`Set.paginate(${afterCursor})` : query);
  const data = response.data.data;
  const nextCursor = response.data.after;

  const totalCoins = data.reduce((sum, user) => sum + user.xxCoin, 0);
  const totalVotes = data.reduce((sum, user) => sum + user.voti, 0);
  const uniqueIdeas = new Set(data.map(user => user.ideaId));

  return { data, nextCursor, totalCoins, totalVotes, uniqueIdeas };
}

async function getAllUserData(parsingArgs) {
  let allCoins = [], afterCursor, totalCoins = 0, totalVotes = 0, uniqueIdeas = new Set();

  do {
    const { data, nextCursor, totalCoins: pageCoins, totalVotes: pageVotes, uniqueIdeas: pageIdeas } = await getData(parsingArgs, afterCursor);
    allCoins = allCoins.concat(data);
    totalCoins += pageCoins;
    totalVotes += pageVotes;
    pageIdeas.forEach(idea => uniqueIdeas.add(idea));
    afterCursor = nextCursor;
  } while (afterCursor);

  return { allCoins, totalCoins, totalVotes, uniqueIdeas: uniqueIdeas.size };
}

function displayTotal(totalCoins, totalVotes, uniqueIdeas) {
  const displayElement = document.getElementById('balance');
  const margins = ['175px', '170px', '165px', '160px', '150px', '130px', '115px'];
  const marginLeft = margins[Math.min(totalCoins.toString().length - 1, margins.length - 1)];

  displayElement.style.marginLeft = marginLeft;
  displayElement.textContent = `${totalCoins}𒉽`;
  document.getElementById("idee").textContent = uniqueIdeas
  
  
  document.getElementById("voti").textContent = totalVotes;
  
  
  


        function assignRank(votes) {
            var rankElement = document.getElementById('rank');

if (Number(userId) === 641846047 ) {
rankElement.textContent = "Manager"
}

            else {
            
            var rank = votes < 50 ? "Novello" :
                       votes < 100 ? "Ideista" :
                       votes < 200 ? "Innovatore" :
                       votes < 500 ? "Mentore" :
                       votes < 1000 ? "Pioniere" :
                       votes < 2000 ? "Visionario" : "Guru";


            
            rankElement.textContent = rank;

            }
        }

        assignRank(totalVotes);
    
  
  
  
  
  
  
}

async function main() {
  try {
    const { allCoins, totalCoins, totalVotes, uniqueIdeas } = await getAllUserData(parsingArgs);
    displayTotal(totalCoins, totalVotes, uniqueIdeas);
    document.getElementById('socket').style.display = 'none';
   
    document.getElementById('card_user').style.display = 'flex';
  } catch (error) {
    document.getElementById('errorDisplay').textContent = `Errore: ${error.message}`;
    document.getElementById('socket').style.display = 'none';
    document.getElementById('card_user').style.display = 'flex';
  }
}

main();

  




