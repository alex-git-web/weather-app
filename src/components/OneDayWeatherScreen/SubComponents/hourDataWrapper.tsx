import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const HourDataWrapper: React.FC<{hourData: any}> = props => {
    return (
        <View style={styles.hourWeatherDataWrapper}>
            <Text style={styles.hourText}>
                { props.hourData.hour } am
            </Text>
        
            <View style={styles.wIconAndRpPWrapper}>
                <Image style={styles.weatherTypeIcon} source={ props.hourData.weatherTypeIcon } />

                <Text style={styles.rainProbabilityPercentText}>
                    { props.hourData.rainProbabilityPercent }%
                </Text>
            </View>

            <View style={styles.temperatureLevelWrapper}>
                <Text style={styles.tLevel_percentText}>
                    { props.hourData.temperature }°
                </Text>

                <View style={[styles.tLevel_columnIndicator, { height: props.hourData.temperature * 5 }]}>
                
                </View>
            </View>
        </View>
    )
}

export default HourDataWrapper

const styles = StyleSheet.create({
    hourWeatherDataWrapper: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 15
     },
     hourText: {
        color: '#fff',
        fontSize: 15,
        fontFamily:'ProximNova-Semibold',
        marginBottom: 12,
     },
     wIconAndRpPWrapper: {

     },
     weatherTypeIcon: {
        width: 30,
        height: 30
     },
     rainProbabilityPercentText: {
        color: '#fff',
        fontSize: 10,
        fontFamily:'ProximNova-Regular',
        textAlign: 'center'
     },
     /* Temperature level wrapper */
     temperatureLevelWrapper: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
     },
     tLevel_percentText: {
        color: '#fff',
        fontSize: 15,
        fontFamily:'ProximNova-Regular',
        marginBottom: 5,
     },
     tLevel_columnIndicator: {
        width: 4,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10
     },
   
})
