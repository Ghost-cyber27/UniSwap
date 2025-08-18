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
  Modal,
} from 'react-native';
import { createClient } from '@supabase/supabase-js';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { AppStackParamList } from "..";

type ChatDetailsScreenNavigationProp = RouteProp<AppStackParamList, 'Details'>;

//id, create_at, username, sendername, text(attributes of the table)

// Supabase configuration - these would be replaced with your own keys
const supabaseUrl = 'https://your-project.supabase.co';
const supabaseAnonKey = 'your-anon-key';

// Create a single Supabase client for your app
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define the type for a message object
interface Message {
  id: number;
  text: string;
  sendername: string;
  username: string;
  created_at: string;
  readMessage: boolean
}

export function ChatDetail()  {
  // State variables
  const route = useRoute<ChatDetailsScreenNavigationProp>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [userId, setUserId] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  // Define the Supabase table name
  const tableName = 'messages';

  // Function to show a modal alert
  const showAlert = (message: string) => {
    setModalMessage(message);
    setModalVisible(true);
  };

  // Function to fetch messages from Supabase
  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from(tableName)//<Message>
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error: any) {
      console.error('Error fetching messages:', error);
      showAlert(`Failed to load messages: ${error.message}`);
    }
  };

  // useEffect hook to handle initial setup and real-time subscription
  useEffect(() => {
    // Generate a unique user ID for this session if it doesn't exist
    // In a real app, you would use something like AsyncStorage to persist this.
    const currentUser = `user_${Math.random().toString(36).substring(2, 9)}`;
    setUserId(currentUser);

    // Initial fetch of messages
    fetchMessages();

    // Set up real-time subscription for new messages
    const channel = supabase
      .channel('realtime_messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: tableName }, (payload: { new: Message }) => {
        // Append the new message to the existing list
        setMessages((prevMessages) => [...prevMessages, payload.new]);
      })
      .subscribe();

    // Cleanup function to unsubscribe from the channel
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Function to handle sending a new message
  const handleSendMessage = async () => {
    if (newMessage.trim() === '' || !userId) {
      return;
    }

    try {
      const { error } = await supabase.from(tableName).insert({
        text: newMessage,
        user_id: userId,
        user_name: `User_${userId.substring(0, 7)}`,
        created_at: new Date().toISOString(),
      });

      if (error) throw error;
      setNewMessage('');
    } catch (error: any) {
      console.error('Error sending message:', error);
      showAlert(`Failed to send message: ${error.message}`);
    }
  };

  // Render a single message item
  const renderMessage = ({ item }: { item: Message }) => {
    const isCurrentUser = item.id === userId;
    return (
      <View style={[styles.messageContainer, isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage]}>
        {!isCurrentUser && (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.username.charAt(0)}</Text>
          </View>
        )}
        <View style={[styles.messageBubble, isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble]}>
          <Text style={[styles.messageText, isCurrentUser ? styles.messageTextCurrent : styles.messageTextOther]}>
            {item.text}
          </Text>
          <Text style={styles.timestamp}>
            {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#047857" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Supabase Chat</Text>
          <Text style={styles.headerUserId}>
            Your ID: <Text style={styles.userIdText}>{userId}</Text>
          </Text>
        </View>

        {/* Message List */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMessage}
          contentContainerStyle={styles.messageList}
          inverted={false}
        />

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type your message..."
            placeholderTextColor="#888"
            editable={!!userId}
          />
          <TouchableOpacity
            style={[styles.sendButton, (!userId || newMessage.trim() === '') && styles.sendButtonDisabled]}
            onPress={handleSendMessage}
            disabled={!userId || newMessage.trim() === ''}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>

        {/* Custom Modal for Alerts */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Alert</Text>
              <Text style={styles.modalText}>{modalMessage}</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// React Native StyleSheet for styling
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#047857',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerUserId: {
    fontSize: 12,
    color: '#e2e8f0',
  },
  userIdText: {
    fontFamily: 'monospace',
  },
  messageList: {
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 4,
  },
  currentUserMessage: {
    justifyContent: 'flex-end',
  },
  otherUserMessage: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 12,
    maxWidth: '75%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.0,
    elevation: 2,
  },
  currentUserBubble: {
    backgroundColor: '#34d399',
    borderBottomRightRadius: 2,
  },
  otherUserBubble: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
  },
  messageTextCurrent: {
    color: '#fff',
  },
  messageTextOther: {
    color: '#1f2937',
  },
  timestamp: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'right',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  avatarText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#4b5563',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  textInput: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 16,
    fontSize: 16,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#047857',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  modalButton: {
    backgroundColor: '#047857',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});


