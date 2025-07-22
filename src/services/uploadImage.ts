import { supabase } from "./supabaseApi";
import { ImagePickerAsset } from 'expo-image-picker';
import {decode} from 'base64-arraybuffer';
import { Alert } from "react-native";

//check the name of your bucket, name of database is products
const STORAGE_BUCKET = 'productimage';

export const uploadImage = async (
    asset: ImagePickerAsset
): Promise<string | null> => {
    if (!asset.base64) {
        Alert.alert('Error', 'Image ${asset.fileName || selected image} deos not have base64 data');
        return null;
    }
    const title = 'image.jpg'
    const fileName = Date.now()+'.jpg';
    const fileExt = asset.uri.split('.').pop()?.toLowerCase();
    const fileMime = asset.type;

    try {
        const { error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(fileName, decode(asset.base64), {
            contentType: fileMime,
            upsert: false,
        });

        if (error) {
            throw error;
        }

        const { data: publicUrlData } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(fileName);

        return publicUrlData.publicUrl;

    } catch (error: any) {
        console.error('Error uploading image to storage: ', fileName, error);
        return null;
    }

}

export const uploadMultipleImages = async (
    assets: ImagePickerAsset[]
): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    for(const asset of assets){
        const url = await uploadImage(asset);
        if (url) {
            uploadedUrls.push(url);
        }
    }
    return uploadedUrls;
}