import { createRouter, createWebHistory } from 'vue-router';

// Views
import Start from './views/Start.vue'
import Pokemons from './views/Pokemons.vue'
import Favorites from './views/Favorites.vue'
import PokemonDetails from './components/PokemonDetails.vue'

const routes = [
  {
    path: '/',
    component: Start,
    name: 'start'
  },
  {
    path: '/pokemons',
    component: Pokemons,
    name: 'pokemons',
    props: (route) => ({ search: route.query.search || '' }),
    children: [
      {
        path: ':name',
        component: PokemonDetails,
        name: 'pokemon-detail',
        props: true
      }
    ],
  },
  {
    path: '/favorites', 
    component: Favorites,
    name: 'favorites',
    props: (route) => ({ search: route.query.search || '' }),
    children: [
      {
        path: ':name',
        component: PokemonDetails,
        name: 'favorites-detail',
        props: true
      }
    ]
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
