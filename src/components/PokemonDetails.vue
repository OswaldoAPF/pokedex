<template>
  <div v-if="pokemon" class="container__modal">
    <div class="modal">
      <div class="container__header__modal">
        <button @click="closeModal" class="close__modal">
          <img src="../assets/img/close.png" alt="Cerrar">
        </button>
        <img class="pokemon__modal" :src="pokemon.sprites.other['official-artwork'].front_default">
      </div>

      <div class="container__details">
        <p id="name"><span>Name: </span>{{ pokemonUpperCase(pokemon.name) }}</p>
        <p id="weight"><span>Weight: </span>{{ pokemon.weight }}</p>
        <p id="height"><span>Height: </span>{{ pokemon.height }}</p>
        <p class="types__details">Types: 
          <span v-for="(pokemonType, index) in pokemon.types" :key="index">
            {{ pokemonUpperCase(pokemonType.type.name) }}<span v-if="index < pokemon.types.length - 1">, </span>
          </span>
        </p>
      </div>

      <div class="container__footer__modal">
        <button @click="copyDataToClipboard" class="button button__share__modal">Share to my friends</button>
        <button 
          :class="{'fav__active' : isFavorite, 'fav__button' : !isFavorite}"
          @click="toggleFavorite"
        >
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useFavoriteStore } from '../store/store.js';

export default {
  data() {
    return {
      pokemon: null,
    };
  },
  created() {
    this.loadPokemon();
  },
  methods: {
    closeModal() {
      this.$router.back();
    },
    loadPokemon() {
      const pokemonName = this.$route.params.name;
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Error en la respuesta de la API');
          }
          return response.json();
        })
        .then(data => {
          this.pokemon = data;
        })
        .catch(error => {
          console.error('Error al cargar el Pokémon:', error);
        });
    },
    toggleFavorite() {
      const store = useFavoriteStore();
      store.toggleFavorite(this.pokemon);
    },
    pokemonUpperCase(name) {
      if (typeof name !== 'string') return '';
      return name[0].toUpperCase() + name.slice(1);
    },
  },
  computed: {
    isFavorite() {
      const store = useFavoriteStore();
      return store.isFavorite(this.pokemon?.name);
    },
  },
};
</script>