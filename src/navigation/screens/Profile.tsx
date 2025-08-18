import { useState, useEffect } from 'react';
import { StyleSheet, Alert, View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { authService } from '../../services/auth';
import { User } from '@supabase/supabase-js';
import LoadingIndicator from '../../component/LoadingIndicator';
import Ionicons from '@expo/vector-icons/Ionicons';


/*type Props = StaticScreenProps<{
  user: string;
}>;
{ route }: Props
{route.params.user}*/

/*
storing metadata with auth
*/

export function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [matric, setMatric] = useState();
  const [uni, setUni] = useState();
  const [state, setState] = useState();

  useEffect(() => {
    fetchUserData();
  }, [])

  const fetchUserData = async () => {
    setLoading(true);
    const { user: currentUser, error } = await authService.getCurrentUser();
    setLoading(false);

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }

    if (currentUser) {
      setUser(currentUser);
      setName(currentUser.user_metadata?.name || '');
      setPhone(currentUser.user_metadata?.phone || '');
      setMatric(currentUser.user_metadata?.matric || '');
      setUni(currentUser.user_metadata?.uni || '');
      setState(currentUser.user_metadata?.state || '');
      // setWebsite(currentUser.user_metadata?.website || '');
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    const { error } = await authService.signOut();
    setLoading(false);

    if (error) {
      Alert.alert('Logout Error', error.message);
    } else {
      // Navigation will be handled by the App.tsx's auth state listener
      Alert.alert('Success', 'Logged out successfully!');
    }
  };

  if (!user) {
      return (
        <View style={styles.container}>
          <LoadingIndicator isLoading={true} />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      );
    }


  return (
    <View style={styles.container}>
      <View style={{flexDirection: "row", gap: 5,}}>
        <View style={styles.imgView}>
          <Ionicons name="person-outline" size={40} color=' black'/>
          {/*<Image style={styles.img} source={require("C:/Users/HP PC/Documents/react native projects/upcoming/UniSwap/assets/logo.jpg")}/>*/}
        </View>
        <View style={styles.profileInfoView}>
          <Text style={styles.profileInfoText}><Text>{'>'}</Text> {name}</Text>
          <Text style={styles.profileInfoText}><Text>{'>'}</Text> {matric}</Text>
          <Text style={styles.profileInfoText}><Text>{'>'}</Text> {user.email}</Text>
          <Text style={styles.profileInfoText}><Text>{'>'}</Text> {user.user_metadata?.uni}</Text>
          <Text style={styles.profileInfoText}><Text>{'>'}</Text> No. of listing: 4</Text>
        </View>
      </View>
      <View style={styles.contentView}>
        <TouchableOpacity>
          <Text style={styles.contentText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.contentText}>View Product Listing</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.contentText}>Favorite</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.contentText}>Terms and Condition</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleLogout()}>
          <Text style={styles.contentText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingTop: 50
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#555',
  },
  imgView: {
    width: 150,
    height: 200,
    backgroundColor: "black",
    borderRadius: 10,
    padding: 5
  },
  img: {
    width: 140,
    height: 190,
    borderRadius: 10
  },
  profileInfoView: {
    width: 190,
    height: 200,
    backgroundColor: "black",
    borderRadius: 10,
    padding: 10,
    gap: 15
  },
  profileInfoText: {
    fontSize: 16,
    color: "white",
    fontWeight: "500"
  },
  contentView: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: 350,
    height: 500,
    top: 2,
    padding: 5,
    gap: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  contentText: {
    color: "black",
    fontSize: 30,
    fontWeight: "600",
    borderWidth: 2,
    borderColor: "black",
    marginTop: 10,
    borderRadius: 10,
    width: 340,
    height: 55,
    justifyContent: "center"
  }
});


