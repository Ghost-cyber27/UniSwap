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
        {name: name, price: price, description: description, seller: seller, category: category, image: image}).select();

    if (error) {
        console.error('Error storing product: ', error);
        Alert.alert('Error', 'Failed to store product: ' + error.message);
        return []; // Indicate failure
    }

    if (!data || data.length === 0) {
        // This case should be rare if select() is used and no RLS prevents return
        console.warn('Product stored but no data returned.');
        return []; // Assume success if no error, but no data returned. Adjust based on your RLS.
    }

    console.log("Successfully stored product:", data);
    return data as unknown as productListing; // Indicate success
}