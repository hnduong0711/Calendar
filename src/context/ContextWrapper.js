import React, { useEffect, useReducer, useState } from 'react'
import GlobalContext from './GlobalContext'
import dayjs from 'dayjs';

function savedEventsReducer(state, {type, payload}){
    switch (type) {
        case 'push':
            return [...state, payload]
        case 'update':
            return state.map(e => e.id === payload ? payload : e)
        case 'delete':
            return state.filter(e => e.id !== payload.id)
        default:
            throw new Error()
    }
}

function initEvents(){
    const storageEvents = localStorage.getItem('savedEvents');
    const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
    return parsedEvents;
}

const ContextWrapper = (props) => {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
    const [daySelected, setDaySelected] = useState(dayjs());
    const [showEventModal, setShowEventModal] = useState(false);
    const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer, [], initEvents);
    useEffect(() => {
        localStorage.setItem('savedEvents', JSON.stringify(savedEvents))
    }, [savedEvents]);

    useEffect(() => {
        if (smallCalendarMonth !== null) setMonthIndex(smallCalendarMonth)
    }, [smallCalendarMonth])

    return (
        <GlobalContext.Provider
            value={{
                monthIndex,
                setMonthIndex,
                smallCalendarMonth,
                setSmallCalendarMonth,
                daySelected,
                setDaySelected,
                showEventModal,
                setShowEventModal,
                dispatchCalEvent,
                savedEvents,
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    )
}

export default ContextWrapper