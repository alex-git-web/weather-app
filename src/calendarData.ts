type cObj = {
    monthNumber: String,
    isCurrent: boolean,
    days: Array<{
        id: number,
        date: string,
        status: string
    }>
}


type cData = Array<cObj>

const CalendarData: cData = [
    {
        monthNumber: "03",
        isCurrent: false,
        days: [
            {id: 1, date: "2022-02-28", status: '' },
            {id: 2, date: "2022-03-01", status: '' },
            {id: 3, date: "2022-03-02", status: '' },
            {id: 4, date: "2022-03-03", status: '' },
            {id: 5, date: "2022-03-04", status: '' },
            {id: 6, date: "2022-03-05", status: '' },
            {id: 7, date: "2022-03-06", status: '' },
            {id: 8, date: "2022-03-07", status: '' },
            {id: 9, date: "2022-03-08", status: '' },
            {id: 10, date: "2022-03-09", status: '' },
            {id: 11, date: "2022-03-10", status: '' },
            {id: 12, date: "2022-03-11", status: '' },
            {id: 13, date: "2022-03-12", status: '' },
            {id: 14, date: "2022-03-13", status: '' },
            {id: 15, date: "2022-03-14", status: '' },
            {id: 16, date: "2022-03-15", status: '' },
            {id: 17, date: "2022-03-16", status: '' },
            {id: 18, date: "2022-03-17", status: '' },
            {id: 19, date: "2022-03-18", status: '' },
            {id: 20, date: "2022-03-19", status: '' },
            {id: 21, date: "2022-03-20", status: '' },
            {id: 22, date: "2022-03-21", status: '' },
            {id: 23, date: "2022-03-22", status: '' },
            {id: 24, date: "2022-03-23", status: '' },
            {id: 25, date: "2022-03-24", status: '' },
            {id: 26, date: "2022-03-25", status: '' },
            {id: 27, date: "2022-03-26", status: '' },
            {id: 28, date: "2022-03-27", status: '' },
            {id: 29, date: "2022-03-28", status: '' },
            {id: 30, date: "2022-03-29", status: '' },
            {id: 31, date: "2022-03-30", status: '' },
            {id: 32, date: "2022-03-31", status: '' },
            {id: 33, date: "2022-04-01", status: '' },
            {id: 34, date: "2022-04-02", status: '' },
            {id: 35, date: "2022-04-03", status: '' }
        ]
    },
    {
        monthNumber: "04",
        isCurrent: false,
        days: [
            {id: 1, date: "2022-03-28", status: '' },
            {id: 2, date: "2022-03-29", status: '' },
            {id: 3, date: "2022-03-30", status: '' },
            {id: 4, date: "2022-03-31", status: '' },
            {id: 5, date: "2022-04-01", status: '' },
            {id: 6, date: "2022-04-02", status: '' },
            {id: 7, date: "2022-04-03", status: '' },
            {id: 8, date: "2022-04-04", status: '' },
            {id: 9, date: "2022-04-05", status: '' },
            {id: 10, date: "2022-04-06", status: '' },
            {id: 11, date: "2022-04-07", status: '' },
            {id: 12, date: "2022-04-08", status: '' },
            {id: 13, date: "2022-04-09", status: '' },
            {id: 14, date: "2022-04-10", status: '' },
            {id: 15, date: "2022-04-11", status: '' },
            {id: 16, date: "2022-04-12", status: '' },
            {id: 17, date: "2022-04-13", status: '' },
            {id: 18, date: "2022-04-14", status: '' },
            {id: 19, date: "2022-04-15", status: '' },
            {id: 20, date: "2022-04-16", status: '' },
            {id: 21, date: "2022-04-17", status: '' },
            {id: 22, date: "2022-04-18", status: '' },
            {id: 23, date: "2022-04-19", status: '' },
            {id: 24, date: "2022-04-20", status: '' },
            {id: 25, date: "2022-04-21", status: '' },
            {id: 26, date: "2022-04-22", status: '' },
            {id: 27, date: "2022-04-23", status: '' },
            {id: 28, date: "2022-04-24", status: '' },
            {id: 29, date: "2022-04-25", status: '' },
            {id: 30, date: "2022-04-26", status: '' },
            {id: 31, date: "2022-04-27", status: '' },
            {id: 32, date: "2022-04-28", status: '' },
            {id: 33, date: "2022-04-29", status: '' },
            {id: 34, date: "2022-04-30", status: '' },
            {id: 35, date: "2022-05-01", status: '' }
        ]
    }
]

let index: number  = -1
const prepareCalendarMonth = (currentDate: string): boolean => {
    // Set current month 
    index = CalendarData.findIndex(month => month.monthNumber == currentDate.split('-')[1]) //  "2022-03-20" => "03"
    CalendarData[index].isCurrent = true
    const daysCount: number = CalendarData[index].days.length

    // Set status for each days of current month
    for (let i = 0; i < daysCount; i++) {
        if (CalendarData[index].days[i].date === currentDate) {
            CalendarData[index].days[i].status = 'today'
            if (i - 1 >= 0) CalendarData[index].days[i-1].status = 'past'
            if (i - 2 >= 0) CalendarData[index].days[i-2].status = 'past'
            if (i - 3 >= 0) CalendarData[index].days[i-3].status = 'past'
            if (i - 4 >= 0) CalendarData[index].days[i-4].status = 'past'
            if (i - 5 >= 0) CalendarData[index].days[i-5].status = 'past'
            if (i - 6 >= 0) CalendarData[index].days[i-6].status = 'past'
            if (i - 7 >= 0) CalendarData[index].days[i-7].status = 'past'
            if (i + 1 <= daysCount) CalendarData[index].days[i+1].status = 'future'
            if (i + 2 <= daysCount) CalendarData[index].days[i+2].status = 'future'
        }
    }
    return true
}

const getCurrentMonth = (): cObj => CalendarData[index]

export { CalendarData, prepareCalendarMonth, getCurrentMonth }