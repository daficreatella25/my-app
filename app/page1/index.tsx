import { Button, Image, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Text } from "react-native";
import { useAuth } from "@/store/AuthStore";
import { PokemonServices } from "@/services/pokemon/pokemon.services";
import { useEffect, useState } from "react";
import { pokemonObj } from "@/types/pokemon";
import { getPokemonImage } from "@/services/main";

const pokemonServices = new PokemonServices();
const LIMIT = 50;

export default function Page1Screen() {
  const [pokemonData, setPokemonData] = useState<pokemonObj[]>([]);
  const [page, setPage] = useState(0);

  const isPrevPageExist = page > 0;

  useEffect(() => {
    const getPokemon = async () => {
      // Should do try catch
      const data = await pokemonServices.getPokemonByPage({
        offset: page * LIMIT,
        limit: LIMIT,
      });

      if (data?.results) {
        setPokemonData(data?.results);
      }
    };

    getPokemon();
  }, [page]);

  const handleNextPage = () => setPage((prevState) => prevState + 1);

  const handlePrevPage = () => setPage((prevState) => prevState + 1);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.containerPokemon}>
        {pokemonData.map((item, idx) => (
          <Link href={{
            pathname: `/page1/details/[id]`,
            params: {id: idx+1}
            }}>
            <View key={item.name}>
              <Text>{item.name}</Text>
              <Text>{}</Text>
              <Image
                source={{ uri: getPokemonImage(idx + 1 + page * 50) }}
                style={{ width: 50, height: 50 }}
              />
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
      {/* <Button onPress={logout} title="Logout" />
      <Link href="/">Go back to Home</Link> */}
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
