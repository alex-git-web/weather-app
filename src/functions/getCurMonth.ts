import { prepareCalendarMonth } from "../calendarData"

function getCurMonth(): boolean {
    // Get current date
    const currentDate: string = new Date().toISOString().split('T')[0].toString() // => date format = '2022-03-26'

    // Set current calendar month and status for each days of this month
    return prepareCalendarMonth(currentDate)
}

export default getCurMonth