import { pokemonDto, pokemonObj, pokemonRespObj } from "@/types/pokemon";
import { ENDPOINT, apiInstance } from "../main";
import { abilitesObj } from "@/types/pokemonAbilites";

export class PokemonServices {
  async getPokemonByPage(param: pokemonDto) {
    console.log(param)
    const endpoint = `${ENDPOINT.pokemon}?offset=${param.offset}&limit=${param.limit}`;
    const res = await apiInstance.get<pokemonRespObj, unknown>(endpoint);

    if (!res.ok) throw res;

    return res.data;
  }

  async getPokemonById(id: string){
    const endpoint = `${ENDPOINT.pokemonDetail(id)}`;
    console.log(endpoint)

    const res = await apiInstance.get<abilitesObj, unknown>(endpoint)

    if(!res.ok)  throw res

    return res.data
  }
}

export const pokemonSerivces = new PokemonServices()
