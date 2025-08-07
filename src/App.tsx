//import { Asset } from 'expo-asset';
import React, { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { View, StyleSheet, Alert } from 'react-native';
import { supabase } from './services/supabaseApi';
import AppNavigator from './navigation';
import LoadingIndicator from './component/LoadingIndicator';
import { Details } from './navigation/screens/Details';



export function App() {
  const [session, setSession] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for authentication state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log('Auth state changed:', _event);
      setSession(session?.user || null); // Update session state
      setLoading(false); // Authentication state has been checked
    });

    // Initial check for session
    const getInitialSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting initial session:', error.message);
        Alert.alert('Session Error', error.message);
      }
      setSession(session?.user || null);
      setLoading(false);
      console.log('Session User:', session?.user.email);
    };

    getInitialSession();

    // Clean up the listener when the component unmounts
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator isLoading={true} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <AppNavigator session={session} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});
