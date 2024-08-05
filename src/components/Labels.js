import React, { useContext } from 'react'
import GlobalContext from '../context/GlobalContext'

const Labels = () => {
    const { labels, updateLabel } = useContext(GlobalContext)
  return (
    <React.Fragment>
        <p className='text-gray-500 font-bold mt-10'>
            Label
        </p>
        {
            labels.map(({label: lb, checked}, idx) => (
                <label key={idx} className='items-center mt-3 block'>
                    <input 
                    type="checkbox" 
                    onChange={() => updateLabel({label: lb,  checked: !checked})}
                    checked={checked} 
                    className={`form-checkbox size-5 text-${lb}-400 rounded focus:ring-0 cursor-pointer`} />
                    <span className='ml-2 text-gray-700 capitalize'>{lb}</span>
                </label>
            ))
        }
    </React.Fragment>
  )
}

export default Labels