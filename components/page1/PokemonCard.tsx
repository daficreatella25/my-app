import { getPokemonImage } from '@/services/main';
import { pokemonObj } from '@/types/pokemon';
import { Link } from 'expo-router';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Spacer from '../spacer';
import { COLORS } from '@/styles/colors';
import { SCREEN_WIDTH } from '@/config/constant';

interface Props {
  data: pokemonObj
  id: number
}

export const PokemonCard = (props:Props): JSX.Element => {
  const item = props.data

  function extractPokemonNumber(url: string) {
    // Use a regular expression to match the number at the end of the URL
    const match = url.match(/\/(\d+)\.png$/);
    
    // If a match is found, return the number as an integer
    if (match && match[1]) {
      return parseInt(match[1], 10);
    }
    
    // If no match is found, return null
    return null;
  }

  const imageUrl = props.data?.sprites?.front_default ? props.data?.sprites?.front_default : getPokemonImage(props.id)

  return (
    <View style={styles.container}>
      <View key={item.name} style={styles.pokemonCard}>
        <Link href={{
          pathname: `/page1/details/[id]`,
          params: {id: extractPokemonNumber(imageUrl)}
          }}>
          <View key={item.name}>
            {
              props.data?.sprites?.front_default ? 
                <Image
                  source={{ uri: imageUrl }}
                  style={styles.pokemonCardImage}
                  />
              :
                <Image
                  source={{ uri: imageUrl }}
                  style={styles.pokemonCardImage}
                  />
            }

            <Text style={styles.pokemonCardText}>{item.name}</Text>

            <Spacer heigth={20}/>
          </View>
        </Link>
      </View>
    </View>
  )
};

export default PokemonCard;


const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * 0.38,
  },
  pokemonCard: {
    backgroundColor: COLORS.gray1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
    // width: SCREEN_WIDTH * 0.45
  },
  pokemonCardImage: {
    width: 80,
    height: 80
  },
  pokemonCardText: {
    color: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  }
});