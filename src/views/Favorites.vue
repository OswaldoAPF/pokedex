<template>
    <PokemonList :search="search" />
    <router-view />
</template>

<script>
import PokemonList from '../components/PokemonList.vue';

export default {
  props:{
    search: {
        type: String,
        required: true
      }
  },
  components: {
    PokemonList,
  },
};
</script>