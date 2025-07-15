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
import { TabBar } from '../component/TabBar';


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

function HomeTabs(){
  return(
    <Tab.Navigator tabBar={(props) => <TabBar {...props}/>} screenOptions={{ headerShown: true}}>
      <Tab.Screen name= "home" component={Home} />
      <Tab.Screen name= "search" component={Search} />
      <Tab.Screen name= "upload" component={Upload} />
      <Tab.Screen name= "chat" component={Chat} />
      <Tab.Screen name= "profile" component={Profile} />
    </Tab.Navigator>
  );
}

function RootStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen name= "Login" component={Login}/>
      <Stack.Screen name= "Signup" component={Signup}/>
      <Stack.Screen name= "ForgotPassword" component={ForgotPassword}/>
      <Stack.Screen name= "HomeTabs" component={HomeTabs} options={{headerShown: false}}/>
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