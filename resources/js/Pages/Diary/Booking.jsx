import React, { useState } from 'react';
import {Head, router} from "@inertiajs/react";
import _ from 'lodash';
import setEventsData from '@/pages/Diary/Calender.jsx'
import moment from "moment";

const Booking = (
    {
        auth,
        type,
        mode,
        event,
        setEventsData,
        setIsShowEdit,
        setIsShowNew,
        storeLocalData,
        storeDataToDatabase,
        selectedDate
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
        values.end = values.start
        values.title = String(values.start).substr(11,5) + ' - ' + values.first_name.substr(0, 1) + ' ' + values.last_name
        if (values.id) {
            let index = _.findIndex(events, {'id': values.id,})
            if (index !== -1) {
                events[index] = values
            }
        } else {
            events.push(values)
        }
        storeDataToDatabase(values)
        storeLocalData(events)
        setEventsData(events)
        setIsShowEdit(false)
        setIsShowNew(false)
    }

    return (
        <>
            <div className='popup'>
                <div className="shadow-lg p-3 mb-5 bg-gray-100 rounded">
                    <div className="font-semibold">{mode} {type} Booking</div>
                    <form onSubmit={handleSubmit}>
                        <div className="py-1 text-left">
                            <label htmlFor="first_name">First name:</label>
                        </div>
                        <div className="py-1 text-left">
                            <input id="first_name" defaultValue={values ? values.first_name : ''} onChange={handleChange} />
                        </div>
                        <div className="py-1 text-left">
                            <label htmlFor="last_name">Last name:</label>
                        </div>
                        <div className="py-1 text-left">
                            <input id="last_name" defaultValue={values ? values.last_name : ''} onChange={handleChange} />
                        </div>
                        <div className="py-1 text-left">
                            <label htmlFor="email">Email:</label>
                        </div>
                        <div className="py-1 text-left">
                            <input id="email" defaultValue={values ? values.email : ''} onChange={handleChange} />
                        </div>
                        <div className="py-1 text-left">
                            <label htmlFor="tel_no">Telephone No:</label>
                        </div>
                        <div className="py-1 text-left">
                            <input id="tel_no" defaultValue={values ? values.tel_no : ''} onChange={handleChange} />
                        </div>
                        <div className="py-1 text-left">
                            <label htmlFor="weight">Weight:</label>
                        </div>
                        <div className="py-1 text-left">
                            <input id="weight" defaultValue={values ? values.weight : ''} onChange={handleChange} />
                        </div>
                        <div className="py-1 text-left">
                            <label htmlFor="start">Time:</label>
                        </div>
                        <div className="py-1 text-left">
                            <select id="start" defaultValue={values ? moment(new Date(new Date(values.start).setMinutes(0)).setSeconds(0)).format("YYYY-MM-DD HH:mm:ss") : null} onChange={handleChange} >
                                <option value="">Please Select</option>
                                <option value={moment(new Date(new Date(new Date(selectedDate).setHours(8)).setMinutes(0)).setSeconds(0)).format("YYYY-MM-DD HH:mm:ss")}>08:00</option>
                                <option value={moment(new Date(new Date(new Date(selectedDate).setHours(10)).setMinutes(0)).setSeconds(0)).format("YYYY-MM-DD HH:mm:ss")}>10:00</option>
                                <option value={moment(new Date(new Date(new Date(selectedDate).setHours(12)).setMinutes(0)).setSeconds(0)).format("YYYY-MM-DD HH:mm:ss")}>12:00</option>
                                <option value={moment(new Date(new Date(new Date(selectedDate).setHours(14)).setMinutes(0)).setSeconds(0)).format("YYYY-MM-DD HH:mm:ss")}>14:00</option>
                                <option value={moment(new Date(new Date(new Date(selectedDate).setHours(16)).setMinutes(0)).setSeconds(0)).format("YYYY-MM-DD HH:mm:ss")}>16:00</option>
                                <option value={moment(new Date(new Date(new Date(selectedDate).setHours(18)).setMinutes(0)).setSeconds(0)).format("YYYY-MM-DD HH:mm:ss")}>18:00</option>
                            </select>
                        </div>
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
