import { Text } from '@react-navigation/elements';
import { StyleSheet, View, Button } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../..';

// Define the type for the navigation prop of HomeScreen
type LoginScreenNavigationProp = NavigationProp<RootStackParamList, 'Login'>;

export function Login() {
  const navigation = useNavigation<LoginScreenNavigationProp>()
  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <Button title='Next Page' onPress={() => navigation.navigate('HomeTabs')}/>
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
