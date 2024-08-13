import { useGetPokemonAbility } from '@/hooks/api/abilities/useGetPokemonAbility';
import { PokemonServices } from '@/services/pokemon/pokemon.services';
import { globalStyles } from '@/styles/global';
import { abilitesObj, PokemonAbility, PokemonDetailObj, PokemonStat, PokemonType } from '@/types/pokemonAbilites';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const pokemonServices = new PokemonServices();

interface Props {}

export const PokemonDetails = (props: Props): JSX.Element => {
    const { id } = useLocalSearchParams();
    const { data, isLoading } = useGetPokemonAbility(id as string);

    const pokemonDetail = data as PokemonDetailObj;

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    return (
        <SafeAreaView style={[globalStyles.screen, styles.container]}>
            <ScrollView>
                {pokemonDetail?.sprites?.front_default && (
                    <Image
                        source={{ uri: pokemonDetail.sprites.front_default }}
                        style={styles.sprite}
                    />
                )}

                <Text style={styles.name}>{pokemonDetail.name}</Text>

                <View style={styles.typesContainer}>
                    {pokemonDetail?.types?.map((item: PokemonType) => (
                        <Text key={item.type.name} style={styles.type}>
                            {item.type.name}
                        </Text>
                    ))}
                </View>

                <View style={styles.statsContainer}>
                    <Text style={styles.sectionTitle}>Stats:</Text>
                    {pokemonDetail?.stats?.map((item: PokemonStat) => (
                        <Text key={item.stat.name} style={styles.stat}>
                            {item.stat.name}: {item.base_stat}
                        </Text>
                    ))}
                </View>

                <View style={styles.abilitiesContainer}>
                    <Text style={styles.sectionTitle}>Abilities:</Text>
                    {pokemonDetail?.abilities?.map((item: PokemonAbility) => (
                        <Text key={item.ability.name} style={styles.ability}>
                            {item.ability.name}
                        </Text>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    sprite: {
        width: 200,
        height: 200,
        alignSelf: 'center',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16,
        color: 'white',
    },
    typesContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 16,
    },
    type: {
        padding: 8,
        marginHorizontal: 4,
        backgroundColor: '#e0e0e0',
        borderRadius: 4,
    },
    statsContainer: {
        marginBottom: 16,
    },
    abilitiesContainer: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'white',
    },
    stat: {
        fontSize: 16,
        marginBottom: 4,
        color: 'white',
    },
    ability: {
        fontSize: 16,
        marginBottom: 4,
        color: 'white',
    },
    additionalInfo: {
        color: 'white',
    },
});

export default PokemonDetails
