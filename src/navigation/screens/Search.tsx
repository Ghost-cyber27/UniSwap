import {useState} from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  FlatList 
} from 'react-native';
import { SearchCard } from '../../component/searchCard';

//an input with button for search
//flatlist of searched items

export function Search() {
  const [isQuery, setIsQuery] = useState<string>("");

  const data = [
    {id: "1", name: "Samsung 210", img: require("C:/Users/HP PC/Documents/react native projects/upcoming/UniSwap/assets/logo.jpg"), price: 2520},
    {id: "2", name: "Iphon 10", img: require("C:/Users/HP PC/Documents/react native projects/upcoming/UniSwap/assets/logo.jpg"), price: 3520},
    {id: "3", name: "Techno Spark 10", img: require("C:/Users/HP PC/Documents/react native projects/upcoming/UniSwap/assets/logo.jpg"), price: 1520},
    {id: "4", name: "Itel 210", img: require("C:/Users/HP PC/Documents/react native projects/upcoming/UniSwap/assets/logo.jpg"), price: 2690},
    {id: "5", name: "Blackberry 210", img: require("C:/Users/HP PC/Documents/react native projects/upcoming/UniSwap/assets/logo.jpg"), price: 2480}
  ];

  return (
    <View style={styles.container}>
      <View style={{padding: 10, gap: 5}}>
        
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
