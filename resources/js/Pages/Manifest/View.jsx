import React, {useState, useEffect, useCallback, useReducer} from 'react'
import moment from "moment"
import {Head} from "@inertiajs/react"
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"
import "react-big-calendar/lib/css/react-big-calendar.css"
import '../../../css/Calendar.css'
import _ from "lodash"

import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import MD5 from "crypto-js/md5"


const View = ({ auth, bookings, type }) => {

    const manifestsList =
        [
            {
                id: 1,
                data: [
                    {id: 1, firstName: "George", lastName: "Smith", job: "writer", salary: 50000},
                    {id: 2, firstName: "Michael", lastName: "Handler", job: "DJ", salary: 150000},
                    {id: 3, firstName: "Larry", lastName: "David", job: "writer", salary: 250000},
                    {id: 4, firstName: "Mindy", lastName: "Smith", job: "cook", salary: 120000}
                ]
            },
            {
                id: 2,
                data: [
                    {id: 1, firstName: "George", lastName: "Smith", job: "writer", salary: 50000},
                    {id: 2, firstName: "Michael", lastName: "Handler", job: "DJ", salary: 150000},
                    {id: 3, firstName: "Larry", lastName: "David", job: "writer", salary: 250000},
                    {id: 4, firstName: "Mindy", lastName: "Smith", job: "cook", salary: 120000}
                ]
            },
            {
                id: 3,
                data: [
                    {id: 1, firstName: "George", lastName: "Smith", job: "writer", salary: 50000},
                    {id: 2, firstName: "Michael", lastName: "Handler", job: "DJ", salary: 150000},
                    {id: 3, firstName: "Larry", lastName: "David", job: "writer", salary: 250000},
                    {id: 4, firstName: "Mindy", lastName: "Smith", job: "cook", salary: 120000}
                ]
            },
        ]

    const pool =
        {
            id: 1,
            data: [
                {id: 1, firstName: "Georgex", lastName: "Smith", job: "writer", salary: 50000},
                {id: 2, firstName: "Michaelx", lastName: "Handler", job: "DJ", salary: 150000},
                {id: 3, firstName: "Larryx", lastName: "David", job: "writer", salary: 250000},
                {id: 4, firstName: "Mindyx", lastName: "Smith", job: "cook", salary: 120000}
            ]
        }


    const [myEventsList, setMyEventsList] = useState([])

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
        // bookings.forEach((booking, index) => {
        //     let date = new Date(booking.booking_timestamp)
        //     let title = String(date).substr(16,2) + ' - ' + booking.first_name.substr(0, 1) + ' ' + booking.last_name
        //     if (type === 'ALL')
        //     {
        //         title = '(' + booking.booking_type.substr(0, 2) + ') ' + String(date).substr(16,2) + ' - ' + booking.first_name.substr(0, 1) + ' ' + booking.last_name
        //     }

            // manifestsList.push(
            //     {
            //         start: date,
            //         end: date,
            //         all_day: false,
            //         first_name: booking.first_name,
            //         last_name: booking.last_name,
            //         title: title,
            //         email: booking.email,
            //         weight: booking.weight,
            //         tel_no: booking.tel_no,
            //         id: booking.id,
            //         index: index,
            //         type: booking.booking_type,
            //         dob: booking.dob,
            //     }
            // )
        //})
        //storeLocalData(manifestsList)
    },[])

    const [manifestsData, setManifestsData] = useState(manifestsList)

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

    const onDragEnd = useCallback((result) => {
        if (result.reason === "DROP") {
            if (!result.destination) {
                console.log('no action', result)
                return;
            }
            console.log('Action Ready', result)
        }
    }, []);

    function uniqueId() {
        // desired length of Id
        var idStrLen = 32;
        // always start with a letter -- base 36 makes for a nice shortcut
        var idStr = (Math.floor((Math.random() * 25)) + 10).toString(36) + "_";
        // add a timestamp in milliseconds (base 36 again) as the base
        idStr += (new Date()).getTime().toString(36) + "_";
        // similar to above, complete the Id using random, alphanumeric characters
        do {
            idStr += (Math.floor((Math.random() * 35))).toString(36);
        } while (idStr.length < idStrLen);

        return (idStr);
    }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manifest</h2>}
        >
            <Head title="View" />
                <div className='app'>
                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900">
                                    <div className='manifest-container'>

                                        <DragDropContext onDragEnd={onDragEnd}>
                                            <div className="grid grid-cols-8 gap-4">
                                                <div className={'col-span-2 p-3'}>
                                                    <p className="font-bold pb-3">Pool</p>
                                                    <div className="grid grid-cols-4 gap-4">

                                                        <Droppable
                                                            className={'pl-6 truncate w-64'}
                                                            droppableId={pool.id+'drop'+uniqueId().toString()}
                                                            renderClone={(provided, snapshot, rubric) => (
                                                                <div
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    ref={provided.innerRef}
                                                                >
                                                                    <div
                                                                        key={pool.data[rubric.source.index].id+'x'}
                                                                    >
                                                                        {pool.data[rubric.source.index].firstName + ' ' + pool.data[rubric.source.index].lastName}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        >
                                                            {provided => (
                                                                <>
                                                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                                                        {pool.data.map((item, index2) => (
                                                                            <Draggable
                                                                                draggableId={item.id+'drag'+uniqueId().toString()}
                                                                                index={index2}
                                                                                key={pool.id+item.id}
                                                                                type={"A"}
                                                                            >
                                                                                {(provided, snapshot) => (
                                                                                    <div
                                                                                        {...provided.draggableProps}
                                                                                        {...provided.dragHandleProps}
                                                                                        ref={provided.innerRef}
                                                                                    >
                                                                                        <div
                                                                                            key={item.id+'x'}
                                                                                            className={'pl-6 truncate w-64'}
                                                                                        >
                                                                                            {item.firstName + ' ' + item.lastName}
                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                            </Draggable>
                                                                        ))}
                                                                    </div>
                                                                    {provided.placeholder}
                                                                </>
                                                            )}
                                                        </Droppable>

                                                </div>
                                            </div>
                                            <div className="col-span-6 p-3">
                                                <p className="font-bold pb-3">Loads</p>
                                                 <div className="grid grid-cols-4 gap-4">
                                                    {manifestsList.map((manifest, index) => (
                                                        <div
                                                            className={'bg-slate-50 rounded-lg'}
                                                            key={manifest.id+'div'}
                                                        >

                                                            <Droppable
                                                                droppableId={manifest.id+'drop'+uniqueId().toString()}
                                                                renderClone={(provided, snapshot, rubric) => (
                                                                    <div
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        ref={provided.innerRef}
                                                                    >
                                                                        <div
                                                                            key={manifest.data[rubric.source.index].id+'x'}
                                                                            className={'pl-6 truncate w-48'}
                                                                        >
                                                                            {manifest.data[rubric.source.index].firstName + ' ' + manifest.data[rubric.source.index].id}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            >
                                                                {provided => (
                                                                    <>
                                                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                                                        {manifest.data.map((item, index2) => (
                                                                            <Draggable
                                                                                draggableId={item.id+'drag'+uniqueId().toString()}
                                                                                index={index2}
                                                                                key={manifest.id+item.id}
                                                                                type={"A"}
                                                                            >
                                                                                {(provided, snapshot) => (
                                                                                    <div
                                                                                        {...provided.draggableProps}
                                                                                        {...provided.dragHandleProps}
                                                                                        ref={provided.innerRef}
                                                                                    >
                                                                                        <div
                                                                                            key={item.id+'x'}
                                                                                            className={'pl-6 truncate w-48'}
                                                                                        >
                                                                                            {item.firstName + ' ' + item.id}
                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                            </Draggable>
                                                                        ))}
                                                                    </div>
                                                                    {provided.placeholder}
                                                                    </>
                                                                )}
                                                            </Droppable>

                                                        </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </DragDropContext>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </AuthenticatedLayout>
    )

}

export default View
