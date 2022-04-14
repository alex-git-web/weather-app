
type wApiData = {
    apiKey: string,
    locationName: string,
    days: number,
}

async function getPastDayWeatherData(weatherApiConfigure: wApiData, pastDayDate: string): Promise<any> {  
    const url = 'http://api.weatherapi.com/v1/history.json?key=' 
        + weatherApiConfigure.apiKey 
        + '&q=' + weatherApiConfigure.locationName 
        + '&dt=' + pastDayDate;

    const response = await fetch(url)

    const json = await response.json()
    return json
}

export { getPastDayWeatherData }
