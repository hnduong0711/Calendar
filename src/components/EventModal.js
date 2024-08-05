import React, { useContext, useState } from 'react'
import GlobalContext from '../context/GlobalContext'
const EventModel = () => {
    const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } = useContext(GlobalContext);
    const labelClasses = ["indigo", "gray", "green", "blue", "red", "purple"];
    // const colorClasses = {
    //     indigo: "bg-indigo-500",
    //     gray: "bg-gray-500",
    //     green: "bg-green-500",
    //     blue: "bg-blue-500",
    //     red: "bg-red-500",
    //     purple: "bg-purple-500"
    // };
    const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
    const [description, setDescription] = useState(selectedEvent ? selectedEvent.description : "");
    const [selectedLabel, setSelectedLabel] = useState(selectedEvent ? labelClasses.find(lb => lb === selectedEvent.label) : labelClasses[0]);
    // Context
    // submit handler
    function handleSubmit(e) {
        e.preventDefault();
        const calendarEvent = {
            title,
            description,
            label: selectedLabel,
            day: daySelected.valueOf(),
            id: selectedEvent ? selectedEvent.id : Date.now(),
        }
        if (selectedEvent) {
            console.log('Update...');
            dispatchCalEvent({ type: 'update', payload: calendarEvent });
        } else {
            dispatchCalEvent({ type: 'push', payload: calendarEvent });
        }

        setShowEventModal(false)
    }
    return (
        <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center'>
            <form className='bg-white rounded-lg shadow-2xl w-1/4'>
                <header className='bg-gray-100 px-4 py-2 flex justify-between items-center'>
                    <span class="material-symbols-outlined text-gray-400">
                        drag_handle
                    </span>
                    <div>
                        {selectedEvent && (
                            <span
                                onClick={() => {
                                    dispatchCalEvent({ type: 'delete', payload: selectedEvent })
                                    setShowEventModal(false)
                                }}
                                class="material-symbols-outlined text-gray-400 cursor-pointer">
                                delete
                            </span>
                        )}
                        <button onClick={() => setShowEventModal(false)}>
                            <span class="material-symbols-outlined text-gray-400">
                                close
                            </span>
                        </button>
                    </div>
                </header>
                <div className='p-3'>
                    <div className='grid grid-cols-1/5 items-end gap-y-7'>
                        <div></div>
                        <input
                            className='pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500'
                            name='title'
                            type='text'
                            placeholder='Add title'
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <span class="material-symbols-outlined text-gray-400">
                            schedule
                        </span>
                        <p>{daySelected.format("dddd, MMMM DD")}</p>
                        <span class="material-symbols-outlined text-gray-400">
                            segment
                        </span>
                        <input
                            className='pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500'
                            name='description'
                            type='text'
                            placeholder='Add description'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                        <span class="material-symbols-outlined text-gray-400">
                            bookmark_border
                        </span>
                        <div className="flex gap-x-2">
                            {labelClasses.map((color, i) => (
                                <span
                                    key={i}
                                    onClick={() => setSelectedLabel(color)}
                                    className={`flex justify-center items-center rounded-full h-6 w-6 bg-${color}-500 cursor-pointer`}
                                >
                                    {selectedLabel === color && <span class="material-symbols-outlined text-white text-sm">
                                        check
                                    </span>}
                                </span>

                            ))}
                        </div>
                    </div>
                </div>
                <footer className='flex justify-end w-100 border-t p-3 mt-5'>
                    <button
                        type='submit'
                        className='bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white'
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
                </footer>
            </form>
        </div>
    )
}

export default EventModel