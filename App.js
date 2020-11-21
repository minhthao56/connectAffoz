import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Login, Home, Connect} from './src/screens';
import {Button} from './src/components';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const App = () => {
  const [isShowHome, setIsShowHome] = useState(false);
  // const handleChangeView = () => {
  //   setIsShowHome(!isShowHome);
  // };
  return (
    <>
      <NavigationContainer>
        {!isShowHome ? (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Auth" component={Login} />
          </Stack.Navigator>
        ) : (
          <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Connect" component={Connect} />
          </Tab.Navigator>
        )}
      </NavigationContainer>
      {/* <Button onPress={handleChangeView}>Change view</Button> */}
    </>
  );
};

export default App;
