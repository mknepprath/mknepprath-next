import { NextApiRequest, NextApiResponse } from 'next'

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

interface PokemonEvolutionBase {
    form: string;
    pokemon_id: number;
    pokemon_name: string;
}

interface Evolution extends PokemonEvolutionBase {
    candy_required: number;
}

interface PokemonEvolution extends PokemonEvolutionBase {
    evolutions: Evolution[];
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const releasedPokemonDict: { [key: string]: Pokemon } = await fetch("https://pogoapi.net/api/v1/released_pokemon.json")
        .then((response) => response.json())
    const releasedPokemon = Object.values(releasedPokemonDict)

    console.log('a')

    // for (let p in releasedPokemon) {
    //     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${releasedPokemon[p].id}`)
    //     const data = await response.json()
    //     releasedPokemon[p].sprite = data.sprites.front_default
    //     console.count('.')
    // }

    console.log('b')

    const nestingPokemonDict: { [key: string]: Pokemon } = await fetch("https://pogoapi.net/api/v1/nesting_pokemon.json")
        .then((response) => response.json())

    const raidBossesDict: {
        current: { [key: string]: [RaidBoss] }
    } = await fetch("https://pogoapi.net/api/v1/raid_bosses.json")
        .then((response) => response.json())
    const raidBosses = Object.keys(raidBossesDict.current).flatMap(tier => raidBossesDict.current[tier])

    const shadowPokemonDict: { [key: string]: Pokemon } = await fetch("https://pogoapi.net/api/v1/shadow_pokemon.json")
        .then((response) => response.json())

    const shinyPokemonDict: { [key: string]: ShinyPokemon } = await fetch("https://pogoapi.net/api/v1/shiny_pokemon.json")
        .then((response) => response.json())

    const possibleDittoDict: { [key: string]: Pokemon } = await fetch("https://pogoapi.net/api/v1/possible_ditto_pokemon.json")
        .then((response) => response.json())

    const evolutions: PokemonEvolution[] = await fetch("https://pogoapi.net/api/v1/pokemon_evolutions.json")
        .then((response) => response.json())

    const regionals = [83, 115, 122, 128, 214, 222, 324, 335, 336, 337, 338, 369, 313, 314, 357, 417, 422, 439, 441, 455, 480, 481, 482, 511, 512, 513, 514, 515, 516, 537, 538, 539, 550, 556, 561, 626, 631, 632]

    const hydratedPokemon: HydratedPokemon[] = releasedPokemon.map(
        p => ({
            ...p,
            evolvesFrom: evolutions.find(e => e.evolutions.find(e => e.pokemon_id === p.id))?.pokemon_id,
            nests: Boolean(nestingPokemonDict[p.id]),
            possibleDitto: Boolean(possibleDittoDict[p.id]),
            raidBoss: Boolean(raidBosses.find(boss => boss.id === p.id)),
            raidBossTier: String(raidBosses.find(boss => boss.id === p.id)?.tier || 0),
            regional: Boolean(regionals.includes(p.id)),
            shadowObtainable: Boolean(shadowPokemonDict[p.id]),
            shinyReleased: Boolean(shinyPokemonDict[p.id]),
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`,
        })
    )

    hydratedPokemon.sort((a, b) => a.id - b.id)

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(hydratedPokemon))
}