// saga служит для выполнения промежуточных действий до основными действиями, которые выполняет action
import { takeEvery, put, call } from 'redux-saga/effects'
import { IWApiConfigure } from '../../interfaces'
import { REQUEST_NEXT_DAYS_WEATHER, FETCH_NEXT_DAYS_WEATHER } from '../types'

export function* sagaWatcher() { // * - generator
    yield takeEvery(REQUEST_NEXT_DAYS_WEATHER, sagaWorker) // side effect (для обработки каждого action поступающего в Redux store)
} 

type actionType = {
    type: any,
    payload: {
        url: string
    }
}
function* sagaWorker(action: actionType) { // sagaWorker будет вызывать takeEvery
    // console.log(action) // => type, payload
    try {
        const payload = yield call(fetchNextDaysWeather, action.payload.url)
        yield put({ type: FETCH_NEXT_DAYS_WEATHER, payload: payload }) // put - dispatch определенных событий в store
    } catch (error) {
        console.error(error)
    }
}

async function fetchNextDaysWeather(url: string): Promise<IWApiConfigure> {
    // const url = 'http://api.weatherapi.com/v1/forecast.json?key=526d4889d65b48cabba160455213011&q=London&days=10&aqi=no&alerts=no'
    const response = await fetch(url)
    return await response.json()
}