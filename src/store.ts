// @ts-ignore
import { createStore } from 'vuex';
import './index.css'

export const store = createStore({
    state () {
        return {
            champions: {},
            profileIcons: {},
            summonerSpells: {},
            initialMatches: [],
            isAssetLoadingComplete: false,
            summoners: [],
            items: {}
        }
    },
    getters: {
        getChampion: (state: any) => (championName: string) => {
            return state.champions[championName]
        },
        getSummoners: (state: any) => {
            return state.summoners;
        },
        getProfileIcon: (state: any) => (profileiconId: number) => {
            return state.profileIcons[profileiconId]
        },
        getInitialMatches: (state: any)  => {
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
        setProfileIcons: (state: any, profileIcons: any) => {
            state.profileIcons = profileIcons;
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
        }
    }
})
