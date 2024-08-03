import React, { useContext, useState } from 'react'
import GlobalContext from '../context/GlobalContext'
const EventModel = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedLabel, setSelectedLabel] = useState("indigo");
    const labelClasses = ["indigo", "gray", "green", "blue", "red", "purple"];
    // Context
    const { setShowEventModal, daySelected, dispatchCalEvent } = useContext(GlobalContext);
    // submit handler
    function handleSubmit(e){
        e.preventDefault();
        const calendarEvent = {
            title, 
            description, 
            label: selectedLabel,
            day: daySelected.valueOf(),
            id: Date.now()
        }
        dispatchCalEvent({type: 'push', payload: calendarEvent});
        setShowEventModal(false)
    }
    return (
        <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center'>
            <form className='bg-white rounded-lg shadow-2xl w-1/4'>
                <header className='bg-gray-100 px-4 py-2 flex justify-between items-center'>
                    <span class="material-symbols-outlined text-gray-400">
                        drag_handle
                    </span>
                    <button onClick={() => setShowEventModal(false)}>
                        <span class="material-symbols-outlined text-gray-400">
                            close
                        </span>
                    </button>
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
                                    {selectedLabel === color  && <span class="material-symbols-outlined text-white text-sm">
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