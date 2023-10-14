import React, { useState } from 'react';
import {Head, router} from "@inertiajs/react";
import _ from 'lodash';
import setEventsData from '@/pages/Diary/Calender.jsx'

const Booking = (
    {
         auth,
         type,
         mode,
         event,
         setEventsData,
         setIsShowEdit,
         setIsShowNew,
         storeDataToDatabase
    }
) => {

    const [values, setValues] = useState(event)

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        let events = JSON.parse(localStorage.getItem('events'))
        let index = _.findIndex(events, {'id': values.id,})
        values.end = values.start
        console.log('index',index)
        if (index !== -1) {
            console.log('ID FOUND')
            events[index] = values
            localStorage.setItem('events', JSON.stringify(events))
            console.log(events)
        } else {
            events.push(values); //Push New Item
            console.log('values::',values)
            localStorage.setItem('events', JSON.stringify(events)); //Update Storage
            console.log('ID NOT FOUND', events)
        }
        setEventsData(events)
        storeDataToDatabase(events[index])
        setIsShowEdit(false)
        setIsShowNew(false)
    }

    return (
        <>
            <div className='popup'>
                <div className="shadow-lg p-3 mb-5 bg-gray-100 rounded">
                    <div>{mode} {type} Booking</div>
                    <form onSubmit={handleSubmit}>
                        <div className="py-1 text-left">
                            <label htmlFor="title">First name:</label>
                        </div>
                        <div className="py-1 text-left">
                            <input id="title" defaultValue={values ? values.title : ''} onChange={handleChange} />
                        </div>
                        <div className="py-1 text-left">
                            <label htmlFor="start">Time:</label>
                        </div>
                        <div className="py-1 text-left">
                            <input id="start" defaultValue={values ? values.start : ''} onChange={handleChange} />
                        </div>
                        <div className="py-1 text-left">
                            <label htmlFor="email">Email:</label>
                        </div>
                        <div className="py-1 text-left">
                            <input id="email" defaultValue={values ? values.title : ''} onChange={handleChange} />
                        </div>
                        {/*<div className="py-1 text-left">*/}
                        {/*    <label htmlFor="time">Time:</label>*/}
                        {/*</div>*/}
                        {/*<div className="py-1 text-left">*/}
                        {/*    /!*<input id="time" value={values.time} onChange={handleChange} />*!/*/}
                        {/*    <select name="time" id="time" defaultValue={values ? values.time : '0800'} onChange={handleChange} >*/}
                        {/*        <option value="0800">08:00</option>*/}
                        {/*        <option value="1000">10:00</option>*/}
                        {/*        <option value="1200">12:00</option>*/}
                        {/*        <option value="1400">14:00</option>*/}
                        {/*        <option value="1600">16:00</option>*/}
                        {/*        <option value="1800">18:00</option>*/}
                        {/*    </select>*/}
                        {/*</div>*/}
                        <div className="py-1 text-right">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Booking
