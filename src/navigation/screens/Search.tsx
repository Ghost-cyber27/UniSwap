import {useState} from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  FlatList,
  ActivityIndicator 
} from 'react-native';
import { SearchCard } from '../../component/searchCard';
import { useFetch } from '../../services/useFetch';
import { fetchProduct } from '../../services/fetchData';
import { AppStackParamList } from '..';
import { useNavigation, NavigationProp } from '@react-navigation/native';


type SearchTabsScreenNavigationProp = NavigationProp<AppStackParamList, 'HomeTabs'>;
//an input with button for search
//flatlist of searched items

export function Search() {
  const [isQuery, setIsQuery] = useState<string | null>(null);
  const navigation = useNavigation<SearchTabsScreenNavigationProp>()

  const { 
    data, 
    loading: searchLoading, 
    error: searchError 
  } = useFetch(() => fetchProduct(isQuery));

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', padding: 5, marginTop: 20, justifyContent: 'center', borderBottomWidth: 1}} >
        <Text style={{ fontSize: 24, padding: 10, fontWeight: "500"}}>Search</Text>
      </View>
      <View style={{padding: 10, gap: 5}}>
        {searchLoading ? (
          <ActivityIndicator
            size="large"
            color= 'black'
            style={{margin: 10, justifyContent: "center"}}
          />
        ) : searchError ? (
          <Text>Error: {searchError?.message}</Text>
        ): (
          <FlatList
            data={data}
            renderItem={({item}) => <SearchCard 
            id={item.id}
            image={item.images} 
            name={item.name} 
            price={item.price}
            onPress={() => navigation.navigate("Details",{
              Id: item.id,
              name: item.name,
              price :item.price,
              description: item.description,
              images: item.images,
              likes: item.likes,
              seller: item.seller,
              category: item.category
            })}
            />}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={
              <>
                <View style={styles.textInputContainer}>
                  <TextInput
                    placeholder='Search for product'
                    keyboardType='default'
                    onChangeText={(text) => setIsQuery(text)}
                    style={styles.textInput}
                  />
                  <Text style={{fontSize: 16, fontWeight: "500"}}>Search Results For <Text style={{color: "blue", fontStyle: "italic"}}>{isQuery}</Text></Text>
                </View>
              </>
            }
            showsVerticalScrollIndicator={false}
            //ListEmptyComponent={}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInputContainer: {
    padding: 7
  },
  textInput: {
    width: 320,
    height: 50,
    borderRadius: 10,
    borderWidth: 2
  }
});
/*
<FlatList
          data={data}
          renderItem={({item}) => <SearchCard 
          image={item.img} 
          name={item.name} 
          price={item.price}
          />}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <>
              <View style={styles.textInputContainer}>
                <TextInput
                  placeholder='Search for product'
                  keyboardType='default'
                  onChangeText={(text) => setIsQuery(text)}
                  style={styles.textInput}
                />
                <Text style={{fontSize: 16, fontWeight: "500"}}>Search Results For <Text style={{color: "blue", fontStyle: "italic"}}>{isQuery}</Text></Text>
              </View>
            </>
          }
          showsVerticalScrollIndicator={false}
          //ListEmptyComponent={}
        />
*/