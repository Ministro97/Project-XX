

function getTelegramUserId() {
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe) {
        return window.Telegram.WebApp.initDataUnsafe.user.id;
    }
    return null;
}


const userId = getTelegramUserId();
    if (userId) {
        document.body.innerHTML += `<p>ID Utente: ${userId}</p>`;
    } else {
        document.body.innerHTML += `<p>Impossibile ottenere l'ID utente.</p>`;
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
