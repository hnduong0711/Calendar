import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { getMonth } from '../util'

const SmallCalendar = () => {
    const [currentMonthIndex, setCurrentMonthIndex] = useState(dayjs().month())
    const [currentMonth, setCurrentMonth] = useState(getMonth())
    useEffect(() => {
        setCurrentMonth(getMonth(currentMonthIndex))
    }, [currentMonthIndex])
    return (
        <div className='mt-9'>
            <header className='flex justify-between '>
                <p className='text-gray-500 font-bold'>
                    {dayjs(new Date(dayjs().year(), currentMonthIndex)).format("MMMM YYYY")}
                </p>
                <button>
                    <span></span>
                </button>
            </header>
        </div>
    )
}

export default SmallCalendar