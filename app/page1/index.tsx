import { Button, Image, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Text } from "react-native";
import { useAuth } from "@/store/AuthStore";
import { PokemonServices } from "@/services/pokemon/pokemon.services";
import { useEffect, useState } from "react";
import { pokemonObj } from "@/types/pokemon";
import { getPokemonImage } from "@/services/main";
import Spacer from "@/components/spacer";
import { useGetPokemon } from "@/hooks/api/pokemon/pokemon";

const pokemonServices = new PokemonServices();
const LIMIT = 50;

export default function Page1Screen() {
  const [page, setPage] = useState(0);
  const {data:pokemonData, isLoading} = useGetPokemon({
    offset: page * LIMIT,
    limit: LIMIT
  })

  const isPrevPageExist = page > 0;

  const handleNextPage = () => setPage((prevState) => prevState + 1);

  const handlePrevPage = () => setPage((prevState) => prevState - 1);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.containerPokemon}>
        {pokemonData?.results.map((item, idx) => (
          <Link href={{
            pathname: `/page1/details/[id]`,
            params: {id: idx+1}
            }}>
            <View key={item.name}>
              <Text>{item.name}</Text>
              <Image
                source={{ uri: getPokemonImage(idx + 1 + page * 50) }}
                style={{ width: 50, height: 50 }}
              />
              <Spacer heigth={20}/>
            </View>
          </Link>
        ))}
      </ScrollView>
      <View style={styles.paginationContainer}>
        {isPrevPageExist ? (
          <Button title="Prev" onPress={handlePrevPage} />
        ) : (
          <></>
        )}

        <Button title="Next" onPress={handleNextPage} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  containerPokemon: {
    maxHeight: 400,
  },
  paginationContainer: {
    flexDirection: "row",
  },
});
