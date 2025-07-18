import { useState } from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  View, 
  ScrollView, 
  Text, 
  TouchableOpacity,
  FlatList 
} from 'react-native';
import { Category, buttonItem } from '../../component/category';

export function Home() {
  const [isFocused, setIsFocused] = useState<string>("1");

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
      setIsFocused("1");
    } else if (buttonId == "2") {
      setIsFocused("2");
    }else if (buttonId == "3") {
      setIsFocused("3");
    } else if (buttonId == "4") {
      setIsFocused("4");
    } else if (buttonId == "5") {
      setIsFocused("5");
    } else if (buttonId == "6") {
      setIsFocused("6");
    } else if (buttonId == "7") {
      setIsFocused("7");
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

  const product = () => {
    if (isFocused == "1") {
      return <Text style={{fontSize: 24, fontWeight: "bold"}}>Product 1</Text>
    } else if (isFocused == "2") {
      return <Text style={{fontSize: 24, fontWeight: "bold"}}>Product 2</Text>
    }else if (isFocused == "3") {
      return <Text style={{fontSize: 24, fontWeight: "bold"}}>Product 3</Text>
    }else if (isFocused == "4") {
      return <Text style={{fontSize: 24, fontWeight: "bold"}}>Product 4</Text>
    }else if (isFocused == "5") {
      return <Text style={{fontSize: 24, fontWeight: "bold"}}>Product 5</Text>
    }else if (isFocused == "6") {
      return <Text style={{fontSize: 24, fontWeight: "bold"}}>Product 6</Text>
    }else if (isFocused == "7") {
      return <Text style={{fontSize: 24, fontWeight: "bold"}}>Product 7</Text>
    }else{
      return <Text style={{fontSize: 24, fontWeight: "bold"}}>No Product</Text>
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={{ fontSize: 24, padding: 10, fontWeight: "500" }}>Categories</Text>
        <FlatList 
          data={category}
          renderItem={renderButtonItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        {product()}
      </ScrollView>
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
