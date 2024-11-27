import { defineStore } from 'pinia';

export const useFavoriteStore = defineStore('favorites', {
  state: () => ({
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
  }),
  actions: {
    toggleFavorite(pokemon) {
      const index = this.favorites.findIndex(fav => fav.name === pokemon.name);
      if (index === -1) {
        this.favorites.push(pokemon);
      } else {
        this.favorites.splice(index, 1);
      }
      this.saveFavorites();
      console.log(this.favorites);
    },
    saveFavorites() {
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
    isFavorite(pokemonName) {
      return this.favorites.some(fav => fav.name === pokemonName);
    },
  },
});
