// @ts-ignore
import { createStore } from 'vuex';
import './index.css'

export const store = createStore({
    state() {
        return {
            champions: {},
            summonerSpells: {},
            initialMatches: [],
            isAssetLoadingComplete: false,
            summoners: [],
            isMobile: false,
            items: {},
            backendUrl: 'http://localhost:3030/'
        }
    },
    getters: {
        getChampion: (state: any) => (championName: string) => {
            return state.champions[championName]
        },
        getSummoners: (state: any) => {
            return state.summoners;
        },
        getIsMobile: (state: any) => {
            return state.isMobile;
        },
        getInitialMatches: (state: any) => {
            return state.initialMatches
        },
        getIsAssetLoadingComplete: (state: any) => {
            return state.isAssetLoadingComplete;
        },
        getItem: (state: any) => (itemId: number) => {
            if (itemId === 0 || itemId === null) { return }
            for (const item in state.items) {
                if (item === itemId.toString()) {
                    return state.items[item]
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
        }
    },
    mutations: {
        setChampions: (state: any, champions: any) => {
            state.champions = champions;
        },
        setSummoners: (state: any, summoners: any) => {
            state.summoners = summoners;
        },
        setSummonerSpells: (state: any, summonerSpells: any) => {
            state.summonerSpells = summonerSpells
        },
        setInitialMatches: (state: any, initialMatches: any) => {
            state.initialMatches = initialMatches
        },
        setItems: (state: any, items: any) => {
            state.items = items
        },
        setIsAssetLoadingComplete: (state: any, payload: boolean) => {
            state.isAssetLoadingComplete = payload;
        },
        setBackendUrl: (state: any, payload: boolean) => {
            state.backendUrl = payload;
        },
        setIsMobile: (state: any, payload: boolean) => {
            state.isMobile = payload;
        }
    }
})
