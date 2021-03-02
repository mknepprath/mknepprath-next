import { NextApiRequest, NextApiResponse } from "next";

const POGO_API = "https://pogoapi.net/api/v1";
const POKE_API_SPRITE_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

interface Pokemon {
  id: number;
  name: string;
  sprite?: string; // Hydrated with PokéAPI
}

interface ShinyPokemon extends Pokemon {
  found_wild: boolean;
  found_raid: boolean;
  found_egg: boolean;
  found_evolution: boolean;
}

interface RaidBoss extends Pokemon {
  boosted_weather: [string];
  form: string;
  max_boosted_cp: number;
  max_unboosted_cp: number;
  min_boosted_cp: number;
  min_unboosted_cp: number;
  possible_shiny: boolean;
  tier: number | string;
  type: [string];
}

interface HydratedPokemon extends Pokemon {
  nests: boolean;
  raidBoss: boolean;
  raidBossTier: string;
  shadowObtainable: boolean;
  shinyReleased: boolean;
}

interface PokemonBase {
  pokemon_id: number;
  pokemon_name: string;
}

interface PokemonRarity extends PokemonBase {
  rarity: string;
}

interface PokemonTypes extends PokemonBase {
  type: string[];
}

interface PokemonForm extends PokemonBase {
  form: "Normal" | "Alola" | "Galarian" | "Shadow" | "Purified";
}

interface Evolution extends PokemonForm {
  candy_required: number;
}

interface PokemonEvolution extends PokemonForm {
  evolutions: Evolution[];
}

interface BuddyDistance extends PokemonForm {
  distance: number;
}

interface CandyRequired extends PokemonForm {
  candy_required: number;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const releasedPokemonDict: { [key: string]: Pokemon } = await fetch(
    `${POGO_API}/released_pokemon.json`
  ).then((response) => response.json());
  const releasedPokemon = Object.values(releasedPokemonDict);

  const nestingPokemonDict: { [key: string]: Pokemon } = await fetch(
    `${POGO_API}/nesting_pokemon.json`
  ).then((response) => response.json());

  const raidBossesDict: {
    current: { [key: string]: [RaidBoss] };
  } = await fetch(`${POGO_API}/raid_bosses.json`).then((response) =>
    response.json()
  );
  const raidBosses = Object.keys(raidBossesDict.current).flatMap(
    (tier) => raidBossesDict.current[tier]
  );

  const buddyDistanceDict: { [key: string]: BuddyDistance[] } = await fetch(
    `${POGO_API}/pokemon_buddy_distances.json`
  ).then((response) => response.json());
  const buddyDistances = Object.keys(buddyDistanceDict)
    .flatMap((amount) => buddyDistanceDict[amount])
    .filter((buddy) => buddy.form !== "Purified");

  const candyRequiredDict: { [key: string]: CandyRequired[] } = await fetch(
    `${POGO_API}/pokemon_candy_to_evolve.json`
  ).then((response) => response.json());
  const candyRequired = Object.keys(candyRequiredDict)
    .flatMap((amount) => candyRequiredDict[amount])
    .filter((pokemon) => pokemon.form !== "Purified");

  const rarityDict: { [key: string]: PokemonRarity[] } = await fetch(
    `${POGO_API}/pokemon_rarity.json`
  ).then((response) => response.json());
  const rarity = Object.keys(rarityDict).flatMap(
    (pokemon) => rarityDict[pokemon]
  );

  const shadowPokemonDict: { [key: string]: Pokemon } = await fetch(
    `${POGO_API}/shadow_pokemon.json`
  ).then((response) => response.json());

  const shinyPokemonDict: { [key: string]: ShinyPokemon } = await fetch(
    `${POGO_API}/shiny_pokemon.json`
  ).then((response) => response.json());

  const possibleDittoDict: { [key: string]: Pokemon } = await fetch(
    `${POGO_API}/possible_ditto_pokemon.json`
  ).then((response) => response.json());

  const evolutions: PokemonEvolution[] = await fetch(
    `${POGO_API}/pokemon_evolutions.json`
  ).then((response) => response.json());

  const types: PokemonTypes[] = await fetch(
    `${POGO_API}/pokemon_types.json`
  ).then((response) => response.json());

  const regionals = [
    83,
    115,
    122,
    128,
    214,
    222,
    324,
    335,
    336,
    337,
    338,
    369,
    313,
    314,
    357,
    417,
    422,
    439,
    441,
    455,
    480,
    481,
    482,
    511,
    512,
    513,
    514,
    515,
    516,
    538,
    539,
    550,
    556,
    561,
    626,
    631,
    632,
    707,
  ];

  const hydratedPokemon: HydratedPokemon[] = releasedPokemon.map((p) => ({
    ...p,
    candyDistance:
      buddyDistances.find((buddy) => buddy.pokemon_id === p.id)?.distance || 0,
    candyRequired:
      candyRequired.find(
        (pokemon) =>
          evolutions.find((e) =>
            e.evolutions.find((e) => e.pokemon_id === p.id)
          )?.pokemon_id === pokemon.pokemon_id
      )?.candy_required || 0,
    evolvesFrom: evolutions.find((e) =>
      e.evolutions.find((e) => e.pokemon_id === p.id)
    )?.pokemon_id,
    nests: Boolean(nestingPokemonDict[p.id]),
    possibleDitto: Boolean(possibleDittoDict[p.id]),
    raidBoss: Boolean(raidBosses.find((boss) => boss.id === p.id)),
    raidBossTier: String(
      raidBosses.find((boss) => boss.id === p.id)?.tier || 0
    ),
    rarity: rarity.find((pokemon) => pokemon.pokemon_id === p.id)?.rarity,
    regional: Boolean(regionals.includes(p.id)),
    shadowObtainable: Boolean(shadowPokemonDict[p.id]),
    shinyReleased: Boolean(shinyPokemonDict[p.id]),
    shinySprite: `${POKE_API_SPRITE_URL}/shiny/${p.id}.png`,
    sprite: `${POKE_API_SPRITE_URL}/${p.id}.png`,
    types: types.find((pokemon) => pokemon.pokemon_id === p.id)?.type,
  }));

  hydratedPokemon.sort((a, b) => a.id - b.id);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "max-age=86400");
  res.end(JSON.stringify(hydratedPokemon));
};
