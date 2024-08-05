import React, { useEffect, useMemo, useReducer, useState } from 'react'
import GlobalContext from './GlobalContext'
import dayjs from 'dayjs';

function savedEventsReducer(state, { type, payload }) {
    switch (type) {
        case 'push':
            return [...state, payload]
        case 'update':
            return state.map(e => e.id === payload.id ? payload : e)
        case 'delete':
            return state.filter(e => e.id !== payload.id)
        default:
            throw new Error()
    }
}

function initEvents() {
    const storageEvents = localStorage.getItem('savedEvents');
    const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
    return parsedEvents;
}

const ContextWrapper = (props) => {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
    const [daySelected, setDaySelected] = useState(dayjs());
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState();
    const [labels, setLabels] = useState([])
    const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer, [], initEvents);
    const filteredEvents = useMemo(() => {
        return savedEvents.filter(e =>
            labels.filter(lb => lb.checked)
                .map(lb => lb.label)
                .includes(e.label)
        );
    }, [savedEvents, labels]);
    // Parse local storage -> savedEvents
    useEffect(() => {
        localStorage.setItem('savedEvents', JSON.stringify(savedEvents))
    }, [savedEvents]);
    // filter event depend on label
    useEffect(() => {
        setLabels(prevLabels => {
            return [...new Set(savedEvents.map(e => e.label))].map(label => {
                const currentLabel = prevLabels.find(lb => lb.label === label)
                return {
                    label,
                    checked: currentLabel ? currentLabel.checked : true,
                }
            })
        })
    }, [savedEvents]);

    useEffect(() => {
        if (smallCalendarMonth !== null) setMonthIndex(smallCalendarMonth)
    }, [smallCalendarMonth])

    function updateLabel(label) {
        setLabels(labels.map((lb) => lb.label === label.label ? label : lb))
    }

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
                selectedEvent,
                setSelectedEvent,
                setLabels,
                labels,
                updateLabel,
                filteredEvents
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    )
}

export default ContextWrapper