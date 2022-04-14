import React from 'react'
import { FlatList, StyleSheet, Text, View,  } from 'react-native'
import HourDataWrapper from './hourDataWrapper'

const ThreeSection: React.FC<{threeSectionData: any}> = props => { 

    return (
        <View style={styles.container}>
            <Text style={styles.caption}>
                Hourly
            </Text>

            <View style={styles.dataContainer}>
                {  <FlatList
                        data={props.threeSectionData}
                        renderItem={
                            ({item}) => <HourDataWrapper hourData={ item }/>
                        }
                        keyExtractor={item => item.hour}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                }
            </View>
        </View>
    )
}

export default ThreeSection

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 30
    },
    caption: {
        color: '#fff',
        fontSize: 14,
        fontFamily:'proxNova_regular',
        textAlign: 'left',
        marginBottom: 5,
        marginLeft: 5
    },
    /* Data container */
    dataContainer: {
        backgroundColor: 'rgba(208,223,247,0.5)',
        borderRadius: 10,
        paddingVertical: 30,
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
     }
})
