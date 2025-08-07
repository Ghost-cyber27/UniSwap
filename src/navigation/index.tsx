import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User } from '@supabase/supabase-js';
import { Home } from './screens/Home';
import { Profile } from './screens/Profile';
import { Chat } from './screens/Chat';
import { Upload } from './screens/Upload';
import { Search } from './screens/Search';
import { Login } from './screens/auth/login';
import { Signup } from './screens/auth/signup';
import { ForgotPassword } from './screens/auth/forgotPassword';
import { TabBar } from '../component/TabBar';
import { Details } from './screens/Details';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();


// Define your RootStackParamList for type checking
type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  App: NavigatorScreenParams<AppStackParamList>;
  //Details: { itemId: number; otherParam?: string }; Details screen expects an itemId and optional otherParam
};

export type AuthStackParamList = {
  Login: undefined; // No params for Home screen
  Signup: undefined;
  ForgotPassword: undefined;
}
//images, name, price, description, likes, id
export type AppStackParamList = {
  HomeTabs: undefined;
  Details: { Id: string; name: string, price: string, description: string, likes: number, images: string[], seller: string, category: string };
}

interface AppNavigatorProps {
  session: User | null; // Pass the Supabase user session to determine which stack to show
}

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator();
const AppStack = createNativeStackNavigator<AppStackParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

function HomeTabs(){
  return(
    <Tab.Navigator tabBar={(props) => <TabBar {...props}/>} screenOptions={{ headerShown: true}}>
      <Tab.Screen name= "Home" component={Home} options={{headerShown: false}}/>
      <Tab.Screen name= "Search" component={Search} options={{headerShown: false}} />{/*look at X */}
      <Tab.Screen name= "Upload" component={Upload} />
      <Tab.Screen name= "Chat" component={Chat} />
      <Tab.Screen name= "Profile" component={Profile} options={{headerShown: false}}/>
    </Tab.Navigator>
  );
}

const AuthStackNav: React.FC = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Signup" component={Signup} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
    </AuthStack.Navigator>
  );
};

const AppStackNav: React.FC = () => {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="HomeTabs" component={HomeTabs} />
      <AppStack.Screen name="Details" component={Details} />
    </AppStack.Navigator>
  );
};

const AppNavigator: React.FC<AppNavigatorProps> = ({ session }) => {
  return (
    <NavigationContainer onReady={() => {
            SplashScreen.hideAsync();
          }}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {session ? (
          // User is authenticated, show the main app screens
          <RootStack.Screen name="App" component={AppStackNav} />
        ) : (
          // No user session, show the authentication screens
          <RootStack.Screen name="Auth" component={AuthStackNav} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

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