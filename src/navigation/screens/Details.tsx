import React, {useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, FlatList } from 'react-native';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { AppStackParamList } from ".."; 
import Ionicons from '@expo/vector-icons/Ionicons';

type DetailsScreenNavigationProp = RouteProp<AppStackParamList, 'Details'>;

export function Details(){
  //Id: string; name: string, price: string, description: string, likes: number, images: string[], seller: string, category: string
  //find a place to put seller and category
    const route = useRoute<DetailsScreenNavigationProp>();
    const { Id, name, description, price, likes, images, category, seller } = route.params;
    const navigation = useNavigation();
    const [img, setImg] = useState<string>(images[0]);

    return(
        <SafeAreaView style={styles.container}>
      <View style={{ width: '100%', height: '40%'}}>
          <Image source={{uri: img}} style={{ width: 'auto', height: '100%', resizeMode: "cover" }} />
          <View style={{ flexDirection: "row" , top: 25, flex: 1, gap: 190, position: "absolute", height: '80%'}}>
            <TouchableOpacity style={{
            width: '20%', 
            height: '15%',
            backgroundColor: "black", 
            top: 30, 
            left: 20, 
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            }}
            onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={{
            width: '20%', 
            height: '15%',
            backgroundColor: "white", 
            top: 30, 
            left: 20, 
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            }}>
              <Ionicons name="heart" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      <View style={{backgroundColor: "white", borderBottomWidth: 1, height: '15%', width: '100%', flexDirection: "row", justifyContent: "space-between", padding: 5}}>
        <FlatList 
          data={images}
          renderItem={({ item }) => <TouchableOpacity style={{elevation: 5, margin: 4}} onPress={() => setImg(item)}><Image source={{uri: item}} style={{width: 80, height: 80, marginTop: 10, borderRadius: 10}} /></TouchableOpacity>}
          horizontal
        />
        {/*images.map((item, i) => (<TouchableOpacity style={{elevation: 5}} onPress={() => setImg(item)}><Image source={{uri: item}} key={i} style={{width: 80, height: 80, marginTop: 10, borderRadius: 10}} /></TouchableOpacity>))*/}
      </View>
      <View style={{padding: 10, backgroundColor: "white", height: 'auto'}}>
        <View style={{ flexDirection: "row", gap: 150 }}>
          <Text style={{ fontSize: 24, fontWeight: "500" }}>{name}</Text>
          <Text style={{ 
            fontSize: 16, 
            fontWeight: "400", 
            borderWidth: 1, 
            borderRadius: 10,
            justifyContent: "center" ,
            padding: 5,
            color: "white",
            backgroundColor: "red",
            borderColor: "white"
            }}>{likes} Likes</Text>
        </View>
        <View style={{ marginTop: 10, padding: 5 }}>
          <Text style={{ fontSize: 24, fontWeight: "400" }}>Description</Text>
          <Text>{description}</Text>
        </View>
      </View>
      <View style={{ 
        flexDirection: "row", 
        width: '100%',
        height: '10%',
        position: "absolute",
        top: '85%',
        borderTopWidth: 1,
        gap: 80,
        padding: 10,
        backgroundColor: "white"
         }}>
        <Text style={{ fontSize: 24, fontWeight: "400" }}>₦{price}</Text>
        <TouchableOpacity style={{ width: '50%', height: 40, backgroundColor: 'green', alignItems: "center", justifyContent: "center", borderRadius: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: "400", color: "white" }}>CHAT WITH SELLER</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffffff',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
  },
})