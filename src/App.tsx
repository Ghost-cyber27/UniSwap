//import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStack } from './navigation';

/*Asset.loadAsync([
  ...NavigationAssets,
  require('./assets/newspaper.png'),
  require('./assets/bell.png'),
]);*/

SplashScreen.preventAutoHideAsync();

export function App() {
  return (
    <NavigationContainer onReady={() => {
        SplashScreen.hideAsync();
      }}>
      <RootStack/>
    </NavigationContainer>
  );
}
/*
<Navigation
      theme={theme}
      linking={{
        enabled: 'auto',
        prefixes: [
          // Change the scheme to match your app's scheme defined in app.json
          'helloworld://',
        ],
      }}
      onReady={() => {
        SplashScreen.hideAsync();
      }}
    />
*/
