export interface INavigationData {
    navigation: any
    route: any
}

// Weather API configure data
export interface IWApiConfigure {
    apiKey: string,
    locationName: string,
    days: number | undefined // current days (first day - 'today', other days - 'future') for which will loaded  weather data
}

// Weather data on next 3 days (current and 2 future)
export interface INDaysWeather {
    data: {
        location: any,
        current: any,
        forecast: any
    }
}