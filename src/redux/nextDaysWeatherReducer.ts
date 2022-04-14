import { AnyAction } from "redux"
import { FETCH_NEXT_DAYS_WEATHER } from "./types"
import { INDaysWeather } from "../interfaces"

const initialState: INDaysWeather = {
    // Weather data on next 3 days (current and 2 future)
    data: null
}

export const nextDaysWeatherReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case FETCH_NEXT_DAYS_WEATHER:
            return { data: action.payload }
        default: return state
    }
}