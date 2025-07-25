import * as ImagePicker from 'expo-image-picker';
import { ImagePickerAsset } from 'expo-image-picker';

const pickOneImage = async (): Promise<ImagePickerAsset | null> => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if(status !== 'granted'){
      alert("Sorry, we need camera roll persmission to make this work!")
      return null;
    }
    // No permissions request is necessary for launching the image library
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true
      });

      console.log(result);
      
      if (result.canceled) {
        console.log('Image picker canceled');

        return null;
      }
      if (result.assets && result.assets.length > 0) {
        console.log('Successful picked an image');
        return result.assets[0];
      } else {
        console.log('No asset found');
        return null;
      }
    } catch (error) {
      console.error(error)
      alert('An Error Occurred while picking an image')
      return null;
    }
};


const pickMultiImage = async (): Promise<ImagePickerAsset[]> => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if(status !== 'granted'){
      alert("Sorry, we need camera roll persmission to make this work!")
      return[];
    }
    // No permissions request is necessary for launching the image library
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        aspect: [4, 3],
        quality: 1,
        base64: true,
        allowsMultipleSelection: true,
        selectionLimit: 4
      });

      if (result.canceled) {
        console.log('Image picker canceled');
        return [];
      }
      if (result.assets && result.assets.length > 0) {
        console.log('Successful picked an image');
        return result.assets;
      } else {
        console.log('No asset found');
        return [];
      }
      
      } catch (error) {
        console.error(error);
        alert('An Error Occurred while picking the images')
        return[]
      }
    
};

export {pickOneImage, pickMultiImage}