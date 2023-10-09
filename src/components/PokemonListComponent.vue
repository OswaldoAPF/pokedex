
<template>
  {{ comprobateFavorite }}

  <div v-if="$route.path === '/favorites'" class="container__list">
    <div v-for="pokemonFavorite in filterPokemons" :key="pokemonFavorite.name">
      <div class="card__pokemon">
        <RouterLink :to="{ name: 'pokemon-detail', params: { name: pokemonFavorite.name } }">
          {{ pokemonUpperCase( pokemonFavorite.name ) }}
        </RouterLink>
        <button 
          :id="pokemonFavorite.name"
          @click="addPokemonsFavorite( pokemonFavorite.name )"
          :class="{'fav__active' : pokemonFavorite.inFavorites === true, 'fav__button' : !pokemonFavorite.inFavorites }"  
          >
        </button>
      </div>
    </div>

    <div class="container__message" v-if="favorites.length === 0">
      <h2 class="message__favorites">Here you will find your favorite Pokémon!</h2>
    </div>

  </div>

  <div v-else class="container__list">
    {{ updateFavorites }}
    <div v-for="pokemon in filterPokemons" :key="pokemon.name">
      <div class="card__pokemon">
        <RouterLink :to="{ name: 'pokemon-detail', params: { name: pokemon.name } }">
          {{ pokemonUpperCase( pokemon.name ) }}
        </RouterLink>
        <button 
          :id="pokemon.name" 
          @click="addPokemonsFavorite( pokemon.name )" 
          :class="{'fav__active' : pokemon.inFavorites === true, 'fav__button' : !pokemon.inFavorites }"
        >
        </button>
      </div>
    </div>
    <div class="container__message" v-if="filterPokemons.length === 0">
      <h1>Uh-oh!</h1>
      <p class="message__favorites">You look lost on your journey!</p>
    </div>
  </div>

</template>

<script>

  export default {
    props: {
      search: String,
      searchFav: String,
    },
    data() {
      return {
        pokemons: [],
        favorites: [],


      };
    },
    created() {
      fetch( "https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0" )
        .then( response => response.json() )
        .then(data => {
          this.pokemons = data.results
          this.pokemons.forEach( pokemon => {
            pokemon.inFavorites = false;
          })
        });
        
        this.favorites = JSON.parse( localStorage.getItem('Favorites') ) || [];
    },
    methods: {
      addPokemonsFavorite( pokemonName ) {
        
        const isAlreadyFavorite = this.favorites.some(favorite => favorite.name === pokemonName);
        const pokemonIndex = this.pokemons.findIndex(pokemon => pokemon.name === pokemonName);

        if (!isAlreadyFavorite && pokemonIndex !== -1) {
          this.favorites.push({ name: pokemonName, inFavorites: true });
          this.pokemons[pokemonIndex].inFavorites = true; 
          localStorage.setItem('Favorites', JSON.stringify(this.favorites));
        } else {
          this.favorites.forEach(( p , index ) => {
            if ( this.favorites[index].name === pokemonName ) {
              this.favorites.splice(index, 1);

              localStorage.setItem('Favorites', JSON.stringify(this.favorites));
            }
          })
        }
      },

      pokemonUpperCase(name){
        return name[0].toUpperCase() + name.slice( 1 )
      },
    },
    computed: {
      filterPokemons() {

        if ( this.$route.path === '/favorites' ) {
          if ( this.searchFav ) {
            console.log("favtrue")
            return this.favorites.filter( pokemonFav => pokemonFav.name.includes( this.searchFav ) );
          } else {
            console.log("favfalse")
            return this.favorites
          }
        } else {
          if ( this.search ) {
            console.log("normal")
            return this.pokemons.filter( pokemon => pokemon.name.includes( this.search ) );
          } else {
            console.log("normalfalse")
            return this.pokemons
          }
        }

      },
      comprobateFavorite() {
        this.pokemons.forEach( pokemon => {
          const isInFavorites = this.favorites.some( fav => fav.name === pokemon.name)

          if ( isInFavorites ) {
            return pokemon.inFavorites = true;
          } else {
            return pokemon.inFavorites = false;
          }
        })
      },
      updateFavorites() {
        if( this.$route.path === '/all' ){
          this.favorites = JSON.parse( localStorage.getItem('Favorites') ) || [];
        }

      }

    }
  };

</script>