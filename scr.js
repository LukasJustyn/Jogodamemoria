const board = document.getElementById("game-board");
const timerDisplay = document.getElementById("timer");
const emojis = ["🍎", "🚗", "🐶", "🎈", "🌟", "🍕", "⚽", "🎮"];
const cards = [...emojis, ...emojis]; // 16 cartas (8 pares)
let flippedCards = [];
let matchedCards = [];
let tempoRestante = 120; // 2 minutos em segundos
let intervalo;

// Funções para tocar som
function tocarSomAcerto() {
  const som = new Audio('audio.mp3');
  som.play();
}

function tocarSomErro() {
  const som = new Audio('audiobob.mp3');
  som.play();
}

function tocarSomCelebracao() {
  const som = new Audio('celebracao.mp3');
  som.play();
}

// Atualiza o cronômetro na tela
function atualizarTimer() {
  const minutos = Math.floor(tempoRestante / 60);
  const segundos = tempoRestante % 60;
  timerDisplay.innerText = `${minutos}:${segundos.toString().padStart(2, '0')}`;
  tempoRestante--;

  if (tempoRestante < 0) {
    clearInterval(intervalo);
    alert("⏰ Tempo esgotado! Tente novamente.");
    desativarCartas();
  }
}

// Desativa todas as cartas após o tempo acabar
function desativarCartas() {
  const todasAsCartas = document.querySelectorAll(".card");
  todasAsCartas.forEach(card => card.removeEventListener("click", flipCard));
}

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
  const shuffled = shuffle(cards);
  shuffled.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.innerText = emoji; // Mostrar emoji inicialmente
    card.classList.add("flipped");
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });

  // Mostrar cartas por 5 segundos para memorização
  setTimeout(() => {
    const todasAsCartas = document.querySelectorAll(".card");
    todasAsCartas.forEach(card => {
      card.innerText = "";
      card.classList.remove("flipped");
    });

    // Iniciar cronômetro após esconder as cartas
    atualizarTimer();
    intervalo = setInterval(atualizarTimer, 1000);
  }, 5000);
}

function flipCard() {
  if (flippedCards.length === 2 || this.classList.contains("flipped")) return;

  this.classList.add("flipped");
  this.innerText = this.dataset.emoji;
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.emoji === card2.dataset.emoji) {
    tocarSomAcerto();

    matchedCards.push(card1, card2);
    flippedCards = [];

    if (matchedCards.length === cards.length) {
      clearInterval(intervalo);
      tocarSomCelebracao();
      setTimeout(() => alert("🎉 Parabéns! Você completou o jogo!"), 500);
    }
  } else {
    tocarSomErro();

    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1.innerText = "";
      card2.innerText = "";
      flippedCards = [];
    }, 1000);
  }
}
function atualizarTimer() {
  const minutos = Math.floor(tempoRestante / 60);
  const segundos = tempoRestante % 60;
  timerDisplay.innerText = `${minutos}:${segundos.toString().padStart(2, '0')}`;
  tempoRestante--;

  if (tempoRestante < 0) {
    clearInterval(intervalo);
    alert("⏰ Tempo esgotado! Tente novamente.");
    desativarCartas();
  }
}

function desativarCartas() {
  const todasAsCartas = document.querySelectorAll(".card");
  todasAsCartas.forEach(card => card.removeEventListener("click", revelarPergunta));
}

createBoard();
