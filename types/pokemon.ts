import { withPagination } from "./general";

export interface pokemonDto {
  offset: number;
  limit: number;
  query?:string
}

export interface pokemonObj {
  name: string;
}

export type pokemonRespObj = withPagination<pokemonObj>;


