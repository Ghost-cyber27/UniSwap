import { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, LayoutChangeEvent } from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring, } from 'react-native-reanimated';


export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const [dimension, setDimension] = useState({height: 20, width: 100});
  const buttonWidth = dimension.width / state.routes.length;
  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimension({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width
    });
  }
  const tabPositionX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return{
      transform: [{translateX: tabPositionX.value}]
    }
  })

  return (
    <View style={styles.tabbar} onLayout={onTabbarLayout}>
      <Animated.View style={[animatedStyle,{
        position: 'absolute',
        backgroundColor: "#222",
        borderRadius: 30,
        marginHorizontal: 12,
        height: dimension.height - 15,
        width: buttonWidth - 20,
      }]}/>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        // const label =
        //   options.tabBarLabel !== undefined
        //     ? options.tabBarLabel
        //     : options.title !== undefined
        //       ? options.title
        //       : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, {duration: 3500})

          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const icon = () => {
          switch (route.name) {
            case "home":
              return <Feather name="home" size={25} style={{ color: isFocused ? '#fff' : '#222' }}/>;
            case "search":
              return <FontAwesome name="search" size={24} style={{ color: isFocused ? '#fff' : '#222' }}/>;
            case "upload":
              return <Entypo name="upload" size={24} style={{ color: isFocused ? '#fff' : '#222' }}/>;
            case "chat":
              return <Entypo name="chat" size={24} style={{ color: isFocused ? '#fff' : '#222' }}/>;
            case "profile":
              return <AntDesign name="profile" size={24} style={{ color: isFocused ? '#fff' : '#222' }}/>;
            default:
              return null;
          }
        }

        const scale = useSharedValue(0);

        useEffect(() => {
          scale.value = withSpring(typeof 
            isFocused === 'boolean' 
            ? (isFocused ? 1 : 0) 
            : isFocused, 
          {duration: 350})
        }, [scale, isFocused]);

        const animatedIconStyle = useAnimatedStyle(() => {
          const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
          const top = interpolate(scale.value, [0, 1], [0, 9]);
          return{
            transform: [{
              scale: scaleValue
            }],
            top
          }
        })

        const animatedTextStyle = useAnimatedStyle(() => {
          const opacity = interpolate(scale.value, [0,1], [1,0]);

          return{opacity}
        })

        return (
          <Pressable
            key={route.name}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabbarItem}
          >
            <Animated.View style={animatedIconStyle}>
              {icon()}
            </Animated.View>
            <Animated.Text style={[{ color: isFocused ? '#673ab7' : '#222', fontSize: 12 }, animatedTextStyle]}>{route.name}</Animated.Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
    tabbar: {
        position: 'absolute',
        bottom: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 35,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 10},
        shadowRadius: 10,
        shadowOpacity: 0.1,
    },
    tabbarItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5
    }
}); 