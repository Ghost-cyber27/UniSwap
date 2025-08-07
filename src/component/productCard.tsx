import React from 'react';
import {TouchableOpacity, View, Image, Text} from 'react-native';
//import { ImageSourcePropType } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface ProductCardProps {
    image: string[];//ImageSourcePropType[];
    onPress: () => void;
    id: string;
    name: string;
    price: string;
    //likes: number;  
}

const ProductCard: React.FC<ProductCardProps> = ({
    image,
    onPress,
    id,
    name,
    price,
    //likes
}) => {

    return(
        <TouchableOpacity onPress={() => onPress()} style={{
            width: 170, 
            height: 200, 
            backgroundColor: 'white', 
            margin: 5, 
            borderRadius: 10,
            padding: 5
            }}>
            {image 
            ? <Image 
            source={{uri: image[0]}} 
            style={{
                width: 160, 
                height: 120, 
                borderRadius: 10, 
            }}/> 
            : <View style={{
                width: 160, 
                height: 120, 
                alignItems: "center",
                justifyContent: "center"
            }}>
                <MaterialCommunityIcons
                name='image-area'
                size={30}
                color='black'
            />
            </View> 
            }
            {/*<View style={{
                width: 160, 
                height: 120, 
                backgroundColor: 'black',
                borderRadius: 10, 
            }}></View>*/}
            <View style={{flexDirection: "row", padding: 5, gap: 10}}>
                <View>
                    <Text style={{fontSize: 16, fontWeight: "500"}}>{id}</Text>
                    <Text style={{fontSize: 16, fontWeight: "500"}}>{name}</Text>
                    <Text style={{fontSize: 20, fontWeight: "bold"}}>₦{price}</Text>
                </View>
                <View style={{flexDirection: "row",}}>
                    <Ionicons name="heart" size={20} style={{ color: "red"}}/>
                    <Text style={{fontSize: 15, fontWeight: "500"}}>.</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export {ProductCard}