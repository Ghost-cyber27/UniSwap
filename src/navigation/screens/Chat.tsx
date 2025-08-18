import { useState, useEffect } from 'react';
import { StyleSheet, FlatList, SafeAreaView, ActivityIndicator} from 'react-native';
import { ChatListing } from '../../component/ChatListing';
import { supabase } from '../../services/supabaseApi';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AppStackParamList } from '..';

type HomeTabsScreenNavigationProp = NavigationProp<AppStackParamList, 'HomeTabs'>;

interface Message {
  id: string;
  text: string;
  sendername: string;
  username: string;
  created_at: string;
  readMessage: boolean;
}

//add a boolean attribute to the table

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<HomeTabsScreenNavigationProp>();

  const fetchMessages = async () => {
    try {
      const {data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', {ascending: true});

      if(error) throw error;
      setLoading(false);
      setMessages(data || []);
      console.log("successful")
    } catch (error) {
      console.log('Error fetching: ', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [])

  const data = [
    {id: '1', name: 'Isaac', message: "Hello there, ready to make a purchase", bool: true},
    {id: '2', name: 'Jessica', message: "Ready for hook up", bool: false}];

  return (
    <SafeAreaView style={styles.container}>
      {loading 
      ? <ActivityIndicator size={30}/> 
      : <FlatList 
        data={messages}
        renderItem={({ item }) => <ChatListing created_at={item.created_at} name={item.sendername} onPress={() => navigation.navigate('ChatDetails', {
          id: item.id,
          username: item.username,
          sendername: item.sendername,
          text: item.text,
          created_at: item.created_at,
          readMessage: item.readMessage
        })} activeMessage={item.readMessage} />}
      />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 10,
    backgroundColor: 'white'
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
});