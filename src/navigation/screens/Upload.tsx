import { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { ImagePickerAsset } from 'expo-image-picker';
import Entypo from '@expo/vector-icons/Entypo';
import { pickMultiImage, pickOneImage } from '../../services/pickImage';
import { storeProduct } from '../../services/storeData';
import { uploadMultipleImages, uploadImage } from '../../services/uploadImage';

export function Upload() {
  const [value, setValue] = useState<string>("");
  const [image, setImage] = useState<ImagePickerAsset[]>([]);
  const [img, setImg] = useState<ImagePickerAsset | null>(null);
  const [name, setName] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(false);
  const [available, setAvailable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageUpload = async () => {
    if (image.length === 0) {
      Alert.alert(" No Images", "Please select images first");
      return;
    }
    if (!name.trim() || !desc.trim() || !price.trim() || !value) {
      Alert.alert("Missing Information", "Please fill in all product details (Name, Description, Price, and Category).");
      return;
    }
    setLoading(true);

    try {
      const uploadedUrls = await uploadMultipleImages(image);
      if (!uploadedUrls || uploadedUrls.length === 0) {
        Alert.alert("Upload Failed", "No images were uploaded. Please try again.");
        return; // Stop here if image upload failed
      }
      const productStored = await storeProduct(name, price, desc, "Mr Lee", value, uploadedUrls);

      if (productStored) { // Or check for specific success condition from storeProduct
        Alert.alert("Success", "Product and images have been successfully uploaded.");
        // Optionally clear form fields here
        setName('');
        setDesc('');
        setPrice('');
        setValue('');
        setImage([]);
        setAvailable(false);
        setChecked(false);
      } else {
        Alert.alert("Upload Failed", "Product data could not be stored. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert("Upload Error", "An error occurred during upload. Please try again later.");
    } finally {
      setLoading(false);
    }    

    setLoading(false);

  };

  const uploading = async() => {
    try {
      if (img !== null) {
        const uploadedUrls = await uploadImage(img);
        if (!uploadedUrls || uploadedUrls.length === 0) {
          Alert.alert("Upload Failed", "No images were uploaded. Please try again.");
          return; // Stop here if image upload failed
        } else{
          Alert.alert("Upload Successful", "images were uploaded.");
          console.log('URL: ', uploadedUrls);
        }
      }
    } catch (error) {
      console.error('Error: ', error);
    }

  }

  const picking = async () => {
    const image = await pickOneImage();
    setImg(image);
    setAvailable(true);
    alert('Image have been loaded');
  }

  const pickImage = async () => {
    const images = await pickMultiImage();
    setImage(images);
    //console.log(image);
    setAvailable(true);
    alert('Four Images have been loaded');
  };

  const rePickImage = async () => {
    setImage([]);
    setAvailable(false);
    const images = await pickMultiImage();
    setImage(images);
    //console.log(image);
    setAvailable(true);
    alert('Four Images have been loaded');
  }
  //wYBJlUWzZURoEesE


  const data = [
    { label: 'Men Clothing', value: '1' },
    { label: 'Woman Clothing', value: '2' },
    { label: 'Electronics', value: '3' },
    { label: 'Beauty', value: '4' },
    { label: 'Computing', value: '5' },
    { label: 'Phone & Tablet', value: '6' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.imgBorder}>
        {/*available ? <TouchableOpacity onPress={() => rePickImage()}><Image source={{ uri: image[0].uri }} style={{width: 330, height: 180, resizeMode: "center"}}/></TouchableOpacity> : <Entypo name="upload" size={100} style={{ color: '#222' }} onPress={() => picking()}/>*/}
        <Entypo name="upload" size={100} style={{ color: '#222' }} onPress={() => picking()}/>
      </View>
      <View style={{gap: 10}}>
        <TextInput
          placeholder='Name of Product'
          onChangeText={(text) => setName(text)}
          style={styles.textInput}
        />
        <TextInput
          placeholder='Description of Product'
          onChangeText={(text) => setDesc(text)}
          style={styles.textInputDesc}
        />
        <TextInput
          placeholder='Price of Product'
          keyboardType='numeric'
          onChangeText={(text) => setPrice(text)}
          style={styles.textInput}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={"Categories"}
          value={value}
          onChange={item => {
            setValue(item.value);
          }}
        />
        <View style={{flexDirection: "row", padding: 5, gap: 10, justifyContent: "center"}}>
          <TouchableOpacity style={styles.checkBox} onPress={() => setChecked(prev => !prev)}>
            {checked 
            ? <Entypo name="check" size={24} style={{ color: '#222' }}/> 
            : <Text></Text>
            }</TouchableOpacity>
          <Text style={{top: 5}}>Would you like to be Feature listed?</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => uploading()}>{loading ? <ActivityIndicator size='large' color='white'/> :<Text style={styles.buttonText}>Upload</Text>}</TouchableOpacity>
      </View>
    </View>
  );
}
//check logo
const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    padding: 10
  },
  imgBorder: {
    width: 340, 
    height: 190, 
    backgroundColor: "white", 
    alignItems: "center", 
    justifyContent: "center", 
    borderWidth: 2,
    borderRadius: 10
  },
  textInput: {
    width: 340,
    height: 50,
    borderWidth: 2,
    borderRadius: 10
  },
  textInputDesc: {
    width: 340,
    height: 70,
    borderWidth: 2,
    borderRadius: 10
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  button: {
    width: 340,
    height: 50,
    backgroundColor: "black",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },
  checkBox: {
    width: 30,
    height: 30,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center"
  }
});
