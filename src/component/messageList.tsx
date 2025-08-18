import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

interface Message {
    id: string;
    text: string;
    created_at: string;
}

const MessageList: React.FC<Message> = ({
    id,
    text,
    created_at
}) => {
    return(
        <View style={[styles.messageContainer, id ? styles.currentUserMessage : styles.otherUserMessage]}>
            <View style={styles.avatar}>
                <Ionicons name="chatbubble-outline" size={40} color='white'/>
            </View>
            <View style={[styles.messageBubble, id ? styles.currentUserBubble : styles.otherUserBubble]}> 
                <Text style={[styles.messageText, id ? styles.messageTextCurrent : styles.messageTextOther]} >{text}</Text>
                <Text style={styles.timestamp}>{created_at}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
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
});

export {MessageList}