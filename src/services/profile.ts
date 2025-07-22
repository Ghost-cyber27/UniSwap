import { useState, useEffect } from "react";
import { supabase } from "./supabaseApi";
import { Alert } from "react-native";
import { Session } from "@supabase/supabase-js";

export interface UserProfile{
    id: string;
    username: string;
    gallery_images: string[];
}

const [session, setSession] = useState<Session | null>()

useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
  }, []);



export const fetchUserProfile = async (): Promise<UserProfile | null> => {
    try {
        const { data, error } = await supabase
        .from('profile')
        .select('id, name, matric, university, email')
        .eq('email', session?.user.email)
        .single();

        if (error && error.code !== 'PGRST116') {
            console.error('Error fetching profile: ', error);
            Alert.alert('Error', 'Failed to fetch user profile');
            return null;
        }
        return data as UserProfile | null;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const updateUserGalleryImages = async (
    userId: string,
    newImageUrls: string[]
): Promise<UserProfile | null> => {
    const currentProfile = await fetchUserProfile();
    const existingGalleryImages = currentProfile?.gallery_images || [];

    const updateGallery = [...existingGalleryImages, ...newImageUrls];

    const { data, error } = await supabase
    .from('profiles')
    .update({ gallery_images: updateGallery})
    .eq('id', userId)
    .select();

    if (error) {
        console.error('Error updating profile with image Urls: ', error);
        Alert.alert('Database Error', 'Failed to save image URLs to your profile');
        return null;
    }
    return null;
};

export const createProfile = async (userId: string, username: string): Promise<UserProfile | null> => {
    const { data, error } = await supabase
    .from('profiles')
    .insert({id: userId, username: username, gallery_images: []})
    .select();

    if (error) {
        console.error('Error creating profile: ', error);
        Alert.alert('Error', 'Failed to create profile');
        return null;
    }
    if (data && data.length > 0) {
        return data[0] as UserProfile;
    }
    return null;
}