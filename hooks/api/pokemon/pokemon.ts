import { ENDPOINT } from "@/services/main"
import { pokemonSerivces } from "@/services/pokemon/pokemon.services"
import { pokemonDto } from "@/types/pokemon"
import { useQuery } from "@tanstack/react-query"

export const useGetPokemon = (param: pokemonDto) => {
    return useQuery({
        queryFn: () => pokemonSerivces.getPokemonByPage(param),
        queryKey: [param, ENDPOINT.pokemon]
    })
}