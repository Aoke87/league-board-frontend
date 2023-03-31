const path = require("path");

const fs = require("fs");

const jsonPath = path.join(__dirname, "public", "data", "de_DE");
const championJsonPath = path.join(jsonPath, "champion.json");
const itemJsonPath = path.join(jsonPath, "item.json");

const rawChampionData = fs.readFileSync(championJsonPath, "utf8");
const rawItemData = fs.readFileSync(itemJsonPath, "utf8");

const championJson = JSON.parse(rawChampionData);
const itemJson = JSON.parse(rawItemData);

// reduce item size
for (const [key, value] of Object.entries(itemJson.data)) {
    itemJson.data[key] = { image: value.image };
    itemJson.groups = {};
    itemJson.tree = {};
    itemJson.basic = {};
}

// reduce champion size
for (const [key, value] of Object.entries(championJson.data)) {
    championJson.data[key] = {
        image: value.image,
        id: value.id,
    };
}

fs.writeFileSync(path.join(jsonPath, "item_small.json"), JSON.stringify(itemJson));
fs.writeFileSync(path.join(jsonPath, "champion_small.json"), JSON.stringify(championJson));
