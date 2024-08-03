import dayjs from 'dayjs'
import React, { useContext, useEffect, useState } from 'react'
import GlobalContext from '../context/GlobalContext';

const Day = ({ day, rowIndex }) => {
    const { setDaySelected, setShowEventModal, savedEvents } = useContext(GlobalContext);
    const [dayEvents, setDayEvents] = useState([]);
    
    useEffect(() => {
        const events = savedEvents.filter(
            (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
        );
        // console.log(savedEvents);
        // console.log(events);
        setDayEvents(events);
    }, [savedEvents, day])

    const getCurrentDayClass = () => {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? 'bg-blue-600 text-white rounded-full w-7' : "";
    }

    return (
        <div className='border border-gray-200 flex flex-col'>
            <header className='flex flex-col items-center'>
                {
                    rowIndex === 0 &&
                    <p className='text-sm mt-1'>{day.format('ddd').toUpperCase()}</p>
                }
                <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
                    {day.format('DD')}
                </p>
            </header>
            <div className='flex-1 cursor-pointer' onClick={() => {
                setDaySelected(day)
                setShowEventModal(true)
            }}>
                {dayEvents.map((e, i) => (
                    <div
                        key={i}
                        className={`bg-${e.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
                    >
                        {e.title}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Day