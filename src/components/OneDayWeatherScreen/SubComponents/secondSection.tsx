import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const SecondSection: React.FC<{secondSectionData: any}> = props => { 
    const uvIndex = props.secondSectionData.curDay != null // if dayStatus === 'today'
        ? props.secondSectionData.curDay.uvIndex
        : props.secondSectionData.noCurDay.avgUvIndex

    return (
        <View style={styles.container}>
             <View style={styles.dataContainer}>
                <View style={styles.partWrapper}>
                    <Image style={styles.humidityIcon} source={require('../../../assets/icons/drop-icon.png')} />
                
                    <View style={styles.measurementDataWrapper}>
                        <Text style={styles.measurementTypeText}>
                        {
                            props.secondSectionData.curDay != null 
                            ? 'Humidity' // if dayStatus === 'today'
                            : 'Avg humidity' // if dayStatus !== 'today'
                        }
                        </Text>

                        <Text style={styles.measurementValueText}>
                        {
                            props.secondSectionData.curDay != null 
                            ? props.secondSectionData.curDay.humidity + '%' // if dayStatus === 'today'
                            : props.secondSectionData.noCurDay.avgHumidity + '%' // if dayStatus !== 'today'
                        }
                            
                        </Text>
                    </View>
                </View>

                <View style={styles.verticalSeparator}></View>

                <View style={styles.partWrapper}>
                    <Image style={styles.uvIndexIcon}  source={require('../../../assets/icons/sun_weather-icon.png')} />
                
                    <View style={styles.measurementDataWrapper}>
                        <Text style={styles.measurementTypeText}>
                            {
                                props.secondSectionData.curDay != null 
                                ? 'UV index' // if dayStatus === 'today'
                                : 'Avg UV index' // if dayStatus !== 'today'
                            }
                        </Text>

                        <Text style={styles.measurementValueText}>
                            {
                                  uvIndex <= 2 
                                  ? 'Low' 
                                  : uvIndex <= 5
                                  ? 'Moderate' 
                                  : uvIndex <= 7
                                  ? 'High' 
                                  : uvIndex <= 10
                                  ? 'Very high' 
                                  : uvIndex >= 11
                                  ? 'Extreme' : ''
                            }
                        </Text>
                    </View>
                </View>
             </View>
        </View>
    )
}

export default SecondSection

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        justifyContent: 'space-between',
        marginTop: 25
    },
    yesterdayTemperatureRangeText: {
        color: '#fff',
        fontSize: 16,
        fontFamily:'proxNova_regular',
        textAlign: 'right',
        marginBottom: 5,
        marginRight: 15
    },
    /* Data container */
    dataContainer: {
       backgroundColor: 'rgba(208,223,247,0.5)',
       borderRadius: 10,
       paddingVertical: 30,
       paddingHorizontal: 25,
       flexDirection: 'row',
       justifyContent: 'space-between',
       alignItems: 'center',
    },
    partWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 0.8
    },
    measurementDataWrapper: {
    },
    measurementTypeText: {
        color: '#fff',
        fontSize: 15,
        fontFamily:'proxNova_sBold',
        marginBottom: 5
    },
    measurementValueText: {
        color: '#fff',
        fontSize: 15,
        fontFamily:'proxNova_sBold'
    },
    humidityIcon: {
        width: 25,
        height: 25, 
        marginRight: 10
    },
    uvIndexIcon: {
        width: 25,
        height: 25, 
        marginRight: 10
    },
    verticalSeparator: {
        width: 3,
        height: 37,
        borderRightWidth: 1,
        borderRightColor: '#fff',
        marginHorizontal: 15
    }
})
