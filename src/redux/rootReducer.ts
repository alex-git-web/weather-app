import { combineReducers } from "redux"
import { nextDaysWeatherReducer } from "./nextDaysWeatherReducer"
import { weatherApiConfigureReducer } from "./weatherApiConfigureReducer"

export const rootReducer = combineReducers({
    weatherApiConfigure: weatherApiConfigureReducer,
    nextDaysWeather: nextDaysWeatherReducer
})

type RootState = ReturnType<typeof rootReducer>