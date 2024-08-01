import './App.css';
import React, { useContext, useEffect, useState } from 'react'
import { getMonth } from './util';
import CalendarHeader from './components/CalendarHeader';
import Sidebar from './components/Sidebar';
import Month from './components/Month';
import GlobalContext from './context/GlobalContext';
import EventModel from './components/EventModal';
function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex))
  }, [monthIndex]);

  return (
    <div className="App">
      <>
        {showEventModal && <EventModel />}
        <div class="h-screen flex flex-col ">
          <CalendarHeader />
          <div class="flex flex-1">
            <Sidebar />
            <Month month={currentMonth} />
          </div>
        </div>
      </>
    </div>
  );
}

export default App;
