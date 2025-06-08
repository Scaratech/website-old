const messages = [
    "🌸 WONDERHOY!",
    "⚡ 100% Monster powered",
    "🎶 oo ee oo"
];

async function getCount() {
    const req = await fetch("/count");
    const res = await req.json();

    return res.count;
}

document.addEventListener("DOMContentLoaded", async () => {
    const status = document.querySelector(".status");
    const vistor = document.querySelector(".vistor");
    const message = messages[Math.floor(Math.random() * messages.length)];
    const count = await getCount();

    status.textContent = message;
    vistor.textContent += `🔢 You are the: ${count}th visitor!`;
});

async function music() {
    const widget = document.querySelector('.music-widget');
    const request = await fetch('/music');
    const response = await request.json();

    widget.innerHTML = `
    <img src="${response.image}" alt="Album Art" />
    <div class="info">
      <p class="track">${response.nowPlaying ? '🎵 Now playing' : 'Last played'}:</p>
      <p class="title"><a href="${response.url}" target="_blank" rel="noopener noreferrer">${response.title}</a></p>
      <p class="artist">${response.artist}</p>
    </div>
  `;
}

music();
setInterval(music, 5_000);