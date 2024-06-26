const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;

document.querySelector(".score").textContent = score;
console.log("Script loaded successfully");

// Card data
const cardData = [
  {
    image: "./assets/lesssnacks.png",
    name: "Eat fewers snacks! Wait for the meal!",
  },
  {
    image: "./assets/sharefood.png",
    name: "Share your food if you know you have too much.",
  },
  {
    image: "./assets/storefood.png",
    name: "If I cannot finish my food, I will store it for tomorrow!",
  },
  {
    image: "./assets/discolouredfood.png",
    name: "Ugly foods are just as tasty! But do check if it's rotten.",
  },
  {
    image: "./assets/expirydate.png",
    name: "Do not buy too much food! We should check expiry dates.",
  },
  {
    image: "./assets/lessportion.png",
    name: "I should always get smaller portions than big portions if I do not feel hungry.",
  },
];

// Create an image and a text card for each item in the card data
cards = cardData.flatMap((card) => [
  { type: "image", content: card.image, name: card.name },
  { type: "text", content: card.name, name: card.name },
]);

shuffleCards();
generateCards();

// Function to shuffle cards
function shuffleCards() {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]]; // ES6 destructuring to swap elements
  }
}

// Function to generate card elements
function generateCards() {
  gridContainer.innerHTML = ""; // Clear existing cards first
  cards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.setAttribute("data-type", card.type); // Add type attribute to help with match checking

    cardElement.innerHTML =
      card.type === "image"
        ? `<div class="front"><img class="front-image" src="${card.content}" alt="${card.name}"></div><div class="back"></div>`
        : `<div class="front"><p class="card-text">${card.content}</p></div><div class="back"></div>`;

    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  });
}

// Flip card function
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  score++;
  document.querySelector(".score").textContent = score;
  lockBoard = true;

  checkForMatch();
}

// Function to check for a match
function checkForMatch() {
  const isMatch =
    firstCard.dataset.name === secondCard.dataset.name &&
    firstCard.dataset.type !== secondCard.dataset.type; // Ensure they're not the same type

  isMatch ? disableCards() : unflipCards();
}

// Disable matched cards
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  resetBoard();
}

// Unflip non-matching cards
function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

// Reset board function
function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

// Restart the game
function restart() {
  resetBoard();
  shuffleCards();
  score = 0;
  document.querySelector(".score").textContent = score;
  generateCards();
}

//HOME
function toggleMenu() {
  const links = document.querySelector(".links_to_other_sites");
  links.classList.toggle("show");
}
