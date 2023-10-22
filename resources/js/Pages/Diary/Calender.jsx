import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"
import {Head} from "@inertiajs/react"
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Booking from '@/Pages/Diary/Booking.jsx'
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"
import "react-big-calendar/lib/css/react-big-calendar.css"
import '../../../css/Calendar.css'
import _ from "lodash"

const Calender = ({ auth, bookings, type }) => {

    const [isShowEdit, setIsShowEdit] = useState(false)
    const [isShowNew, setIsShowNew] = useState(false)
    const [mode, setMode] = useState('Add')
    const [currentEvent, setCurrentEvent] = useState(null)
    const [selectedDate, setSelectedDate] = useState(null)

    const myEventsList = []

    async function storeLocalData(events) {
        return await localStorage.setItem('events', JSON.stringify(events))
    }

    async function storeDataToDatabase(event) {
        return await axios.post(
            '/diary/booking/' + type,
            event
        )
        .then(function (response) {
            console.log('RESPONSE::',response)
        })
        .catch(function (error) {
            console.log('ERROR RESPONSE::', error)
            if(error.code === 'ERR_BAD_REQUEST') {
                window.location.replace("/login")
            }
        })
    }

    async function deleteFromDatabase(id) {
        return await axios.delete(
            '/diary/booking/' + id
        )
        .then(function (response) {
            console.log('RESPONSE::',response)
        })
        .catch(function (error) {
            console.log('ERROR RESPONSE::', error)
            if(error.code === 'ERR_BAD_REQUEST') {
                window.location.replace("/login")
            }
        })
    }

    useEffect(() => {
        bookings.forEach((booking, index) => {
            let date = new Date(booking.booking_timestamp)
            let title = String(date).substr(16,2) + ' - ' + booking.first_name.substr(0, 1) + ' ' + booking.last_name
            if (type === 'ALL')
            {
                title = '(' + booking.booking_type.substr(0, 2) + ') ' + String(date).substr(16,2) + ' - ' + booking.first_name.substr(0, 1) + ' ' + booking.last_name
            }

            myEventsList.push(
                {
                    start: date,
                    end: date,
                    all_day: false,
                    first_name: booking.first_name,
                    last_name: booking.last_name,
                    title: title,
                    email: booking.email,
                    weight: booking.weight,
                    tel_no: booking.tel_no,
                    id: booking.id,
                    index: index,
                    type: booking.booking_type,
                    dob: booking.dob,
                }
            )
        })
        storeLocalData(myEventsList)
    },[])

    const [eventsData, setEventsData] = useState(myEventsList)

    const localizer = momentLocalizer(moment)

    const DnDCalendar = withDragAndDrop(Calendar)

    const handleEventClick = event => {
        setSelectedDate(event.start)
        setMode('Edit')
        setCurrentEvent(event)
        setIsShowEdit(current => !current)
        setIsShowNew(false)
    }

    const handleDaySelect = event => {
        if (type !== 'ALL') {
            setSelectedDate(event)
            setMode('Add')
            setIsShowNew(current => !current)
            setIsShowEdit(false)
        }
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

    const eventStyleGetter = (event) => {
        var backgroundColor = '#ee9c9c'
        if(event.type === 'RAPS')
        {
            backgroundColor = '#81a2c2'
        }

        if(event.type === 'TANDEM')
        {
            backgroundColor = '#81c283'
        }

        if(event.type === 'AFF')
        {
            backgroundColor = '#c2c081'
        }
        var style = {
            backgroundColor: backgroundColor,
            borderRadius: '0px',
            opacity: 0.8,
            color: 'black',
            border: '0px',
            display: 'block'
        };
        return {
            style: style
        };
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Diaries</h2>}
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
                                            eventPropGetter={eventStyleGetter}
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
