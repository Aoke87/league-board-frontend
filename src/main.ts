import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import { store } from "./store";
import items from "../public/data/de_DE/item_small.json";
import champions from "../public/data/de_DE/champion_small.json";
import summoner from "../public/data/de_DE/summoner.json";
import { isMobile } from "./services/utilsService";

(async function () {
    // const backendUrl = import.meta.env.DEV ? import.meta.env.VITE_DEV_BACKEND_URL : import.meta.env.VITE_PROD_BACKEND_URL;
    const backendUrl = import.meta.env.VITE_PROD_BACKEND_URL;
    const matchesResponse = await fetch(`${backendUrl}match-v5/latest`);
    const summonerResponse = await fetch(`${backendUrl}summoner/all`);
    const versionResponse = await fetch(`https://ddragon.leagueoflegends.com/api/versions.json`);
    const version = await versionResponse.json();

    store.commit("setBackendUrl", backendUrl);
    store.commit("setVersion", version[0]);
    store.commit("setChampions", champions.data);
    store.commit("setSummonerSpells", summoner.data);
    // store.commit('setInitialMatches', await matchesResponse.json());

    const initialMatches = await matchesResponse.json();
    store.commit("setMatchesByPage", { page: 0, matches: initialMatches });

    store.commit("setSummoners", await summonerResponse.json());
    store.commit("setItems", items.data);
    store.commit("setIsAssetLoadingComplete", true);
    store.commit("setIsMobile", isMobile());
}());

const app = createApp(App);

app.use(store);
app.mount("#app");
