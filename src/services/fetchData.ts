import { supabase } from "./supabaseApi";
import { Alert } from "react-native";

interface products {
    id: string;
    name: string;
    price: string;
    description: string;
    seller: string;
    category: string;
    image: string[];
    likes: number;
}

type productListing = products[]

export const fetchProduct = async (query: string | null): Promise<productListing | null> => {
    try {
        const { data, error } = query 
        ? await supabase
        .from('products')
        .select('id, name, price, description, seller, category, image, likes')
        .eq('category', query)
        : await supabase
        .from('products')
        .select('id, name, price, description, seller, category, image, likes')
        .eq('category', query);

        if (error && error.code !== 'PGRST116') {
            console.error('Error fetching profile: ', error);
            Alert.alert('Error', 'Failed to fetch user profile');
            return null;
        }
        return data as productListing | null;
    } catch (error) {
        console.error(error);
        return null;
    }
};