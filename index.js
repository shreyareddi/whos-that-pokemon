let gameData;
const main = document.querySelector('main');
const pokemonImage = document.querySelector('#pokemon-image');
const textOverlay = document.querySelector('#text-overlay');
const options = document.querySelector('#options');
const scoreText = document.querySelector('#score-text');
const playButton = document.querySelector('#play');

// Starting info for scorekeeping
totalRounds = 0;
score = 0;

// Initiates fetching of data after clicking Play/Continue
playButton.addEventListener('click', fetchData);
addAnswerHandler();

async function fetchData() {
  scoreText.textContent = "SCORE: " + score + '/' + totalRounds;
  resetImage();
  gameData = await window.getPokeData();
  showSilhouette();
  displayOptions();
}

function resetImage() {
  pokemonImage.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D';
  main.classList.add('guessing');
  main.classList.remove('revealed');
}

// Removes filter to reveal Pokemon
function showSilhouette() {
  main.classList.remove('guessing');
  pokemonImage.src = gameData.correct.image;
}

function displayOptions() {
  const { pokemonChoices } = gameData;
  const optionsHTML = pokemonChoices.map(({ name }) => {
    return `<button data-name="${name}">${name}</button>`;
  }).join('');

  options.innerHTML = optionsHTML;
}

function changeButtonText() {
  var btnText = document.getElementById("play");
  if (btnText.innerHTML === "Play") {
    btnText.innerHTML = "Continue";
  }
}

function addAnswerHandler() {
  options.addEventListener('click', c => {
    const { name } = c.target.dataset;
    const resultClass = (name === gameData.correct.name) ?
      'correct' : 'incorrect';

    c.target.classList.add(resultClass);
    // Increments score if correct option is clicked
    if (name == gameData.correct.name) {
      scoreKeeper(1);
    } else {
      scoreKeeper(0);
    }
    revealPokemon();
  });
}

function revealPokemon() {
  main.classList.add('revealed');
  textOverlay.textContent = `${gameData.correct.name}!`;
}

function scoreKeeper(correct) {
  score =  score + correct;
  ++totalRounds;

  scoreText.textContent = "SCORE: " + score + '/' + totalRounds;
}
