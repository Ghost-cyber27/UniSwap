import { supabase } from "./supabaseApi";
import { Alert } from "react-native";

interface products {
    name: string;
    price: string;
    description: string;
    seller: string;
    category: string;
    image: string[];
}

type productListing = products[]

export const storeProduct = async (
    name: string, 
    price: string, 
    description: string, 
    seller: string, 
    category: string, 
    image: string[]
): Promise<productListing> => {
    const { data, error } = await supabase.from('products').insert(
        {name: name, price: price, description: description, seller: seller, category: category, image: image})
    
    if (error && error.code !== 'PGRST116') {
        console.error('Error creating profile: ', error);
        Alert.alert('Error', 'Failed to create profile');
        return [];
    }
    console.log("Successfully stored products");
    return data as unknown as productListing
}