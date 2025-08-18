import { supabase } from "./supabaseApi";
import { Alert } from "react-native";

interface products {
    id: string;
    name: string;
    price: string;
    description: string;
    seller: string;
    category: string;
    images: string[];
    likes: number;
}

type productListing = products[]

export const fetchProduct = async (query: string | null): Promise<productListing | null> => {
    try {
        const { data, error } = query 
        ? await supabase
        .from('products')
        .select('*') 
        .eq("name", query)
        : await supabase
        .from('products')
        .select('*')
        ;

        if (error && error.code !== 'PGRST116') {
            console.error('Error fetching profile: ', error);
            Alert.alert('Error', 'Failed to fetch user profile');
            return null;
        }
        console.log('this is the data: ', data);
        return data as productListing | null;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const fetchProductCategory = async (query: string | null): Promise<productListing | null> => {
    try {
        const { data, error } = query 
        ? await supabase
        .from('products')
        .select('*') 
        .eq("category", query)
        : await supabase
        .from('products')
        .select('*')
        ;

        if (error && error.code !== 'PGRST116') {
            console.error('Error fetching profile: ', error);
            Alert.alert('Error', 'Failed to fetch user profile');
            return null;
        }
        console.log('this is the data: ', data);
        return data as productListing | null;
    } catch (error) {
        console.error(error);
        return null;
    }
};