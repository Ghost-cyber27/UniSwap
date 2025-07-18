import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

/*type Props = StaticScreenProps<{
  user: string;
}>;
{ route }: Props
{route.params.user}*/

/*
edit profile
view product listing
favorites
terms and conditions
privacy
about
*/

export function Profile() {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: "row", gap: 5}}>
        <View style={styles.imgView}>
          <Image style={styles.img} source={require("C:/Users/HP PC/Documents/react native projects/upcoming/UniSwap/assets/logo.jpg")}/>
        </View>
        <View style={styles.profileInfoView}>
          <Text style={styles.profileInfoText}><Text>.</Text> Isaac Lekwot</Text>
          <Text style={styles.profileInfoText}><Text>.</Text> Kasu/18/CSC/1082</Text>
          <Text style={styles.profileInfoText}><Text>.</Text> ilekwot2@gmail.com</Text>
          <Text style={styles.profileInfoText}><Text>.</Text> Kaduna State University</Text>
          <Text style={styles.profileInfoText}><Text>.</Text> No. of listing: 4</Text>
        </View>
      </View>
      <View style={styles.contentView}>
        <TouchableOpacity>
          <Text style={styles.contentText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.contentText}>View Product Listing</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.contentText}>Favorite</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.contentText}>Terms and Condition</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.contentText}>About</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5
  },
  imgView: {
    width: 150,
    height: 200,
    backgroundColor: "black",
    borderRadius: 10,
    padding: 5
  },
  img: {
    width: 140,
    height: 190,
    borderRadius: 10
  },
  profileInfoView: {
    width: 190,
    height: 200,
    backgroundColor: "black",
    borderRadius: 10,
    padding: 10,
    gap: 15
  },
  profileInfoText: {
    fontSize: 16,
    color: "white",
    fontWeight: "500"
  },
  contentView: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: 350,
    height: 500,
    top: 2,
    padding: 5,
    gap: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  contentText: {
    color: "black",
    fontSize: 30,
    fontWeight: "600",
    borderWidth: 2,
    borderColor: "black",
    marginTop: 10,
    borderRadius: 10,
    width: 340,
    height: 55,
    justifyContent: "center"
  }
});
