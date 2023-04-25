const pokeContainer = document.querySelector(".poke-container");
const search = document.querySelector(".search");
const searchBtn = document.querySelector(".searchbtn");
const searchInput = document.querySelector(".searchInput");

const pokemonCount = 152;

const bg_color = {
  grass: "#8BD369",
  fire: "#FF603F",
  water: "#3399FF",
  bug: "#AABB22",
  normal: "#AAAA99",
  flying: "#9AA8FA",
  poison: "#B76EA4",
  electric: "#FFD34E",
  ground: "#E2C56A",
  fairy: "#F1A8EC",
  psychic: "#FF6EA4",
  fighting: "#C56E5C",
  rock: "#C5B679",
  dragon: "#7766EE",
  ice: "#66CCFF",
};
searchBtn.addEventListener("click", () => {
  search.classList.toggle("active");
});
searchInput.addEventListener("input", (e) => {
  const searchValue = searchInput.value.toLocaleLowerCase();
  const pokemonNames = document.querySelectorAll(".poke-name");
  pokemonNames.forEach((pokemonName) => {
    if (!pokemonName.innerHTML.toLocaleLowerCase().includes(searchValue)) {
      pokemonName.parentElement.parentElement.parentElement.style.display =
        "none";
    } else {
      pokemonName.parentElement.parentElement.parentElement.style.display =
        "block";
    }
  });
});

const fetchPokemon = async () => {
  for (i = 1; i < pokemonCount; i++) {
    await getPokemon(i);
  }
};
const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  //console.log(data);
  createPokemonCard(data);
};
const createPokemonCard = (pokemon) => {
  const pokemonDiv = document.createElement("div");
  pokemonDiv.classList.add("pokemon");

  const pokemonId = pokemon.id.toString().padStart(3, "0");
  const pokemonType = pokemon.types[0].type.name;
  const PokemonBg = bg_color[pokemonType];
  pokemonDiv.style.backgroundColor = `${PokemonBg}`;
  const pokemonDivInnerHTML = `
  <div class="pokemon" style="width: 300px;">
  <div class="image">
    <img
      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"
      alt="first Pokemon"
    />
  </div>
<div class="poke-info">
    <span class="poke-id">#${pokemonId}</span>
    <h3 class="poke-name">${pokemon.name}</h3>
    <div class="small">
      <small class="poke-exp">
        <i class="fa-solid fa-flask"></i> ${pokemon.base_experience} exp
      </small>
      <small> <i class="fa-solid fa-weight-scale"></i> ${pokemon.weight}kg </small>
    </div>
    <div class="poke-type">
      <i class="fa-brands fa-uncharted"></i> ${pokemonType}
    </div>
  </div>
  </div>
  `;
  pokemonDiv.innerHTML = pokemonDivInnerHTML;

  pokeContainer.appendChild(pokemonDiv);
};

fetchPokemon();
