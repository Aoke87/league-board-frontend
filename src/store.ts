import { createStore } from "vuex";
import "./index.css";

export const store = createStore({
    state() {
        return {
            champions: {},
            summonerSpells: {},
            initialMatches: [],
            matchPages: {},
            isAssetLoadingComplete: false,
            summoners: [],
            isMobile: false,
            items: {},
            backendUrl: "http://localhost:3030/",
            version: null,
        };
    },
    getters: {
        getChampion: (state: any) => (championName: string) => state.champions[championName],
        getVersion: (state: any) => state.version,
        getSummoners: (state: any) => state.summoners,
        getIsMobile: (state: any) => state.isMobile,
        getInitialMatches: (state: any) => state.initialMatches,
        getMatchesByPage: (state: any) => (page: number) => {
            if (Object.prototype.hasOwnProperty.call(state.matchPages, page)) {
                return state.matchPages[page];
            }
            return [];
        },
        getIsAssetLoadingComplete: (state: any) => state.isAssetLoadingComplete,
        getItem: (state: any) => (itemId: number) => {
            if (itemId === 0 || itemId === null) {
                return;
            }
            for (const item in state.items) {
                if (item === itemId.toString()) {
                    return state.items[item];
                }
            }
            return state.items;
        },
        getSummonerSpell: (state: any) => (summonerSpellId: number) => {
            for (const spell in state.summonerSpells) {
                if (state.summonerSpells[spell].key === summonerSpellId.toString()) {
                    return state.summonerSpells[spell];
                }
            }
            return false;
        },
    },
    mutations: {
        setChampions: (state: any, champions: any) => {
            state.champions = champions;
        },
        setVersion: (state: any, version: any) => {
            state.version = version;
        },
        setSummoners: (state: any, summoners: any) => {
            state.summoners = summoners;
        },
        setSummonerSpells: (state: any, summonerSpells: any) => {
            state.summonerSpells = summonerSpells;
        },
        setInitialMatches: (state: any, initialMatches: any) => {
            state.initialMatches = initialMatches;
        },
        setMatchesByPage: (state: any, matchPageEntry: { page: number, matches: any[] }) => {
            const newMatchesByPage = { ...state.matchPages };
            newMatchesByPage[matchPageEntry.page] = matchPageEntry.matches;
            state.matchPages = newMatchesByPage;
        },
        setItems: (state: any, items: any) => {
            state.items = items;
        },
        setIsAssetLoadingComplete: (state: any, payload: boolean) => {
            state.isAssetLoadingComplete = payload;
        },
        setBackendUrl: (state: any, payload: boolean) => {
            state.backendUrl = payload;
        },
        setIsMobile: (state: any, payload: boolean) => {
            state.isMobile = payload;
        },
    },
});
