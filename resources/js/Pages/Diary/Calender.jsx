import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"
import {differenceInCalendarDays, parseISO, toDate} from 'date-fns'
import { setAuth, refreshToken } from '@/Pages/Auth/HandleTokens.jsx'
import {Head, router} from "@inertiajs/react"
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Booking from '@/Pages/Diary/Booking.jsx'
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"
import "react-big-calendar/lib/css/react-big-calendar.css"
import '../../../css/Calendar.css'
import _ from "lodash"

const Calender = ({ auth, bookings, type }) => {

    const [date, setDate] = useState(new Date())
    const [isShowEdit, setIsShowEdit] = useState(false)
    const [isShowNew, setIsShowNew] = useState(false)
    const [mode, setMode] = useState('Add')
    const [currentEvent, setCurrentEvent] = useState(null)
    const [selectedDate, setSelectedDate] = useState(null)

    const myEventsList = []

    async function storeLocalData(events) {
        console.log('myEventsList', myEventsList)
        return await localStorage.setItem('events', JSON.stringify(events))
    }

    async function storeDataToDatabase(event) {
        console.log('event::', event)
        // if(!event.id)
        // {
        //     event.type = type
        //     event.start = new Date(booking.booking_timestamp),
        //     event.end = new Date(booking.booking_timestamp),
        //
        // }
        console.log('RUNNING ASYNC storeToDatabase')
        return await axios.post(
            '/diary/booking/' + type,
            event
        )
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    async function deleteFromDatabase(id) {
        console.log('event id::', id)
        console.log('RUNNING ASYNC deleteFromDatabase')
        return await axios.delete(
            '/diary/booking/' + id
        )
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    useEffect(() => {
        bookings.forEach((booking, index) => {
            console.log('Timestamp::',new Date(booking.booking_timestamp))
            let date = new Date(booking.booking_timestamp)
            myEventsList.push(
                {
                    start: date,
                    end: date,
                    all_day: false,
                    first_name: booking.first_name,
                    last_name: booking.last_name,
                    title: String(date).substr(16,5) + ' - ' + booking.first_name.substr(0, 1) + ' ' + booking.last_name,
                    email: booking.email,
                    weight: booking.weight,
                    tel_no: booking.tel_no,
                    id: booking.id,
                    index: index,
                    type: type
                }
            )
        })
        storeLocalData(myEventsList)
    },[])

    const [eventsData, setEventsData] = useState(myEventsList)

    const localizer = momentLocalizer(moment)

    const DnDCalendar = withDragAndDrop(Calendar)

    const handleEventClick = event => {
        console.log('EVENT START::', event.start)
        setSelectedDate(event.start)
        setMode('Edit')
        setCurrentEvent(event)
        setIsShowEdit(current => !current)
        setIsShowNew(false)
    }

    const handleDaySelect = event => {
        console.log('Day Clicked Event::', event)
        setSelectedDate(event)
        setMode('Add')
        setIsShowNew(current => !current)
        setIsShowEdit(false)
    }

    const onEventDrop = (data) => {
        data.event.start = moment(new Date(new Date(data.start))).format("YYYY-MM-DD HH:mm:ss")
        data.event.end = data.start
        let events = JSON.parse(localStorage.getItem('events'))
        let index = _.findIndex(events, {'id': data.event.id,})
        events[index] = data.event
        storeLocalData(events)
        storeDataToDatabase(data.event)
        setEventsData(events)
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Calender</h2>}
        >
            <Head title="Calender" />
                <div className='app'>
                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900">
                                    <h1 className='text-center'>{type} DIARY</h1>
                                    <div className="text-center">
                                        <a href="#" className="text-sm">[Bulk Edit Bookings]</a>
                                    </div>
                                    <div className='calendar-container'>
                                        <DnDCalendar
                                            popup
                                            defaultDate={moment().toDate()}
                                            defaultView="month"
                                            events={eventsData}
                                            localizer={localizer}
                                            onEventDrop={onEventDrop}
                                            resizable={false}
                                            style={{ height: "100vh" }}
                                            onSelectEvent={(event) => handleEventClick(event)}
                                            onDrillDown={(event) => handleDaySelect(event)}
                                            views={['month', 'agenda']}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {isShowEdit &&
                <Booking
                    auth={auth}
                    type={type}
                    mode={mode}
                    event={currentEvent}
                    setEventsData={setEventsData}
                    setIsShowEdit={setIsShowEdit}
                    isShowEdit={isShowEdit}
                    setIsShowNew={setIsShowNew}
                    storeLocalData={storeLocalData}
                    storeDataToDatabase={storeDataToDatabase}
                    selectedDate={selectedDate}
                    deleteFromDatabase={deleteFromDatabase}
                />}
            {isShowNew &&
                <Booking
                    auth={auth}
                    type={type}
                    mode={mode}
                    event={null}
                    setEventsData={setEventsData}
                    setIsShowEdit={setIsShowEdit}
                    setIsShowNew={setIsShowNew}
                    storeLocalData={storeLocalData}
                    storeDataToDatabase={storeDataToDatabase}
                    selectedDate={selectedDate}
                    deleteFromDatabase={deleteFromDatabase}
                />}
        </AuthenticatedLayout>
    )

}

export default Calender
