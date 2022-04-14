import { IWApiConfigure } from "../interfaces";
import { SET_WEATHER_API_CONFIGURE, REQUEST_NEXT_DAYS_WEATHER } from "./types";

export function setWeatherApiConfigure(weatherApiConfigure: IWApiConfigure ) {
    return {
        type: SET_WEATHER_API_CONFIGURE,
        payload: weatherApiConfigure
    }
}

export function fetchNextDaysWeather(url: string) {
    return {
        type: REQUEST_NEXT_DAYS_WEATHER,
        payload: { url }
    }
    // return async dispatch  => { // закоментировано, потому что логика передана в saga
    //     let data = null;
    //     try {
    //         const response = await fetch(url)
    //         const json = await response.json()
    //         data = json
    //     } catch (error) {
    //         console.error(error)
    //     }
    //     dispatch({ 
    //         type: FETCH_NEXT_DAYS_WEATHER,  
    //         payload: { data: data }
    //     })
    // }
}
 