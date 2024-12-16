

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
// document.getElementById('message').style.display = "none";
// document.getElementById('user_card').style.display = "block";






                
            } else {
                messageElement.textContent = 'Token non valido. Autenticazione fallita.';
                messageElement.classList.add('error');
            }
        } else {
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

  
  
  
  
  
  function toggleVisibility() {
            const masked = document.querySelector('.hidden-code .masked');
            const unmasked = document.querySelector('.hidden-code .unmasked');
            const eyeIcon = document.getElementById('eyeIcon');
            if (masked.style.display === 'none') {
                masked.style.display = 'inline';
                unmasked.style.display = 'none';
                eyeIcon.classList.remove('fa-eye');
                eyeIcon.classList.add('fa-eye-slash');
            } else {
                masked.style.display = 'none';
                unmasked.style.display = 'inline';
                eyeIcon.classList.remove('fa-eye-slash');
                eyeIcon.classList.add('fa-eye');
            }
        }
  
  
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









