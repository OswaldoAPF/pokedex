<template>
  <div class="container__list">
    <div v-for="pokemon in filterPokemons" :key="pokemon.name">
      <div class="card__pokemon">
        <RouterLink class="go__to__pokemon" :to="getPokemonDetailLink(pokemon.name)">
          {{ pokemonUpperCase(pokemon.name) }}
        </RouterLink>
        <button 
          :id="pokemon.name"
          @click="toggleFavorite(pokemon)"
          :class="{'fav__active' : pokemon.inFavorites, 'fav__button' : !pokemon.inFavorites }"  
        >
        </button>
      </div>
    </div>

    <div class="container__message" v-if="favorites.length === 0 && $route.path === '/favorites' && search.length === 0">
      <h2 class="message__favorites">Here you will find your favorite Pokémon!</h2>
    </div>
    <div class="container__message" v-if="filterPokemons.length === 0 && search.length > 0">
      <h1 class="message__favorites">Uh-oh!</h1>
      <p>You look lost on your journey!</p>
    </div>
  </div>
</template>

<script>
import { useFavoriteStore } from '../store/store.js'; // Importa el store de Pinia

export default {
  props: {
    search: String,
  },
  data() {
    return {
      pokemons: [], // Todos los Pokémon
      favorites: [],
    };
  },
  watch: {
    '$route': 'loadPokemons'
  },
  created(){
    this.loadPokemons()
  },
  methods: {
    loadPokemons() {
      const store = useFavoriteStore();

      fetch("https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0")
        .then(response => response.json())
        .then(data => {
          this.pokemons = data.results.map(pokemon => ({
            ...pokemon,
            inFavorites: store.isFavorite(pokemon.name), // Vincula el estado de favoritos desde el store
          }));

          this.favorites = store.favorites.map(favorite => ({
            ...favorite,
            inFavorites: true, // Asegura que los favoritos siempre tengan `inFavorites: true`
          }));
        })
        .catch(error => {
          console.error('Error al cargar los Pokémon:', error);
        });
    },
    toggleFavorite(pokemon) {
      const store = useFavoriteStore();
      store.toggleFavorite(pokemon);

      const isFavoriteNow = store.isFavorite(pokemon.name);

      // Actualiza inFavorites en la lista general
      const pokemonsIndex = this.pokemons.findIndex(p => p.name === pokemon.name);
      if (pokemonsIndex !== -1) {
        this.pokemons[pokemonsIndex].inFavorites = isFavoriteNow;
      }

      // Actualiza inFavorites en la lista de favoritos
      if (isFavoriteNow) {
        // Solo agrega a favoritos si no está ya presente
        if (!this.favorites.some(f => f.name === pokemon.name)) {
          this.favorites.push({ ...pokemon, inFavorites: true });
        }
      } else {
        // Elimina de la lista de favoritos
        this.favorites = this.favorites.filter(f => f.name !== pokemon.name);
      }
    },
    pokemonUpperCase(name) {
      if (typeof name !== 'string') return '';
      return name[0].toUpperCase() + name.slice(1);
    },
    getPokemonDetailLink(pokemonName) {
      const currentPath = this.$route.path;
      if (currentPath.includes('favorites')) {
        return { name: 'favorites-detail', params: { name: pokemonName } };
      } else if (currentPath.includes('pokemons')) {
        return { name: 'pokemon-detail', params: { name: pokemonName } };
      }
    },
  },
  computed: {
    favorites() {
      const store = useFavoriteStore();
      return store.favorites;
    },
    filterPokemons() {
      if (this.$route.path.includes('favorites')) {
        return this.favorites.filter(pokemonFav => pokemonFav.name && pokemonFav.name.includes(this.search));
      } else {

        return this.pokemons.filter(pokemon => pokemon.name && pokemon.name.includes(this.search));
      }
    },
  },
};
</script>