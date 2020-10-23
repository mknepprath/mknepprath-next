import { NextApiRequest, NextApiResponse } from 'next'

interface Pokemon {
    id: number;
    name: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const releasedPokemon: Pokemon[] = await fetch("https://pogoapi.net/api/v1/released_pokemon.json")
        .then((response) => response.json())

    let entries = Object.values(releasedPokemon)
    entries.sort((a, b) => a.id - b.id)

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(entries))
}