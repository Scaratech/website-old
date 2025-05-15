const messages = [
    "🌸 Mizuki's #1 fan",
    "🌸 WONDERHOY!",
    "⚡ 100% Monster powered",
    "🎵 D1 N25 Glazer",
    "🎶 oo ee oo"
];

document.addEventListener("DOMContentLoaded", () => {
    const status = document.querySelector(".status");
    const message = messages[Math.floor(Math.random() * messages.length)];

    status.textContent = message;
});