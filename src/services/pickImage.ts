import * as ImagePicker from 'expo-image-picker';

const pickOneImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });

    console.log(result);
    let image: string;

    if (!result.canceled) {
      image = result.assets[0].uri;
      return image;
    }
};

const pickMultiImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      aspect: [4, 3],
      quality: 1,
      base64: true,
      allowsMultipleSelection: true
    });

    console.log(result);
    let image: string;

    if (!result.canceled) {
      image = result.assets[0].uri;
      return image;
    }
    
};

export {pickOneImage, pickMultiImage}