import { supabase } from "./supabaseApi";

const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching messages:', error);
      alert(`Failed to load messages: ${error}`);
    }
  };