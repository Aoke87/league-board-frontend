import { createApp } from 'vue';
import App from './App.vue'
import './index.css'
import { store } from "./store";
import items from './../public/data/de_DE/item.json';
import champions from './../public/data/de_DE/champion.json';
import summoner from './../public/data/de_DE/summoner.json';
import { isMobile } from './services/utilsService';

(async function () {
    const backendUrl = import.meta.env.DEV ? import.meta.env.VITE_DEV_BACKEND_URL : import.meta.env.VITE_PROD_BACKEND_URL;
    const matchesResponse = await fetch(`${backendUrl}match-v5/latest`);
    const summonerResponse = await fetch(`${backendUrl}summoner/all`);

    store.commit('setBackendUrl', backendUrl);
    store.commit('setChampions', champions.data);
    store.commit('setSummonerSpells', summoner.data);
    store.commit('setInitialMatches', await matchesResponse.json());
    store.commit('setSummoners', await summonerResponse.json());
    store.commit('setItems', items.data);
    store.commit('setIsAssetLoadingComplete', true);
    store.commit('setIsMobile', isMobile());

})();

const app = createApp(App);

app.use(store)
app.mount('#app');
