import { Button, FlatList, ListRenderItem, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PokemonServices } from "@/services/pokemon/pokemon.services";
import { useEffect, useState } from "react";
import Spacer from "@/components/spacer";
import { useGetPokemon, useInfinitePokemon } from "@/hooks/api/pokemon/pokemon";
import { globalStyles } from "@/styles/global";
import { COLORS } from "@/styles/colors";
import PokemonCard from "@/components/page1/PokemonCard";
import { pokemonObj } from "@/types/pokemon";
import { SCREEN_WIDTH } from "@/config/constant";

const pokemonServices = new PokemonServices();
const LIMIT = 20;
const PAGE_OPTION = [1,2,3,4,5,6,7,8,9]

export default function Page1Screen() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("")
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch
  } = useInfinitePokemon({ offset: page, limit: LIMIT, query: query });

  useEffect(()=>{
    console.log("CALLED : ", page - 1)
    refetch()

  },[page, query])

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handlePage = (selectedPage:number) => setPage(selectedPage)

  const renderItem: ListRenderItem<pokemonObj> = ({ item, index }) => (
    <PokemonCard data={item} id={index + 1} />
  );

  const pokemonDataFlat = data?.pages ? data.pages.flatMap(page => page?.results) : []

  return (
    <SafeAreaView style={[styles.container, globalStyles.screen]}>
      <TextInput 
          style={styles.textInputContainer} placeholder="Search" onChangeText={setQuery} 
          value={query}/>
      <Spacer heigth={20}/>
      <View style={styles.paginationContainer}>
        {
          PAGE_OPTION.map((item)=> (
            <Pressable onPress={()=>handlePage(item)} key={item} style={styles.paginationBtn}>
              <Text style={styles.paginationText}>
                {item}
              </Text>
            </Pressable>
          ))
        }
      </View>
      <Spacer heigth={20}/>
      {
        isLoading ? 
          <Text>Loading ....</Text>
        :
          <FlatList
            data={pokemonDataFlat as pokemonObj[]}
            renderItem={renderItem}
            numColumns={2}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={() => 
              isFetchingNextPage ? <Text>Loading more...</Text> : null
            }
            ItemSeparatorComponent={() => <Spacer width={20} heigth={20} />}
            contentContainerStyle={styles.listContainer}
          />
      }
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center'
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  containerPokemon: {
    flex: 1
  },
  paginationContainer: {
    flexDirection: "row",
    gap: 14,
    justifyContent:'center'
  },
  paginationBtn:{
    backgroundColor: COLORS.gray1,
    width: 22,
    height: 22,
    borderRadius: 2,
    borderColor: COLORS.white,
    borderWidth: 1
    // color: COLORS.white
  },
  paginationText:{
    color: COLORS.white,
    textAlign: 'center'
  },
  pokemonGrid: {
    justifyContent: 'center',
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  textInputContainer: {
    width: SCREEN_WIDTH * 0.8,
    backgroundColor: COLORS.gray1,
    borderRadius: 4,
    height: 40,
    color: COLORS.white,
    paddingLeft: 10
  }
});
