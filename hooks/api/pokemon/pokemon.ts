import { ENDPOINT } from "@/services/main"
import { pokemonSerivces } from "@/services/pokemon/pokemon.services"
import { pokemonDto, pokemonRespObj } from "@/types/pokemon"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"

export const useGetPokemon = (param: pokemonDto) => {
    return useQuery({
        queryFn: () => pokemonSerivces.getPokemonByPage(param),
        queryKey: [param, ENDPOINT.pokemon]
    })
}



export const useInfinitePokemon = (initialParam: pokemonDto) => {
    return useInfiniteQuery({
      queryKey: [ENDPOINT.pokemon, 'infinite'],
      queryFn: ({ pageParam }) => {
        const param: pokemonDto = {
          offset: (pageParam as pokemonDto)?.offset ?? initialParam.offset * initialParam.limit,
          limit: (pageParam as pokemonDto)?.limit ?? initialParam.limit
        };
        return pokemonSerivces.getPokemonByPage(param);
      },
      getNextPageParam: (lastPage, allPages) => {
        if(!lastPage) return undefined

        if (lastPage.next) {
          return {
            offset: allPages.length * initialParam.limit,
            limit: initialParam.limit,
          };
        }
        return undefined;
      },
      initialPageParam: initialParam,
    });
  };