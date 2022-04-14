import { AnyAction } from "redux"
import { SET_WEATHER_API_CONFIGURE } from "./types"
import { IWApiConfigure } from "../interfaces"

const initialState: IWApiConfigure = {
    apiKey: '',
    locationName: '',
    days: undefined
}

export const weatherApiConfigureReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case SET_WEATHER_API_CONFIGURE:
            return { 
                apiKey: action.payload.apiKey,
                locationName: action.payload.locationName,
                days: action.payload.days,
            }
        default: return state
    }
}