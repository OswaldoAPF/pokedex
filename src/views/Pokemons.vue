<template>

    <div v-if="loading" class="container__loading">
      <img class="loading" src="../assets/img/loader.png">
    </div>

    <PokemonList :search="search.toLocaleLowerCase()"/>

    <router-view />
  
</template>


<script>

  import PokemonList from '../components/PokemonList.vue';
  import PokemonDetails from '../components/PokemonDetails.vue';

  export default {
    props: {
      pokemon: Object,
      fetchDetails: Function,
      search: {
        type: String,
        required: true
      }
    },
    components: {
      PokemonList,
      PokemonDetails
    },
    data() {
      return {
        loading: true,
      };

    },
    created() {
      setTimeout(this.setLoading, 1000)
    },
    methods: {
      setLoading() {
        this.loading = false;
      }
    },
  }

</script>

