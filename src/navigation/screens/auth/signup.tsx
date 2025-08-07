import { useState } from 'react';
import { Text } from '@react-navigation/elements';
import { StyleSheet, View, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { authService } from '../../../services/auth';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AuthStackParamList } from '../..';
import LoadingIndicator from '../../../component/LoadingIndicator';

type SignupScreenNavigationProp = NavigationProp<AuthStackParamList, 'Signup'>;

export function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [matric, setMatric] = useState("");
  const [uni, setUni] = useState("");
  const [state, setState] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true);
    const { error } = await authService.signUp(email, name, password, phone, state, uni, matric);
    setLoading(false);

    if (error) {
      Alert.alert('Signup Error', error.message);
    } else {
      Alert.alert('Success', 'Account created!.');
      navigation.navigate('Login'); // Navigate back to login after signup
    }
  };

  const navigation = useNavigation<SignupScreenNavigationProp>()
  return (
    <View style={styles.container}>
      <Text>Signup Screen</Text>
      <TextInput placeholder='Full Name' onChangeText={(text) => setName(text)}/>
      <TextInput placeholder='Email@gmail.com' onChangeText={(text) => setEmail(text)}/>
      <TextInput placeholder='Matric No' onChangeText={(text) => setMatric(text)}/>
      <TextInput placeholder='Phone Number' onChangeText={(text) => setPhone(text)}/>
      <TextInput placeholder='University' onChangeText={(text) => setUni(text)}/>
      <TextInput placeholder='State' onChangeText={(text) => setState(text)}/>
      <TextInput placeholder='Password' onChangeText={(text) => setPassword(text)}/>
      <Button title='Next Page' onPress={() => handleSignup()}/>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text>Already have an account, Login</Text>
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
