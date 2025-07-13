import { Text, Button } from '@react-navigation/elements';
import { StyleSheet, View } from 'react-native';

export function Search() {
  return (
    <View style={styles.container}>
      <Text>Search</Text>
      <Button screen="HomeTabs">Go to Home</Button>
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
});
