import { createApp } from 'vue';
import App from './App.vue'
import './index.css'
import { store } from "./store";




(async function () {
    const backendUrl = import.meta.env.DEV ? import.meta.env.VITE_DEV_BACKEND_URL : import.meta.env.VITE_PROD_BACKEND_URL;
    const champions = (await import('../public/data/de_DE/champion.json')).default;
    const profileicon = (await import('../public/data/de_DE/profileicon.json')).default;
    const summoner = (await import('../public/data/de_DE/summoner.json')).default;
    const items = (await import('../public/data/de_DE/item.json')).default;
    const matchesResponse = await fetch(`${backendUrl}match-v5/latest`);
    const initialMatches = await matchesResponse.json();
    const summonerResponse = await fetch(`${backendUrl}summoner/all`);
    const summoners = await summonerResponse.json();
    store.commit('setChampions', champions.data);
    store.commit('setProfileIcons', profileicon.data);
    store.commit('setSummonerSpells', summoner.data);
    store.commit('setInitialMatches', initialMatches);
    store.commit('setSummoners', summoners);
    store.commit('setItems', items.data);
    store.commit('setIsAssetLoadingComplete', true);
    store.commit('setBackendUrl', backendUrl);
    console.log(backendUrl);
})();

const app = createApp(App);

app.use(store)
app.mount('#app');
