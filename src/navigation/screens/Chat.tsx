import { Text } from '@react-navigation/elements';
import { StyleSheet, View } from 'react-native';

export function Chat() {
  return (
    <View style={styles.container}>
      <Text>Chat Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
});
/*
// screens/DetailsScreen.tsx
import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App'; // Import your RootStackParamList

// Define the type for the route prop of DetailsScreen
type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

// Define the type for the navigation prop of DetailsScreen (if you also need to navigate from here)
type DetailsScreenNavigationProp = NavigationProp<RootStackParamList, 'Details'>;

function DetailsScreen() {
  const route = useRoute<DetailsScreenRouteProp>();
  const navigation = useNavigation<DetailsScreenNavigationProp>();

  // Destructure params with type safety
  const { itemId, otherParam } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>Item ID: {JSON.stringify(itemId)}</Text>
      {otherParam && <Text>Other Param: {JSON.stringify(otherParam)}</Text>}
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go to Details again" onPress={() => navigation.push('Details', { itemId: Math.random() })} />
      <Button title="Go back to first screen in stack" onPress={() => navigation.popToTop()} />
    </View>
  );
}

export default DetailsScreen;
*/