import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { INavigationData, INDaysWeather } from '../interfaces';
import * as Progress from 'react-native-progress';
import { useSelector } from 'react-redux';

interface RootState {
    nextDaysWeather: any
}  

const NextDaysWeatherScreen: React.FC<INavigationData> = props => {
    const nextDaysWeatherData = useSelector((state: RootState) => state.nextDaysWeather.data)

    const renderItem:React.FC<{item: any}> = props => {
        return (
            <View style={styles.dayWeatherItemWrapper}>
                {/* Day, month */}
                <View style={styles.dataWrapper}>
                    <Text style={{color: '#fff', fontSize: 15 }}>d: {Number(props.item.date.split('-')[2])}</Text>
                    <Text style={{color: '#fff', fontSize: 15,  marginTop: '7%' }}>m: {Number(props.item.date.split('-')[1])}</Text>
                </View>
                {/* Min, max temperature */}
                <View style={styles.dataWrapper}>
                    <Text style={{color: '#fff', fontSize: 15 }}>min: {props.item.day.mintemp_c}°</Text>
                    <Text style={{color: '#fff', fontSize: 15,  marginTop: '7%' }}>max: {props.item.day.maxtemp_c}°</Text>
                </View>
                {/* Avg humidity */}
                <View style={styles.dataWrapper}>
                    <Image source={require('../assets/icons/drop-icon.png')} style={{width: 20, height: 20}} />
                    <Text style={{color: '#fff', fontSize: 15, marginTop: '7%'}}>{props.item.day.avghumidity}%</Text>
                </View>
                {/* Weather type icon, title */}
                <View style={styles.dataWrapper}>
                    <Image source={{uri: 'http:' + props.item.day.condition.icon}} style={{width: 30, height: 30}} />
                    <Text style={{color: '#fff', fontSize: 15, marginTop: '7%' }}>{props.item.day.condition.text}</Text>
                </View>
            </View>
        );
    }

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
            <View style={styles.weatherDataWrapper}>
                {
                    nextDaysWeatherData 
                    ?   <View style={{flex: 1}}>
                            <Text style={{color: '#fff', fontSize: 18, textAlign:'center', marginBottom: 20 }}>
                                {nextDaysWeatherData.location.name}
                            </Text>
                            <FlatList
                                key={'#'}
                                style={{flex: 1}}
                                data={nextDaysWeatherData.forecast.forecastday}
                                renderItem={renderItem}
                                keyExtractor={item => "#" + item.date}
                            />
                        </View>
                    :   <View style={styles.loaderWrapper}>
                            <Progress.Circle 
                                size={30} 
                                color='#fff'
                                indeterminate={true}
                                borderWidth={3} 
                            />
                        </View>
                }
            </View>
        </LinearGradient>
    );
};

export default NextDaysWeatherScreen

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    weatherDataWrapper: {
        backgroundColor: 'rgba(208,223,247,0.5)',
        borderRadius: 10,
        alignItems: 'stretch',
        justifyContent: 'center',
        padding: 15,
        height: '70%', 
        width: '95%'
    },
    loaderWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    },
    dayWeatherItemWrapper: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        height: 90, 
        width: '100%', 
        borderRadius: 10, 
        borderWidth: 1, 
        borderColor: '#fff', 
        marginBottom: 15, 
        paddingHorizontal: '1%',
        paddingVertical: '1%'
    },
    dataWrapper: {
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '85%', 
        width: '26%',
    }
});
