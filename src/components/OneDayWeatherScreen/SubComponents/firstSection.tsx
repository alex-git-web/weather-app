import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const FirstSection: React.FC<{firstSectionData: any}> = props => {

    return (
        <View style={styles.container}>
            <View style={styles.locationContentWrapper}>
                <Image source={require('../../../assets/icons/location-icon.png')} style={styles.locationIcon} />
                <Text style={styles.locationText}>{ props.firstSectionData.locationName }</Text>
            </View>

            <Text style={styles.dateText}>{ props.firstSectionData.date }</Text>

            {
                props.firstSectionData.curDay != null // if dayStatus === 'today'
                ? 
                    <View style={{flex: 1}}>
                        <View style={styles.temperatureContentWrapper}>
                            <Image source={{uri: props.firstSectionData.curDay.weatherTypeIcon}} style={styles.weatherTypeIcon} />
                            <Text style={styles.temperature_c}>{ props.firstSectionData.curDay.temp_c }°</Text>
                        </View>
            
                        <Text style={styles.tempSensation_c}>
                            Feels like  { props.firstSectionData.curDay.tempSensation_c }°
                        </Text> 
                    
                        <Text style={styles.weatherTypeTitle}>{ props.firstSectionData.curDay.weatherTypeTitle }</Text>
                    </View>
                : // if dayStatus !== 'today'
                    <View style={{flex: 1}}>
                        <View style={styles.temperatureContentWrapper}>
                            <Image source={{uri: props.firstSectionData.noCurDay.avgWeatherTypeIcon}} style={styles.weatherTypeIcon} />
                            <Text style={[styles.weatherTypeTitle]}>{ props.firstSectionData.noCurDay.avgWeatherTypeTitle }</Text>
                        </View>
            
                        <Text style={styles.minMaxTemp_c}>
                            Min:  { props.firstSectionData.noCurDay.minTemp_c }°, 
                            Max:  { props.firstSectionData.noCurDay.maxTemp_c }°
                        </Text> 
                    </View>
            } 
        </View>
    )
}

export default FirstSection

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        justifyContent: 'space-between',
        marginTop: 20
    },
    /* Location content */
    locationContentWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 7
    },
    locationIcon: {
        marginRight: 7,
        width: 12,
        height: 12
    },
    locationText: {
        marginRight: 15,
        color: '#fff',
        fontSize: 18,
        fontFamily:'ProximaNova-SemiBold'
    },
    /* Current date content */
    dateText: {
        color: '#fff',
        fontSize: 15,
        fontFamily:'ProximaNova-Regular',
        textAlign: 'center',
        marginBottom: 7
    },
    /* Current temperature content */
    temperatureContentWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 7,
        marginBottom: 3
    },
    temperature_c: {
        color: '#fff',
        fontSize: 70,
        fontFamily:'ProximaNova-Regular',
        textAlign: 'center'
    },
    /* Current weather type content */
    weatherTypeTitle: {
        marginRight: 19,
        color: '#fff',
        fontSize: 18,
        fontFamily:'ProximaNova-SemiBold',
        textAlign: 'center',
        marginBottom: 7
    },
    weatherTypeIcon: {
        marginRight: 10,
        width: 55,
        height: 55
    },
    /* Min and max temp, temp sensation content */
    minMaxTemp_c: {
        marginRight: 15,
        color: '#fff',
        fontSize: 18,
        fontFamily:'ProximaNova-SemiBold',
        textAlign: 'center',
        marginBottom: 7
    },
    tempSensation_c: {
        marginRight: 15,
        color: '#fff',
        fontSize: 18,
        fontFamily:'ProximaNova-SemiBold',
        textAlign: 'center',
        marginBottom: 7
    }
})
