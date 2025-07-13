import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text  } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './screens/Home';
import { Profile } from './screens/Profile';
import { Chat } from './screens/Chat';
import { Upload } from './screens/Upload';
import { Search } from './screens/Search';
import { Login } from './screens/auth/login';
import { Signup } from './screens/auth/signup';
import { ForgotPassword } from './screens/auth/forgotPassword';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';


// Define your RootStackParamList for type checking
export type RootStackParamList = {
  Login: undefined; // No params for Home screen
  Signup: undefined;
  ForgotPassword: undefined;
  HomeTabs: undefined;
  //Details: { itemId: number; otherParam?: string }; Details screen expects an itemId and optional otherParam
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator();

const HomeIcon = ({focused} : any) => {
  if(focused){
    return(
      <View style={{flexDirection: "row" ,width: 50, justifyContent: "center", alignItems: "center"}}>
        <Feather name="home" size={25} color="black"/>
        <Text>Home</Text>
      </View>
    )
  }else{
    return(
      <View style={{width: 50, justifyContent: "center", alignItems: "center"}}>
        <Feather name="home" size={25} color="black"/>
      </View>
    )
  }
}
const SearchIcon = ({focused} : any) => {
  if(focused){
    return(
      <View style={{ flexDirection: "row" ,width: 50, justifyContent: "center", alignItems: "center"}}>
          <FontAwesome name="search" size={24} color="black"/>
          <Text>Search</Text>
      </View>
    )
  }else{
    return(
      <View style={{width: 50, justifyContent: "center", alignItems: "center"}}>
        <FontAwesome name="search" size={24} color="black"/>
      </View>
    )
  }
}
const UploadIcon = ({focused} : any) => {
  if(focused){
    return(
      <View style={{flexDirection: "row" ,width: 50, justifyContent: "center", alignItems: "center"}}>
        <Entypo name="upload" size={24} color="black"/>
        <Text>Upload</Text>
      </View>
    )
  }else{
    return(
      <View style={{width: 50, justifyContent: "center", alignItems: "center"}}>
        <Entypo name="upload" size={24} color="black"/>
      </View>
    )
  }
}
const ChatIcon = ({focused} : any) => {
  if(focused){
    return(
      <View style={{flexDirection: "row" ,width: 50, justifyContent: "center", alignItems: "center"}}>
        <Entypo name="chat" size={24} color="black"/>
        <Text>Chat</Text>
      </View>
    )
  }else{
    return(
      <View style={{width: 50, justifyContent: "center", alignItems: "center"}}>
        <Entypo name="chat" size={24} color="black"/>
      </View>
    )
  }
}
const ProfileIcon = ({focused} : any) => {
  if(focused){
    return(
      <View style={{flexDirection: "row" ,width: 50, justifyContent: "center", alignItems: "center"}}>
        <AntDesign name="profile" size={24} color="black"/>
        <Text>Profile</Text>
      </View>
    )
  }else{
    return(
      <View style={{width: 50, justifyContent: "center", alignItems: "center"}}>
        <AntDesign name="profile" size={24} color="black"/>
      </View>
    )
  }
}

function HomeTabs(){
  return(
    <Tab.Navigator>
      <Tab.Screen name= "Home" component={Home} options={{
        title: "",
        headerShown: false,
        tabBarIcon: ({focused}) => (
          <HomeIcon focused={focused}/>
        )
      }}/>
      <Tab.Screen name= "Search" component={Search} options={{
        title: "",
        headerShown: false,
        tabBarIcon: ({focused}) => (
          <SearchIcon focused={focused}/>
        )
      }}/>
      <Tab.Screen name= "Upload" component={Upload} options={{
        title: "",
        headerShown: false,
        tabBarIcon: ({focused}) => (
        <UploadIcon focused={focused}/>
        )
      }}/>
      <Tab.Screen name= "Chat" component={Chat} options={{
        title: "",
        headerShown: false,
        tabBarIcon: ({focused}) => (
          <ChatIcon focused={focused}/>
        )
      }}/>
      <Tab.Screen name= "Profile" component={Profile} options={{
        title: "",
        headerShown: false,
        tabBarIcon: ({focused}) => (
          <ProfileIcon focused={focused} />
        )
      }}/>
    </Tab.Navigator>
  );
}

function RootStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen name= "Login" component={Login}/>
      <Stack.Screen name= "Signup" component={Signup}/>
      <Stack.Screen name= "ForgotPassword" component={ForgotPassword}/>
      <Stack.Screen name= "HomeTabs" component={HomeTabs}/>
    </Stack.Navigator>
  );
}

export {RootStack}

/*
Profile: {
      screen: Profile,
      linking: {
        path: ':user(@[a-zA-Z0-9-_]+)',
        parse: {
          user: (value) => value.replace(/^@/, ''),
        },
        stringify: {
          user: (value) => `@${value}`,
        },
      },
    },
    Settings: {
      screen: Settings,
      options: ({ navigation }) => ({
        presentation: 'modal',
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    },
*/

/*
tabBar style
tabBarShowLabel: false,
      tabBarItemStyle: {
        alignItems: 'center',
        top: 5,
        width: '100%',
        height: '100%',
      },
      tabBarStyle: {
        backgroundColor: '#ffffff',
        borderRadius: 50,
        marginHorizontal: 20,
        marginBottom: 36,
        height: 52,
        position: 'absolute',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '0f0d23',
        alignItems: "center"
      },
*/