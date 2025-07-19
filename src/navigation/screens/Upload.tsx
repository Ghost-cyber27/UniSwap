import { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerAsset } from 'expo-image-picker';
import Entypo from '@expo/vector-icons/Entypo';
import { pickMultiImage } from '../../services/pickImage';

export function Upload() {
  const [value, setValue] = useState(null);
  const [image, setImage] = useState<ImagePickerAsset[]>([]);
  const [name, setName] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(false);

  const pickImage = async () => {
    const images = await pickMultiImage();
    setImage(images);
  };
  //wYBJlUWzZURoEesE


  const data = [
    { label: 'Men Clothing', value: '1' },
    { label: 'Woman Clothing', value: '2' },
    { label: 'Electronics', value: '3' },
    { label: 'Beauty', value: '4' },
    { label: 'Computing', value: '5' },
    { label: 'Phone & Tablet', value: '6' },
  ];

  const upload = () => {
    console.log(name)
    console.log(desc)
    console.log(price)
    console.log(value)
    console.log(image)
  }

  return (
    <View style={styles.container}>
      <View style={styles.imgBorder}>
        {image ? <Image source={{ uri: image[0].uri }} style={{width: 330, height: 180, resizeMode: "center"}}/> : <Entypo name="upload" size={100} style={{ color: '#222' }} onPress={() => pickImage()}/>}
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
          <TouchableOpacity style={styles.checkBox} onPress={() => setChecked(true)}>
            {checked 
            ? <Entypo name="check" size={24} style={{ color: '#222' }} onPress={() => setChecked(false)}/> 
            : <Text></Text>
            }</TouchableOpacity>
          <Text style={{top: 5}}>Would you like to be Feature listed?</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => upload()}><Text style={styles.buttonText}>Upload</Text></TouchableOpacity>
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
