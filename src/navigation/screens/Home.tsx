import { useState } from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  View, 
  Text,
  FlatList,
  ActivityIndicator 
} from 'react-native';
import { Category, buttonItem } from '../../component/category';
import { ProductCard } from '../../component/productCard';
import { useFetch } from '../../services/useFetch';
import { fetchProductCategory } from '../../services/fetchData';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AppStackParamList } from '..';

type HomeTabsScreenNavigationProp = NavigationProp<AppStackParamList, 'HomeTabs'>;

export function Home() {
  const [isFocused, setIsFocused] = useState<string>("");
  const navigation = useNavigation<HomeTabsScreenNavigationProp>();

  const { 
    data, 
    loading: productLoading, 
    error: productError 
  } = useFetch(() => fetchProductCategory(isFocused));
  
  const category = [
    {title: "All", id: "1", defaultColor: "white", pressedColor: "black"},
    {title: "Men Clothing", id: "2", defaultColor: "white", pressedColor: "blue"},
    {title: "Woman Clothing", id: "3", defaultColor: "white", pressedColor: "purple"},
    {title: "Electronics", id: "4", defaultColor: "white", pressedColor: "orange"},
    {title: "Beauty", id: "5", defaultColor: "white", pressedColor: "black"},
    {title: "Computing", id: "6", defaultColor: "white", pressedColor: "grey"},
    {title: "Phone & Tablet", id: "7", defaultColor: "white", pressedColor: "red"},
  ];

  const handleButtonPress = (buttonId: string) => {
    console.log("button id: ", buttonId);
    if (buttonId == "1") {
      setIsFocused("");
      console.log("----------------");
      console.log(isFocused);
    } else if (buttonId == "2") {
      setIsFocused("Men Clothing");
      console.log("----------------");
      console.log(isFocused)
    }else if (buttonId == "3") {
      setIsFocused("Woman Clothing");
      console.log("----------------");
      console.log(isFocused)
    } else if (buttonId == "4") {
      setIsFocused("Electronics");
      console.log("----------------");
      console.log(isFocused)
    } else if (buttonId == "5") {
      setIsFocused("Beauty");
      console.log("----------------");
      console.log(isFocused)
    } else if (buttonId == "6") {
      setIsFocused("Computing");
      console.log("----------------");
      console.log(isFocused)
    } else if (buttonId == "7") {
      setIsFocused("Phone & Tablet");
      console.log("----------------");
      console.log(isFocused)
    }
  }

  const renderButtonItem = ({ item }: { item: buttonItem}) => (
    <Category
      id={item.id}
      title={item.title}
      onPress={handleButtonPress}
      defaultColor={item.defaultColor}
      pressedColor={item.pressedColor}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={{flexDirection: 'row', padding: 5, marginTop: 20, justifyContent: 'center', borderBottomWidth: 1}} >
          <Text style={{ fontSize: 24, padding: 10, fontWeight: "500", left: '5%' }}>Discover</Text>
          <Ionicons name="notifications-circle-outline" size={40} color='black' style={{left: '25%', top: '20%'}} />
        </View>
        <Text style={{ fontSize: 24, padding: 10, fontWeight: "500" }}>Categories</Text>
        <View>
          <FlatList 
            data={category}
            renderItem={renderButtonItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        {productLoading ? (
          <ActivityIndicator
            size="large"
            color= 'black'
            style={{margin: 10, justifyContent: "center"}}
          />
          ) : productError ? (
            <Text>Error: {productError?.message}</Text>
          ): (
          <FlatList
              data={data}
              renderItem={({item}) => 
              <ProductCard 
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
              numColumns={2}
              showsVerticalScrollIndicator={false}
          />)}
      </View>
    </SafeAreaView>
  );
}

//how to use the onRefresh function in FlatList

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
/*
Categories
Men Clothing
Women Clothing
Electronics
Beauty
Computing
Phone & Tablet
Fashion
*/
