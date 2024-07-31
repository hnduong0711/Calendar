import dayjs from 'dayjs'
import React, { useContext, useEffect, useState } from 'react'
import { getMonth } from '../util'
import GlobalContext from '../context/GlobalContext'

const SmallCalendar = () => {
    const [currentMonthIndex, setCurrentMonthIndex] = useState(dayjs().month())
    const [currentMonth, setCurrentMonth] = useState(getMonth())
    // global context
    const { monthIndex, setSmallCalendarMonth, setDaySelected, daySelected } = useContext(GlobalContext)
    // get new month array, when month index of small calendar changed
    useEffect(() => {
        setCurrentMonth(getMonth(currentMonthIndex))
    }, [currentMonthIndex]);
    // when month context change, set month of small calendar 
    useEffect(() => {
        setCurrentMonthIndex(monthIndex)
    }, [monthIndex])
    // handle month of small calendar
    const handlePrevMonth = () => {
        setCurrentMonthIndex(currentMonthIndex - 1)
    }
    const handleNextMonth = () => {
        setCurrentMonthIndex(currentMonthIndex + 1)
    }

    // 
    const getDayClass = (day) => {
        const format = "DD-MM-YY";
        const nowDay = dayjs().format(format);
        const currentDay = day.format(format);
        const slDay = daySelected && daySelected.format(format);
        if (nowDay === currentDay) return 'bg-blue-600 rounded-full text-white';
        else if (currentDay === slDay) {
            return "bg-blue-100 rounded-full text-blue-600 font-bold"
        }
        else return "";
    }
    return (
        <div className='mt-9'>
            <header className='flex justify-between '>
                <p className='text-gray-500 font-bold'>
                    {dayjs(new Date(dayjs().year(), currentMonthIndex)).format("MMMM YYYY")}
                </p>
                <div>
                    <button>
                        <span
                            className='material-symbols-outlined cursor-pointer text-gray-600 mx-2'
                            onClick={handlePrevMonth}>
                            chevron_left
                        </span>
                    </button>
                    <button>
                        <span
                            class="material-symbols-outlined cursor-pointer text-gray-600 mx-2"
                            onClick={handleNextMonth}>
                            chevron_right
                        </span>
                    </button>
                </div>
            </header>
            <div className='grid grid-cols-7 grid-rows-6'>
                {/* Name of date */}
                {currentMonth[0].map((day, i) => (
                    <span key={i} className='text-sm '>
                        {day.format('dd').charAt(0)}
                    </span>
                ))}
                {/* Display days of month */}
                {currentMonth.map((row, im) => (
                    <React.Fragment key={im}>
                        {row.map((day, id) => (
                            <button
                                key={id}
                                onClick={() => {
                                    console.log(day);
                                    setSmallCalendarMonth(currentMonthIndex)
                                    setDaySelected(day)
                                }}
                                className={`py-1 w-full ${getDayClass(day)}`}
                            >
                                <span className='text-sm'>
                                    {day.format('D')}
                                </span>
                            </button>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default SmallCalendar