import { pokemonDto, pokemonObj, pokemonRespObj } from "@/types/pokemon";
import { ENDPOINT, apiInstance } from "../main";
import { abilitesObj } from "@/types/pokemonAbilites";

export class PokemonServices {
  async getPokemonByPage(param: pokemonDto) {
    let endpoint = `${ENDPOINT.pokemon}?offset=${param.offset}&limit=${param.limit}`;
    if(param.query){
      endpoint = `${ENDPOINT.pokemon}/${param.query}`
    }
    const res = await apiInstance.get<pokemonRespObj | pokemonObj, unknown>(endpoint);

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
