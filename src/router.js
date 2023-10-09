import { createRouter, createWebHistory } from 'vue-router';

// Views
import Start from './views/Start.vue'
import All from './views/All.vue'
import Favorites from './views/Favorites.vue'
import PokemonDetailsComponent from './components/PokemonDetailsComponent.vue'

const routes = [
  {
    path: '/',
    component: Start,
    name: 'start'
  },
  {
    path: '/all',
    component: All,
    name: 'all',
    children: [
      {
        path: '/all/pokemon/:name', 
        component: PokemonDetailsComponent,
        name: 'pokemon-detail',
        props: true
      }
    ],
  },
  {
    path: '/favorites', 
    component: Favorites,
    name: 'favorites',
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
