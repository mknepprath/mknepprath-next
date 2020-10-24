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
    tier: number;
    type: [string];
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

    const releasedPokemon = Object.values(releasedPokemonDict)

    const hydratedPokemon = releasedPokemon.map(
        p => ({
            ...p,
            nests: Boolean(nestingPokemonDict[p.id]),
            raidBoss: Boolean(raidBossesDict.current["1"].find(boss => boss.id === p.id)) ||
                Boolean(raidBossesDict.current["2"].find(boss => boss.id === p.id)) ||
                Boolean(raidBossesDict.current["3"].find(boss => boss.id === p.id)) ||
                Boolean(raidBossesDict.current["4"].find(boss => boss.id === p.id)) ||
                Boolean(raidBossesDict.current["5"].find(boss => boss.id === p.id)) ||
                Boolean(raidBossesDict.current["6"].find(boss => boss.id === p.id)),
            shadowObtainable: Boolean(shadowPokemonDict[p.id]),
            shinyReleased: Boolean(shinyPokemonDict[p.id])
        })
    )

    hydratedPokemon.sort((a, b) => a.id - b.id)

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(hydratedPokemon))
}