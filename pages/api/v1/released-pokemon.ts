import { NextApiRequest, NextApiResponse } from "next";

const POGO_API = "https://pogoapi.net/api/v1";
const POKE_API_SPRITE_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

const isNotRocket = (e: PokemonForm) =>
  !(e.form === "Purified" || e.form === "Shadow");

interface Pokemon {
  id: number;
  name: string;
  sprite?: string; // Hydrated with PokéAPI
}

type Form = "Normal" | "Alola" | "Galarian" | "Shadow" | "Purified";

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
  form: Form;
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
  const [
    releasedPokemonDict,
    raidBossesDict,
    buddyDistanceDict,
    candyRequiredDict,
    rarityDict,
    shinyPokemonDict,
    evolutions,
    types,
    babies,
  ]: [
    { [key: string]: Pokemon },
    { [key: string]: RaidBoss[] },
    { [key: string]: BuddyDistance[] },
    { [key: string]: CandyRequired[] },
    { [key: string]: PokemonRarity[] },
    { [key: string]: ShinyPokemon },
    PokemonEvolution[],
    PokemonTypes[],
    Pokemon[]
  ] = await Promise.all([
    fetch(`${POGO_API}/released_pokemon.json`).then((response) =>
      response.json()
    ),
    fetch(`${POGO_API}/raid_bosses.json`)
      .then((response) => response.json())
      .then(({ current }) => current),
    fetch(`${POGO_API}/pokemon_buddy_distances.json`).then((response) =>
      response.json()
    ),
    fetch(`${POGO_API}/pokemon_candy_to_evolve.json`).then((response) =>
      response.json()
    ),
    fetch(`${POGO_API}/pokemon_rarity.json`).then((response) =>
      response.json()
    ),
    fetch(`${POGO_API}/shiny_pokemon.json`).then((response) => response.json()),
    fetch(`${POGO_API}/pokemon_evolutions.json`).then((response) =>
      response.json()
    ),
    fetch(`${POGO_API}/pokemon_types.json`).then((response) => response.json()),
    fetch(`${POGO_API}/baby_pokemon.json`).then((response) => response.json()),
  ]);

  const releasedPokemon = Object.values(releasedPokemonDict);
  const raidBosses = Object.keys(raidBossesDict).flatMap(
    (tier) => raidBossesDict[tier]
  );
  const buddyDistances = Object.keys(buddyDistanceDict)
    .flatMap((amount) => buddyDistanceDict[amount])
    .filter((buddy) => isNotRocket(buddy));
  const candyRequired = Object.keys(candyRequiredDict)
    .flatMap((amount) => candyRequiredDict[amount])
    .filter((pokemon) => isNotRocket(pokemon));
  const rarity = Object.keys(rarityDict).flatMap(
    (pokemon) => rarityDict[pokemon]
  );

  const regionals = [
    83, // Farfetch’d
    115, // Kangaskhan
    122, // Mr. Mime
    128, // Tauros
    214, // Heracross
    222, // Corsola
    324, // Torkoal
    335, // Zangoose
    336, // Seviper
    337, // Lunatone
    338, // Solrock
    369, // Relicanth
    313, // Volbeat
    314, // Illumise
    357, // Tropius
    417, // Pachirisu
    422, // Shellos
    439, // Mime Jr.
    441, // Chatot
    455, // Carnivine
    480, // Uxie
    481, // Mesprit
    482, // Azelf
    511, // Pansage
    512, // Simisage
    513, // Pansear
    514, // Simisear
    515, // Panpour
    516, // Simipour
    538, // Throh
    539, // Sawk
    550, // Basculin
    556, // Maractus
    561, // Sigilyph
    626, // Bouffalant
    631, // Heatmor
    632, // Durant
    707, // Klefki
    764, // Comfey
  ];

  const hydratedPokemon: HydratedPokemon[] = releasedPokemon.map((p) => ({
    ...p,
    baby: Boolean(babies.find((baby) => baby.id === p.id)),
    candyDistance:
      buddyDistances.find((buddy) => buddy.pokemon_id === p.id)?.distance || 0,
    candyRequired:
      candyRequired.find(
        (pokemon) =>
          evolutions.find((e) =>
            e.evolutions.find((e) => e.pokemon_id === p.id && isNotRocket(e))
          )?.pokemon_id === pokemon.pokemon_id
      )?.candy_required || 0,
    forms: [], // deprecated
    evolvesFrom: evolutions.find((e) =>
      e.evolutions.find((e) => e.pokemon_id === p.id)
    )?.pokemon_id,
    evolvesFromForm: [],
    nests: false, // deprecated
    possibleDitto: false, // deprecated
    raidBoss: Boolean(raidBosses.find((boss) => boss.id === p.id)),
    raidBossTier: String(
      raidBosses.find((boss) => boss.id === p.id)?.tier || 0
    ),
    rarity: rarity.find((pokemon) => pokemon.pokemon_id === p.id)?.rarity,
    regional: Boolean(regionals.includes(p.id)),
    shadowObtainable: false, // deprecated
    shinyReleased: Boolean(shinyPokemonDict[p.id]),
    shinySprite: `${POKE_API_SPRITE_URL}/shiny/${p.id}.png`,
    sprite: `${POKE_API_SPRITE_URL}/${p.id}.png`,
    types: types.find((pokemon) => pokemon.pokemon_id === p.id)?.type,
  }));

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  if (process.env.NODE_ENV !== "development")
    res.setHeader("Cache-Control", "max-age=86400");
  res.end(JSON.stringify(hydratedPokemon));
};
