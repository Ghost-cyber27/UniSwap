import { useState } from 'react';
import { Text } from '@react-navigation/elements';
import { StyleSheet, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import LoadingIndicator from '../../../component/LoadingIndicator';
import { authService } from '../../../services/auth';
import { AuthStackParamList } from '../..';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type ForgotPasswordScreenNavigationProp = NavigationProp<AuthStackParamList, 'ForgotPassword'>;

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();

  const handlePasswordReset = async () => {
      if (!email) {
        Alert.alert('Error', 'Please enter your email address.');
        return;
      }
  
      setLoading(true);
      const { error } = await authService.passwordReset(email);
      setLoading(false);
  
      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert(
          'Success',
          'If an account with that email exists, a password reset link has been sent to your email address.'
        );
        navigation.goBack(); // Go back to login screen
      }
    };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        {email ? <Text>{email}</Text> : <Text>Login Screen</Text>}
        <TextInput placeholder='Email@gmail.com' onChangeText={(text) => setEmail(text)}/>
          <TouchableOpacity style={styles.button} onPress={handlePasswordReset} disabled={loading}>
            <Text style={styles.buttonText}>Send Reset Link</Text>
          </TouchableOpacity>
    
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.linkText}>Back to Login</Text>
          </TouchableOpacity>
    
          <LoadingIndicator isLoading={loading} />
      </View>
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
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    marginTop: 15,
    color: '#007AFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
