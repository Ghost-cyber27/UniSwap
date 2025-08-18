import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { AppStackParamList } from "..";
import { supabase } from '../../services/supabaseApi';
import { MessageList } from '../../component/messageList';

type ChatDetailsScreenNavigationProp = RouteProp<AppStackParamList, 'ChatDetails'>;

interface Message {
  id: number;
  text: string;
  sendername: string;
  username: string;
  created_at: string;
  readMessage: boolean
}

export function ChatDetails (){

    const route = useRoute<ChatDetailsScreenNavigationProp>();
    const { id, username, sendername, text, readMessage, created_at } = route.params;
    const [message, setMessage] = useState([]);
    const [newMessage, setNewMessage] = useState<string>('');

    /*useEffect(() => {
        // Set up real-time subscription for new messages
    
    const channels = supabase.channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'message' },
        (payload) => {
          console.log('Change received!', payload)
        }
      )
      .subscribe()
    // Cleanup function to unsubscribe from the channel
    return () => {
      supabase.removeChannel(channel);
    };
    }, [])*/

    const handleSendMessage = async () => {
      if(newMessage === '') return;
      try {
        console.log('send message');
      } catch (error) {
        console.log('Error: ',error);
      }
    }

    return(
        <SafeAreaView>
          <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
          >
            <Text>lksdjb</Text>
            {/* Header */}
            {/* Message List */}
          </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

/*import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

export function Example() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  )
}*/