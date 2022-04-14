import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { INavigationData } from '../interfaces';
import * as Progress from 'react-native-progress';
import { useSelector, useDispatch } from 'react-redux'
import { getCurrentMonth } from '../calendarData';
import { fetchNextDaysWeather } from '../redux/actions';

interface RootState {
  weatherApiConfigure: any
}

const CalendarScreen: React.FC<INavigationData> = props => {
  const dispatch = useDispatch()
  const [isNextDaysWeatherDataLoaded, setIsNextDaysWeatherDataLoaded] = useState<boolean>(false)
  const weatherApiConfigure = useSelector((state: RootState) => state.weatherApiConfigure)

  const renderItem = ({ item }) => (
    <TouchableOpacity 
        style={[styles.calendarDayWrapper, {
          backgroundColor: 
            item.status == 'today' ? 'orange' :
            item.status == 'past' ? 'rgb(233, 237, 0)' :
            item.status == 'future' ? 'rgb(70, 211, 0)' : 'none'
        }]} 
        onPress={() => props.navigation.navigate("OneDayWeatherScreen", { 
          date: item.date, 
          dayStatus: item.status
        })}
      >
            <Text style={{
              fontFamily: 'ProximaNova-Regular', 
              color: 
                item.id % 7 != 0 && (item.date.split('-')[1] == "03" || item.date.split('-')[1] == "05") ? 'rgb(223, 223, 223)' :  
                item.id % 7 != 0 && item.date.split('-')[1] == "04" ? '#fff' :
                item.id % 7 == 0 && (item.date.split('-')[1] == "03" || item.date.split('-')[1] == "05") ? 'rgb(165, 165, 165)' :  
                item.id % 7 == 0 && item.date.split('-')[1] == "04" ? 'rgb(145, 145, 145)' : 'red',
              fontSize: 20, 
              textAlign: 'center' 
            }}>
              { Number(item.date.split('-')[2]) }
            </Text >
    </TouchableOpacity> 
  );

  useEffect(() => {
    if (!isNextDaysWeatherDataLoaded) {
      // Get next days weather data from API server
      dispatch(fetchNextDaysWeather( 
        'http://api.weatherapi.com/v1/forecast.json?key=526d4889d65b48cabba160455213011&q=' 
        + weatherApiConfigure.locationName + '&days=' + weatherApiConfigure.days + '&aqi=no&alerts=no'
      ))

      setIsNextDaysWeatherDataLoaded(true)
    }
  }, [])

  return ( 
    <View style={styles.container}>
          <LinearGradient 
            colors={['#5CCBF7', '#85D249']} 
            start={{ x: 0.3, y: 0 }}
            end={{ x: 0.5, y: 1 }} 
            style={styles.linearGradient}
          > 
            { isNextDaysWeatherDataLoaded == true
            ? <View style={styles.calendarWrapper}>
                  <Text style={styles.caption}>Город: Львов. Месяц: Апрель </Text>
                  <View style={styles.dayNameList}>
                    <Text style={styles.dayNameItem}>ПН</Text>   
                    <Text style={styles.dayNameItem}>ВТ</Text>   
                    <Text style={styles.dayNameItem}>СР</Text>   
                    <Text style={styles.dayNameItem}>ЧТ</Text>   
                    <Text style={styles.dayNameItem}>ПТ</Text>   
                    <Text style={styles.dayNameItem}>СБ</Text>   
                    <Text style={[styles.dayNameItem, {color: 'rgb(145, 145, 145)'}]}>ВС</Text>   
                  </View>
                  <FlatList
                      key={'_'}
                      style={{flex: 1}}
                      numColumns={7}
                      data={getCurrentMonth().days}
                      renderItem={renderItem}
                      keyExtractor={item => "_" + item.id}
                  />
                <Text style={styles.note}>
                  Примечание: free-версия сервиса WeatherApi предоставляет данные погоды таким образом:
                  на следующие 3 дня (учитывая текущий день) и на прошлые 7 дней.
                </Text>
                <TouchableOpacity
                  style={styles.showNextDaysWeatherBtn}
                  onPress={() => props.navigation.navigate('NextDaysWeatherScreen')}
                >
                  <Text style={styles.showNextDaysWeatherBtnText}>Показать погоду на 3 дня</Text>
                </TouchableOpacity>
              </View>
            : <View style={styles.loaderWrapper}>
                  <Progress.Circle 
                  size={30} 
                  color='#fff'
                  indeterminate={true}
                  borderWidth={3} />
              </View>
            }
          </LinearGradient>
    </View>
  );
};

export default CalendarScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
  linearGradient: {
    flex: 1,
    padding: 15,
    position: 'relative'
  },
  calendarWrapper: {
    backgroundColor: 'rgba(208,223,247,0.5)',
    borderRadius: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 15,
    height: '95%'
  },
  caption: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
    fontFamily:'ProximaNova-Regular',
  },
  header: {
    color: '#ff',
    fontSize: 22,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily:'ProximaNova-Regular',
  },
  calendarDayWrapper: {
    borderRadius: 30,
    marginHorizontal: '1%',
    marginBottom: 10,
    width: '12.3%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  loaderWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayNameList: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 15,
    marginTop: 10,
  },
  dayNameItem: {
    width: '14.3%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    color: '#fff',
    fontSize: 21,
    textAlign: 'center',
    fontFamily:'ProximaNova-Bold',
  },
  note: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
    fontFamily:'ProximaNova-Regular',
  },
  showNextDaysWeatherBtn: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    backgroundColor: 'rgba(208,223,247,0.7)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  showNextDaysWeatherBtnText: {
    color: '#fff',
    fontSize: 21,
    fontFamily:'ProximaNova-Bold',
  }
});
