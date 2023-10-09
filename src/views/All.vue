<template>

  <div class="container__alls">
    
    <div v-if="loading" class="container__loading">
      <img class="loading" src="../assets/img/loader.png">
    </div>

    <div class="container__search">
      <input v-model="searchInput" class="input__search" type="text" placeholder="Search">
      <img class="icon__search" src="../assets/img/search.png">
    </div>

    <PokemonListComponent :search="searchInput.toLowerCase()"/>

    <div class="container__nav">
      <RouterLink to="/All" class="button button__active">
        <img src="../assets/img/list.png">
        All
      </RouterLink>
      <RouterLink to="/favorites" class="button">
        <img src="../assets/img/star.png">
        Favorites
      </RouterLink>
    </div>

    <PokemonDetailsComponent/>
  
  </div>
</template>


<script>

  import PokemonListComponent from '../components/PokemonListComponent.vue';
  import PokemonDetailsComponent from '../components/PokemonDetailsComponent.vue';

  export default {
    props: {
      pokemon: Object,
      fetchDetails: Function,
    },
    components: {
      PokemonListComponent,
      PokemonDetailsComponent
    },
    data() {
      return {
        searchInput: '',
        loading: true,
      };

    },
    created() {
      setTimeout(this.setLoading, 1000)
    },
    methods: {
      setLoading() {
        this.loading = false;
        console.log("false")
      }
    }
  }

</script>

