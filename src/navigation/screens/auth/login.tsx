import { useState } from 'react';
import { StyleSheet, View, Button, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AuthStackParamList } from '../..';
import { authService } from '../../../services/auth';
import LoadingIndicator from '../../../component/LoadingIndicator';

// Define the type for the navigation prop of HomeScreen
type LoginScreenNavigationProp = NavigationProp<AuthStackParamList, 'Login'>;

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true);
    const { error } = await authService.signIn(email, password);
    setLoading(false);

    if (error) {
      Alert.alert('Login Error', error.message);
    } else {
      // Navigation will be handled by the App.tsx's auth state listener
      Alert.alert('Success', 'Logged in successfully!');
    }
  };

  const navigation = useNavigation<LoginScreenNavigationProp>()
  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <TextInput placeholder='Email@gmail.com' onChangeText={(text) => setEmail(text)}/>
      <TextInput placeholder='Password' onChangeText={(text) => setPassword(text)}/>
      <Button title='Next Page' onPress={() => handleLogin()}/>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text>Forgot Password</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text>Don't have an account, Sign Up</Text>
      </TouchableOpacity>
      <LoadingIndicator isLoading={loading} />
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
