import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import BottomTab from '@components/BottomTab';
import Splash from './pages/Splash';
import Home from './pages/Home';
import Product from './pages/Product';
import RegionSelect from './pages/RegionSelect';
import Search from './pages/Search';
import Add from './pages/Add';
import MyPage from './pages/MyPage';
import Chat from './pages/Chat';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTab = () => {
  const renderTabBar = (props) => (<BottomTab {...props} />);
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={renderTabBar}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Add" component={Add} />
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="MyPage" component={MyPage} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, gestureEnabled: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="RegionSelect" component={RegionSelect} />
    </Stack.Navigator>
  );
};

export default Router;