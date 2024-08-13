import { useGetPokemonAbility } from '@/hooks/api/abilities/useGetPokemonAbility';
import { PokemonServices } from '@/services/pokemon/pokemon.services';
import { abilitesObj } from '@/types/pokemonAbilites';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import {Text, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const pokemonServices = new PokemonServices();

interface Props {}

export const PokemonDetails = (props:Props): JSX.Element => {
    const { id } = useLocalSearchParams();
    const { data, isLoading } = useGetPokemonAbility(id as string)

    if(isLoading){
        <></>
    }

    const pokemonDetail = data as abilitesObj

    return (
        <SafeAreaView>
            {
                pokemonDetail.abilities.map((item)=> (
                    <React.Fragment key={item.ability.url}>
                        <Text>{item.ability.name}</Text>
                    </React.Fragment>
                ))
            }
        </SafeAreaView>
    );
};

export default PokemonDetails;
