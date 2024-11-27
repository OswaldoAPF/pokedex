<template>

  <div class="container__alls">
    <div v-if="$route.path.includes('/pokemons') || $route.path.includes('/favorites')" class="container__search">
      <input v-model="searchInput" class="input__search" type="text" placeholder="Search">
      <img class="icon__search" src="./assets/img/search.png">
    </div>

    <router-view :search="searchInput" />

    <div v-if="$route.path.includes('/pokemons') || $route.path.includes('/favorites')" class="container__nav">
      <RouterLink to="/pokemons" class="button">
        <img src="./assets/img/list.png">
        All
      </RouterLink>
      <RouterLink to="/favorites" class="button">
        <img src="./assets/img/star.png">
        Favorites
      </RouterLink>
    </div>

  </div>

</template>

<script>

  export default {
    data() {
      return {
        searchInput: '',
        loading: true,
      };

    },
    
  }
</script>