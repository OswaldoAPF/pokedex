<template>
  <div class="container__alls">
    <div class="container__search">
      <input v-model="searchInputFavorites" class="input__search" type="text" placeholder="Search">
      <img class="icon__search" src="../assets/img/search.png">
    </div>

    
    <PokemonListComponent  :searchFav="searchInputFavorites.toLowerCase()"/>

    <div class="container__nav">
      <RouterLink to="/all" class="button">
        <img src="../assets/img/list.png">
        All
      </RouterLink>
      <RouterLink to="/favorites" class="button button__active">
        <img src="../assets/img/star.png">
        Favorites
      </RouterLink>
    </div>

  </div>
</template>

<script>
import PokemonListComponent from "../components/PokemonListComponent.vue"

export default {
  components: {
      PokemonListComponent,
    },
    data() {
      return {
        searchInputFavorites: "",
        favorites: [],
      };

    },
    created() {
      this.favorites = JSON.parse(localStorage.getItem('Favorites')) || [];
    },
}

</script>