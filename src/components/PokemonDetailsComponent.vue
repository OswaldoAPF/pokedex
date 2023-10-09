<template>
  {{ loadPokemon }}
  <div v-if="pokemon" class="container__modal">
    <div class="modal">

      <div class="container__header__modal">
        <RouterLink @click="pokemon = null" to="/all" class="close__modal">
          <img src="../assets/img/close.png" alt="">
        </RouterLink>
        <img class="pokemon__modal" :src="pokemon.sprites.other['official-artwork'].front_default">
      </div>

      <div class="container__details">
        <p id="name"><span>Name: </span>{{ pokemonUpperCase( pokemon.name ) }}</p>
        <p id="weight"><span>Weight: </span>{{ pokemon.weight }}</p>
        <p id="height"><span>Height: </span>{{ pokemon.height }}</p>
        <p class="types__details">Types: 
          <span v-for="( pokemonType, index ) in pokemon.types" :key="index">
            {{ pokemonUpperCase(pokemonType.type.name) }}<span v-if="index < pokemon.types.length - 1">, </span>
          </span>
        </p>
      </div>

      <div class="container__footer__modal">
        <button @click="copyDataToClipboard" class="button button__share__modal">Share to my friends</button>
        <button 
          :class="{'fav__active' : inFavorites === true, 'fav__button' : !inFavorites }"
          @click="toggleFavorite"
        >
        </button>
      </div>

    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      pokemon: null,
      favoritesModal: [],
      inFavorites: false
    };
  },
  created() {
    this.favoritesModal = JSON.parse(localStorage.getItem('Favorites')) || [];
  },
  methods: {
    toggleFavorite() {
      if(this.$route.params.name){
        const pokemonName = this.$route.params.name;
        const isFavorite = this.favoritesModal.some(pokemon => pokemon.name === pokemonName);

        if (isFavorite) {
          this.favoritesModal = this.favoritesModal.filter(pokemon => pokemon.name !== pokemonName);
        } else {
          this.favoritesModal.push({ name: pokemonName, inFavorites: true });
        }
        localStorage.setItem('Favorites', JSON.stringify(this.favoritesModal));
        this.inFavorites = !isFavorite;

      }
    },

    updateInFavorites() {
      if(this.$route.params.name){
        this.favoritesModal = JSON.parse(localStorage.getItem('Favorites')) || [];
        const pokemonName = this.$route.params.name;
        this.inFavorites = this.favoritesModal.some(pokemon => pokemon.name === pokemonName);
      }
    },
    copyDataToClipboard() {
      const name = document.getElementById('name').textContent;
      const weight = document.getElementById('weight').textContent;
      const height = document.getElementById('height').textContent;
      const types = document.querySelector('.types__details').textContent;

      const dataToCopy = `${name}\n${weight}\n${height}\n${types}`;

      const textArea = document.createElement('textarea');
      textArea.value = dataToCopy;
      textArea.style.position = 'fixed';
      textArea.style.opacity = 0;
      document.body.appendChild(textArea);

      textArea.select();
      document.execCommand('copy');

      document.body.removeChild(textArea);

      alert('Datos copiados al portapapeles');
    },

    pokemonUpperCase(name){
        return name[0].toUpperCase() + name.slice( 1 )
      }
  },
  computed: {
    loadPokemon() {
      this.updateInFavorites()
      if (this.$route.params.name) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${this.$route.params.name}`)
        .then((response) => response.json())
        .then((data) => {
          return this.pokemon = data;
        });
      }

    },
  }
};
</script>