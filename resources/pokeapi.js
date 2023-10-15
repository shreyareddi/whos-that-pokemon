window.getPokeData = async function() {
    const pokemon = await get150Pokemon();
    const shuffledPokemon = shuffle(pokemon);
    const pokemonChoices = getPokemonChoices(shuffledPokemon);
    // Chooses the "correct" Pokemon
    const [ firstPokemon ] = pokemonChoices;
    // Gets sprite for the correct Pokemon
    const image = getPokemonImage(firstPokemon);
  
    return { 
      pokemonChoices: shuffle(pokemonChoices),
      correct: {
        image,
        name: firstPokemon.name,
      }
    };
  };
  
  // Marked async in order to use await and fulfill promises before moving on
  // Returns set of 150 pokemon
  async function get150Pokemon() {
    // limits set of Pokemon to 150 (original Pokemon)
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=150');
    const pokemon = await res.json();
    return pokemon.results;
  }
  
  // Shuffles set of Pokemon 
  function shuffle(unshuffledPokemon) {
    const shuffled = unshuffledPokemon
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    
    return shuffled;
  }

  // Chooses four random Pokemon out of shuffled set
  function getPokemonChoices(shuffledPokemonSet) {
    return shuffledPokemonSet.splice(0, 4);
  }

  // Gets index number associated with the Pokemon at specified URL
  function getNumber(url) {
    const numberRegEx = /(\d+)\/$/;
    return (url.match(numberRegEx) || [])[1];
  }
  
  // Using index number from getNumber(), gets the URL for Pokemon's sprite
  function getPokemonImage({ url }) {
    const number = getNumber(url);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;
  };
  