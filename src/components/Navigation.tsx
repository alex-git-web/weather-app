import React from 'react';
import SplashScreen from './SplashScreen';
import CalendarScreen from './CalendarScreen';
import OneDayWeatherScreen from './OneDayWeatherScreen/OneDayWeatherScreen';
import NextDaysWeatherScreen from './NextDaysWeatherScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

type RootStackParamList = {
    SplashScreen: { itemId: number };
    CalendarScreen: undefined;
    OneDayWeatherScreen: undefined;
    NextDaysWeatherScreen: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Navigation:React.FC = () => {
  return ( 
    <NavigationContainer> 
        <RootStack.Navigator>
            <RootStack.Screen 
                name="SplashScreen" 
                component={SplashScreen} 
                initialParams={{ itemId: 42 }} 
                options={{headerShown: false}}/>
            <RootStack.Screen 
                name="CalendarScreen" 
                component={CalendarScreen} 
                options={{headerShown: false}}/>
            <RootStack.Screen 
                name="OneDayWeatherScreen" 
                component={OneDayWeatherScreen} 
                options={{headerShown: false}}/>
            <RootStack.Screen 
                name="NextDaysWeatherScreen" 
                component={NextDaysWeatherScreen} 
                options={{headerShown: false}}/>
        </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation