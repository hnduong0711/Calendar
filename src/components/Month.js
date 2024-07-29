import React from 'react'
import Day from './Day'

const Month = ({ month }) => {
    return (
        <div className='flex-1 grid grid-cols-7 grid-rows-5'>
            {
                month.map((row, im) => (
                    <React.Fragment key={im}>
                        {
                            row.map((day, id) => (
                                <Day day={day} key={id} rowIndex={im} />
                            ))
                        }
                    </React.Fragment>
                ))
            }
        </div>
    )
}

export default Month