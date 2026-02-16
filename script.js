// Story-Schritte + Dauer in Millisekunden.
// Summe ≈ 28.000 ms (28 Sekunden)
const steps = [
  {
    type: "intro",
    ms: 3200,
    title: "Sara",
    text: "Ich wollte dir etwas geben,\\n\n– Adel"
  },
  {
    type: "text",
    ms: 3200,
    text:
`Liebe das alles an dir :

Dein Selbstbewusstsein.
Dein Lächeln.
Wie du deine Ziele verfolgst.
Dass du weißt, was du im Leben willst.

 du bist unfassbar hübsch junge.`
  },
  { type: "image", ms: 2000, src: "img/Sara1.jpeg", alt: "Sara 1" },

  {
    type: "text",
    ms: 2800,
    text:
`Es ist jedes Mal süß,
wenn du sagst „Ich bin nicht müde“
und 5 Minuten später bist am schlafen.`
  },
  { type: "image", ms: 2000, src: "img/Sara2.jpeg", alt: "Sara 2" },

  {
    type: "text",
    ms: 2800,
    text:
`08.02.2026 war einer der besten Tage
in meinem Leben.

Ich habe mich so gefreut,
den ganzen Tag mit dir zu sein.`
  },
  { type: "image", ms: 2000, src: "img/Sara3.jpeg", alt: "Sara 3" },

  {
    type: "text",
    ms: 2600,
    text:
`26.01.2026

Wir haben so viel gelacht.
Und ja hab gefeirt wie du auf fresse geflogen bist
es war einfach voll der schöne tag Opfer`
  },
  { type: "image", ms: 2000, src: "img/Sara4.png", alt: "Sara 4" },

  {
    type: "text",
    ms: 3200,
    text:
`Es tut mir leid,
dass ich überreagiert habe.

Ich wollte nie,
dass wir an diesen Punkt kommen.

Ich verstehe dich
und respektiere deine Entscheidung.
Aber trodzem will ich dich nicht einfach loslassen`
  },
  { type: "image", ms: 2000, src: "img/Sara5.jpeg", alt: "Sara 5" },

  {
    type: "final",
    ms: 3200,
    text:
`Du opfer Merk dir das Ich dich wirklich liebe
                      Und .

Wenn du irgendwann reden willst:
Ich bin da egal wann egal wo werde für dich da sein.
         
             Danke für zuschauen 

– Adel`
  }
];

let idx = 0;
let timer = null;
let running = false;

const stage = document.getElementById("stage");
const stepCount = document.getElementById("stepCount");
const statusEl = document.getElementById("status");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const music = document.getElementById("music");
const card = document.getElementById("card");

function renderStep() {
  const s = steps[idx];
  stepCount.textContent = `${idx + 1} / ${steps.length}`;

  stage.innerHTML = "";

  if (s.type === "image") {
    const img = document.createElement("img");
    img.className = "photo fadeIn";
    img.src = s.src;
    img.alt = s.alt || "Bild";
    stage.appendChild(img);
  } else {
    const box = document.createElement("div");
    box.className = "fadeInUp";

    if (s.type === "intro") {
      const h = document.createElement("h1");
      h.className = "title";
      h.textContent = s.title || "";
      const p = document.createElement("p");
      p.className = "bigtext";
      p.textContent = s.text || "";
      box.appendChild(h);
      box.appendChild(p);
    } else {
      const p = document.createElement("p");
      p.className = "bigtext";
      p.textContent = s.text || "";
      box.appendChild(p);
    }

    stage.appendChild(box);
  }

  // Auto-scroll (smooth) damit es sich “selbst bewegt”
  card.scrollIntoView({ behavior: "smooth", block: "start" });
}

function scheduleNext() {
  clearTimeout(timer);
  const ms = steps[idx].ms;

  timer = setTimeout(() => {
    if (!running) return;

    if (idx < steps.length - 1) {
      idx++;
      renderStep();
      scheduleNext();
    } else {
      finish();
    }
  }, ms);
}

function startShow() {
  if (running) return;

  // Musik passend starten (nur per Klick möglich)
  music.volume = 0.35;
  music.currentTime = 0;

  music.play().catch(() => {
    // Falls irgendwas blockt, läuft die Story trotzdem,
    // aber normal klappt es nach Klick.
  });

  running = true;
  statusEl.textContent = "läuft";
  startBtn.disabled = true;
  restartBtn.disabled = false;

  idx = 0;
  renderStep();
  scheduleNext();
}

function finish() {
  running = false;
  statusEl.textContent = "fertig";
  clearTimeout(timer);
}

function restart() {
  clearTimeout(timer);
  running = false;
  statusEl.textContent = "bereit";
  startBtn.disabled = false;

  idx = 0;
  stepCount.textContent = `0 / ${steps.length}`;
  stage.innerHTML = `<p class="bigtext muted">Drück Start.</p>`;

  // Musik stoppen
  music.pause();
  music.currentTime = 0;
}

// Initial
stepCount.textContent = `0 / ${steps.length}`;
stage.innerHTML = `<p class="bigtext muted">Drück Start.</p>`;
