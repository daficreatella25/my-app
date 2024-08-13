import { ENDPOINT, queryClient } from "@/services/main"
import { pokemonSerivces } from "@/services/pokemon/pokemon.services"
import { pokemonDto, pokemonRespObj } from "@/types/pokemon"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"

export const useGetPokemon = (query: string) => {
    return useQuery({
        queryFn: () => pokemonSerivces.getPokemonByPage({query: query, limit: 1, offset:0}),
        queryKey: [query, ENDPOINT.pokemon],
        enabled: query ? true : false
    })
}

export const useInfinitePokemon = (initialParam: pokemonDto) => {
    return useInfiniteQuery({
      queryKey: [ENDPOINT.pokemon, initialParam],
      queryFn: ({ pageParam }) => {
        const param: pokemonDto = {
          offset: (pageParam as pokemonDto)?.offset ?? initialParam.offset * initialParam.limit,
          limit: (pageParam as pokemonDto)?.limit ?? initialParam.limit,
          query: initialParam.query
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