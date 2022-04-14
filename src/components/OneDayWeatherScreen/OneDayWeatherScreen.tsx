import React, {useState, useEffect} from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import * as Progress from 'react-native-progress';
import { useSelector } from 'react-redux'
import { getPastDayWeatherData } from '../../functions/getPastDayWeatherData';
import LinearGradient from 'react-native-linear-gradient';
import { INavigationData } from '../../interfaces';
import FirstSection from './SubComponents/firstSection';
import SecondSection from './SubComponents/secondSection';
import ThreeSection from './SubComponents/threeSection';

interface RootState {
    nextDaysWeather: any,
    weatherApiConfigure: any,
}  

const OneDayWeatherScreen: React.FC<INavigationData> = props => {
    // Get data from Redux
    const nextDaysWeather = useSelector((state: RootState) => state.nextDaysWeather.data)
    const [pastDayWeather, setPastDayWeather] = useState(null)
 
    const weatherApiConfigure = useSelector((state: RootState) => state.weatherApiConfigure)

    const [selectedDayWeatherData, setSelectedDayWeatherData] = useState(null)

    async function fetchPastDayWeather() {
        const data = await getPastDayWeatherData(weatherApiConfigure, props.route.params.date);
        setPastDayWeather(data)
    }

    const [firstSectionData, setFirstSectionData] = useState<{}>(
        { 
            locationName: '', 
            date: '', 
            curDay: null, // => { weatherTypeIcon, weatherTypeTitle, temp_c, tempSensation_c }
            noCurDay: null // {} => { minTemp_c, maxTemp_c, avgWeatherTypeIcon, avgWeatherTypeTitle }
        }
    )

    const [secondSectionData, setSecondSectionData] = useState<{}>(
        { 
            curDay: null, // humidity, uvIndex
            noCurDay: null // avgHumidity, avgUvIndex
        }
    )
    
    const [threeSectionData, setThreeSectionData] = useState<{}>(null) // [] => { id, hour, rainProbabilityPercent, temperature, weatherTypeIcon }

    const ExtractWeatherData = () => {
        setFirstSectionData({ 
            locationName: weatherApiConfigure.locationName,
            date: props.route.params.date,
            curDay: 
                props.route.params.dayStatus === 'today' // day status was recieved from calendar
                ? {
                    weatherTypeIcon: 'http:' + selectedDayWeatherData.current.condition.icon,
                    weatherTypeTitle: selectedDayWeatherData.current.condition.text,
                    temp_c: selectedDayWeatherData.current.temp_c,
                    tempSensation_c: selectedDayWeatherData.current.feelslike_c
                } : null,
            noCurDay:  
                props.route.params.dayStatus !== 'today' 
                ? {
                    minTemp_c: selectedDayWeatherData.forecastday.day.mintemp_c,
                    maxTemp_c: selectedDayWeatherData.forecastday.day.maxtemp_c,
                    avgWeatherTypeIcon: 'http:' + selectedDayWeatherData.forecastday.day.condition.icon,
                    avgWeatherTypeTitle: selectedDayWeatherData.forecastday.day.condition.text
                } : null
        })

        setSecondSectionData({ 
            curDay: 
                props.route.params.dayStatus === 'today' 
                ? { 
                    humidity: selectedDayWeatherData.current.humidity,
                    uvIndex: selectedDayWeatherData.current.uv,
                } : null,
            noCurDay: 
                props.route.params.dayStatus !== 'today' 
                ? { 
                    avgHumidity: selectedDayWeatherData.forecastday.day.avghumidity,
                    avgUvIndex: selectedDayWeatherData.forecastday.day.uv,
                } : null
        })

        const dayHours =  props.route.params.dayStatus === 'today' ? selectedDayWeatherData.forecast.forecastday[0].hour : selectedDayWeatherData.forecastday.hour
      
        const hoursWeatherData = dayHours.map((hour) => {
            return ({
                id: Date.now(), 
                hour: hour.time.split(' ')[1], 
                rainProbabilityPercent: hour.chance_of_rain,
                temperature: hour.temp_c,
                weatherTypeIcon: {uri: 'http:' + hour.condition.icon}
            })
        })
        setThreeSectionData(hoursWeatherData)
    }
    
    useEffect(() => {
        if (nextDaysWeather != null) {
            if (selectedDayWeatherData) // если все данные для выбранного дня загружены, запускается их извлечение
                ExtractWeatherData()
            else if (props.route.params.dayStatus === 'today') {
                setSelectedDayWeatherData(nextDaysWeather)
            }
            else if (props.route.params.dayStatus === 'past') {
                if (pastDayWeather == null) {
                    fetchPastDayWeather()
                }
                else {
                    setSelectedDayWeatherData(
                        {
                            forecastday: pastDayWeather.forecast.forecastday[0]
                        }
                    )
                }
            }
            else if (props.route.params.dayStatus === 'future') {
                setSelectedDayWeatherData(
                    {
                        forecastday: nextDaysWeather.forecast.forecastday.filter(day => day.date == props.route.params.date)[0]
                    }
                )
            }
        }
    }, [selectedDayWeatherData, pastDayWeather])

    return (
        <LinearGradient 
            colors={['#5CCBF7', '#85D249']} 
            start={{ x: 0.3, y: 0 }}
            end={{ x: 0.5, y: 1 }} 
            style={styles.linearGradient}
        >   
            <TouchableOpacity 
                style={styles.backToPrevScreenBtn} 
                onPress={() => props.navigation.goBack()}
            >
                <Text style={{color: 'black', fontSize: 15}}>Back</Text>
            </TouchableOpacity>
            { 
                threeSectionData != null
                ?  <ScrollView style={styles.screenWrapper} showsVerticalScrollIndicator={false}>
                        <FirstSection firstSectionData={firstSectionData} />
                        <SecondSection secondSectionData={secondSectionData} />
                        <ThreeSection threeSectionData={threeSectionData} />
                    </ScrollView>
                :   <View style={styles.loaderWrapper}>
                        <Progress.Circle 
                            size={30} 
                            color='#fff'
                            indeterminate={true}
                            borderWidth={3} 
                        />
                    </View>
            }
        </LinearGradient>
    )
}

export default OneDayWeatherScreen

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        position: 'relative',
    },
    loaderWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    screenWrapper: {  
        paddingHorizontal: 10,
        paddingVertical: 15, 
        position: 'relative',
    },
    backToPrevScreenBtn: {
        backgroundColor:'#fff', 
        borderRadius: 30, 
        alignItems: 'center', 
        justifyContent: 'center', 
        width: 55, 
        height: 55, 
        position: 'absolute', 
        left: 20, 
        top: 20,
        zIndex: 5
    }
})
