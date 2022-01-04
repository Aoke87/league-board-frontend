import { createApp } from 'vue';
import App from './App.vue'
import './index.css'
import { store } from "./store";

(async function () {
    const champions = (await import('../public/data/de_DE/champion.json')).default;
    const profileicon = (await import('../public/data/de_DE/profileicon.json')).default;
    const summoner = (await import('../public/data/de_DE/summoner.json')).default;
    const items = (await import('../public/data/de_DE/item.json')).default;
    const matchesResponse = await fetch('http://localhost:3000/match-v5/latest');
    const initialMatches = await matchesResponse.json();
    const summonerResponse = await fetch('http://localhost:3000/summoner/all');
    const summoners = await summonerResponse.json();
    store.commit('setChampions', champions.data);
    store.commit('setProfileIcons', profileicon.data);
    store.commit('setSummonerSpells', summoner.data);
    store.commit('setInitialMatches', initialMatches);
    store.commit('setSummoners', summoners);
    store.commit('setItems', items.data);
    store.commit('setIsAssetLoadingComplete', true);
    console.log(import.meta.env.VITE_BACKEND_URL);
    console.log('Hello World!');
})();

const app = createApp(App);

app.use(store)
app.mount('#app');
