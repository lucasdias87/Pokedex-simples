const pokemonName = document.querySelector('.pokemon_name');
const pokemonnunber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form= document.querySelector('.form');
const imput = document.querySelector('.input_search');
const buttonNext = document.querySelector('.btn-next');
const buttonPrev = document.querySelector('.btn-prev');
x=document.getElementById("audio");
 let searchPokemon = 1;
// variaveis globais para o funcionamento do script




// função para buscar o pokemon
const fetchPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Carregando...';
    pokemonnunber.innerHTML = '';
  const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (APIresponse.status == 200) {
    const data = await APIresponse.json();
    return data;
  
  
  }
  else {
    alert('Pokemon não encontrado');
    pokemonnunber.innerHTML = '';
    pokemonName.innerHTML = '';
    pokemonImage.style.display = 'none';

  }
}
const renderPokemon = async (pokemon) => {
  const data = await fetchPokemon(pokemon);
  if (data) {
    pokemonName.innerHTML = data.name;
    pokemonnunber.innerHTML = data.id;
    pokemonImage.style.display = 'block';
    pokemonImage.src = data['sprites'] ['versions']['generation-v']['black-white']['animated']  ['front_default'];
    imput.value = '';
    searchPokemon = data.id;
 
  }
  
}
// função para buscar o pokemon
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  x.play();
   renderPokemon(imput.value.toLowerCase());
  
}
);
//botão para pvoltar o pokemon
buttonPrev.addEventListener('click', async () => {
    if (searchPokemon > 1) {
        searchPokemon--;
        renderPokemon(searchPokemon);
        x.play();
    }
    else {
        alert('Não há mais pokemons');
    }
    }
);
   
  

    
 
//botão para avancar o pokemon
    buttonNext.addEventListener('click', async () => {
        x.play();
        searchPokemon++;
        renderPokemon(searchPokemon);

    }   );


renderPokemon(searchPokemon);