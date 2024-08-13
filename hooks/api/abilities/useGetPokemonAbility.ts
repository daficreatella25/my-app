import { ENDPOINT } from "@/services/main"
import { PokemonServices } from "@/services/pokemon/pokemon.services";
import { useQuery } from "@tanstack/react-query"

const pokemonServices = new PokemonServices();

export const useGetPokemonAbility = (id: string) => {
    return useQuery({
        queryKey: [ENDPOINT.pokemonDetail(id)],
        queryFn: ()=> pokemonServices.getPokemonById(id)
    })
}