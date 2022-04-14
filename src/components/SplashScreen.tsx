import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { INavigationData } from '../interfaces';
import * as Progress from 'react-native-progress';
import { useDispatch } from 'react-redux';
import getCurMonth from '../functions/getCurMonth';
import { setWeatherApiConfigure, fetchNextDaysWeather } from '../redux/actions';

const SplashScreen: React.FC<INavigationData> = props => {
  const dispatch = useDispatch()
  const [isAppLoaded, setIsAppLoaded] = useState<boolean>(false)

  useEffect(() => {
    if (!isAppLoaded) {
      const isCurMonthRecieved: boolean = getCurMonth()

      if (isCurMonthRecieved) {
        // Set weather API configure data
        dispatch(setWeatherApiConfigure({
          apiKey: '526d4889d65b48cabba160455213011',
          locationName: 'Lviv',
          days: 3
        }))

        setIsAppLoaded(true)
      }
    }
  }, [])

  if (isAppLoaded) setTimeout(() => props.navigation.navigate('CalendarScreen'), 1500)

  return ( 
    <LinearGradient 
      colors={['#5CCBF7', '#85D249']} 
      start={{ x: 0.3, y: 0 }}
      end={{ x: 0.5, y: 1 }} 
      style={styles.linearGradient}
      >  
        <Image style={{width: 200, height: 200, marginBottom: 150}} source={require('../assets/icons/weather-app.png')}/>
        <Progress.Circle 
          size={30} 
          color='#fff'
          indeterminate={true}
          borderWidth={3} 
        />
      </LinearGradient>
  );
};

export default SplashScreen

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
