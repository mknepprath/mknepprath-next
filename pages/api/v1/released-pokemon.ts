import { NextApiRequest, NextApiResponse } from 'next'

interface Pokemon {
    id: number;
    name: string;
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

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const releasedPokemonDict: { [key: string]: Pokemon } = await fetch("https://pogoapi.net/api/v1/released_pokemon.json")
        .then((response) => response.json())
    const nestingPokemonDict: { [key: string]: Pokemon } = await fetch("https://pogoapi.net/api/v1/nesting_pokemon.json")
        .then((response) => response.json())
    const raidBossesDict: {
        current: { [key: string]: [RaidBoss] }
    } = await fetch("https://pogoapi.net/api/v1/raid_bosses.json")
        .then((response) => response.json())
    const shadowPokemonDict: { [key: string]: Pokemon } = await fetch("https://pogoapi.net/api/v1/shadow_pokemon.json")
        .then((response) => response.json())
    const shinyPokemonDict: { [key: string]: ShinyPokemon } = await fetch("https://pogoapi.net/api/v1/shiny_pokemon.json")
        .then((response) => response.json())
    const possibleDittoDict: { [key: string]: Pokemon } = await fetch("https://pogoapi.net/api/v1/possible_ditto_pokemon.json")
        .then((response) => response.json())

    const releasedPokemon = Object.values(releasedPokemonDict)

    const raidBosses = Object.keys(raidBossesDict.current).flatMap(tier => raidBossesDict.current[tier])

    const hydratedPokemon: HydratedPokemon[] = releasedPokemon.map(
        p => ({
            ...p,
            nests: Boolean(nestingPokemonDict[p.id]),
            raidBoss: Boolean(raidBosses[p.id]),
            raidBossTier: String(raidBosses.find(boss => boss.id === p.id)?.tier || 0),
            shadowObtainable: Boolean(shadowPokemonDict[p.id]),
            shinyReleased: Boolean(shinyPokemonDict[p.id]),
            possibleDitto: Boolean(possibleDittoDict[p.id])
        })
    )

    hydratedPokemon.sort((a, b) => a.id - b.id)

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(hydratedPokemon))
}