import React from 'react';
import {TouchableOpacity, View, Image, Text, StyleSheet} from 'react-native';
//import { ImageSourcePropType } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface ChatCardProps {
    onPress: () => void;
    created_at: string;
    name: string;
    activeMessage: boolean;
}

const ChatListing: React.FC<ChatCardProps> = ({
    onPress,
    created_at,
    name,
    activeMessage
}) => {
    return(
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.icon}> 
                <Ionicons name="chatbubble-outline" size={40} color='white'/>
            </View>
            <View>
                {activeMessage 
                ? <Text style={{fontWeight: "bold", fontSize: 30}}>{name}</Text> 
                : <Text style={{fontSize: 30}}>{name}</Text>}
                <Text style={{fontWeight: "300", fontSize: 16, fontStyle: 'italic'}}>{created_at}</Text>{/*use created_at instead */}
            </View>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        gap: 10
    },
    icon: {
        width: '15%',
        height: '100%',
        borderCurve: 'circular',
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 45
    }

});

export {ChatListing}