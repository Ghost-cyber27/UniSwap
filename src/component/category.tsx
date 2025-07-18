import React, { useState } from 'react';
import {TouchableOpacity, Text} from 'react-native';

interface buttonItem {
    id: string;
    title: string;
    defaultColor: string;
    pressedColor: string;
}

interface CategoryButtonProps {
    title: string;
    onPress: (id: string) => void;
    id: string;
    defaultColor?: string;
    pressedColor?: string;  
}

const Category: React.FC<CategoryButtonProps> = ({
    title,
    onPress,
    id,
    defaultColor = 'white',
    pressedColor = 'black'
}) => {
    const [isPressed, setIsPressed] = useState<boolean>(false);

    return(
        <TouchableOpacity 
        style={{ 
            backgroundColor: isPressed 
            ? pressedColor 
            : defaultColor,
            gap: 10,
            margin: 5,
         }}
         onPressIn={() => setIsPressed(true)}
         onPressOut={() => setIsPressed(false)}
         onPress={() => onPress(id)}
         activeOpacity={1}
         >
            <Text style={{
                borderRadius: 5, 
                borderWidth: 1, 
                borderColor: "black",
                color: isPressed 
                ? "white" 
                : "black",
                fontSize: 16,
                padding: 5
            }}>{title}</Text>
         </TouchableOpacity>
    )
}

export {Category, buttonItem}
