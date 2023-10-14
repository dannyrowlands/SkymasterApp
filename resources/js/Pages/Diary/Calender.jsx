// import React, { useState } from 'react'
// import {Head} from "@inertiajs/react"
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
// import Booking from '@/pages/Diary/Booking.jsx'
// import Calendar from 'react-calendar'
// import {differenceInCalendarDays, parseISO} from 'date-fns'
// import '../../../css/Calendar.css'
//
// const Calender = ({ auth, bookings, type }) => {
//     //console.log('Bookings::',bookings)
//
//     const [date, setDate] = useState(new Date())
//     const [isShown, setIsShown] = useState(false)
//     const [mode, setMode] = useState('Add')
//     const [diaryBookings, setDiaryBookings] = useState(bookings)
//
//     const datesToAddContentTo = []
//
//     diaryBookings.forEach((booking, index) => {
//         datesToAddContentTo.push(
//             parseISO(booking.booking_timestamp)
//         )
//     })
//
//     //console.log('datesToAddContentTo', datesToAddContentTo)
//     const handleClick = event => {
//         setMode('Add')
//         setIsShown(current => !current)
//         console.log('Day Clicked', mode)
//     }
//
//     const handleEventClick = event => {
//         event.preventDefault()
//         setMode('Edit')
//         setIsShown(true)
//         console.log('Event Clicked', mode)
//     }
//
//     function isSameDay(a, b) {
//         return differenceInCalendarDays(a, b) === 0
//     }
//
//     function tileContent({ date, view }) {
//         // Add class to tiles in month view only
//         if (view === 'month') {
//             // Check if a date React-Calendar wants to check is on the list of dates to add class to
//             if (datesToAddContentTo.find(dDate => isSameDay(dDate, date))) {
//                  //console.log(date)
//                 // console.log(date.toISOString().replace(/[-+()\s]/g, '').substring(0, 8))
//                 return <div onClick={handleEventClick}>{ 'hello' }</div>
//             }
//         }
//     }
//
//
//
//     return (
//         <AuthenticatedLayout
//             user={auth.user}
//             header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Calender</h2>}
//         >
//             <Head title="Calender" />
//                 <div className='app'>
//                     <div className="py-12">
//                         <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
//                             <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
//                                 <div className="p-6 text-gray-900">
//                                     <h1 className='text-center'>{type} DIARY</h1>
//                                     <div className='calendar-container'>
//                                         <Calendar
//                                             onChange={setDate}
//                                             value={date}
//                                             tileContent={tileContent}
//                                             onClickDay={handleClick}
//                                         />
//                                     </div>
//                                     <p className='text-center'>
//                                         <span className='bold'>Selected Date:</span>{' '}
//                                         {date.toDateString()}
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             {isShown && <Booking auth={auth} type={type} mode={mode}/>}
//         </AuthenticatedLayout>
//     )
// }
//
// export default Calender


import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"
import {differenceInCalendarDays, parseISO, toDate} from 'date-fns'
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

    useEffect(() => {
        console.log('DB Bookings::',bookings)
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
                    setIsShowNew={setIsShowNew}
                    storeLocalData={storeLocalData}
                    storeDataToDatabase={storeDataToDatabase}
                    selectedDate={selectedDate}
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
                />}
        </AuthenticatedLayout>
    )

}

export default Calender
