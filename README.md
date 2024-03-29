# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.


Get version from:
`https://ddragon.leagueoflegends.com/api/versions.json`

Download assets from: 
`https://ddragon.leagueoflegends.com/cdn/dragontail-{VERSION}.tgz`
e.g. `https://ddragon.leagueoflegends.com/cdn/dragontail-13.18.1.tgz`

Unzip Files
Go to folder /{VERSION}/data/de_DE

Copy
/champion.json to public/data/de_DE/champion.json
/item.json to public/data/de_DE/item.json
/summoner.json to public/data/de_DE/summoner.json

Go to folder /{VERSION}/img/sprite/ to public/sprite

Execute the script reduceJsonFileSizes.js to reduce the size of the json files
