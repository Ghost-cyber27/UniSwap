import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

interface Props {
    id: string,
    name: string;
    price: string;
    image: string[];
    onPress: () => void
}

const SearchCard = ({image, name, price, onPress} : Props) => {
    return(
        <View>
            <TouchableOpacity style={styles.card} onPress={onPress}>
                <View style={{padding: 5}}>
                    <Image source={{uri: image[0]}} style={styles.img}/>
                </View>
                <View style={{justifyContent: "center"}}>
                    <Text style={styles.textName}>{name}</Text>
                    <Text style={styles.textPrice}>₦{price}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

export {SearchCard};

const styles = StyleSheet.create({
    card: {
        width: 320,
        height: 130,
        borderRadius: 10,
        flexDirection: "row",
        backgroundColor: "white",
        margin: 5,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 10},
        shadowRadius: 10,
        shadowOpacity: 0.1,
    },
    img: {
        width: 120,
        height: 120,
        borderRadius: 5,
    },
    textName: {
        fontSize: 20,
        fontWeight: "500"
    },
    textPrice: {
        fontSize: 20,
        fontWeight: "500",
        color: "blue"
    },
});