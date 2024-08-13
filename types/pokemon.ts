import { withPagination } from "./general";

export interface pokemonDto {
  offset: number;
  limit: number;
  query?:string
}

export interface pokemonObj {
  name: string;
  sprites?: {
    front_default: string
  }
}

export type pokemonRespObj = withPagination<pokemonObj>;


