import React, {useState, useEffect, useCallback, useReducer} from 'react'
import moment from "moment"
import {Head} from "@inertiajs/react"
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"
import "react-big-calendar/lib/css/react-big-calendar.css"
import '../../../css/Calendar.css'
import _ from "lodash"

import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {createStore} from "redux";
import poolReducer from "@/Reducers/PoolReducer.jsx";

const View = ({ auth, manifests, pool, jumpers, type }) => {
    const preloadedState = {
        manifestsList:
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
                        {id: 5, firstName: "George", lastName: "Smith", job: "writer", salary: 50000},
                        {id: 6, firstName: "Michael", lastName: "Handler", job: "DJ", salary: 150000},
                        {id: 7, firstName: "Larry", lastName: "David", job: "writer", salary: 250000},
                        {id: 8, firstName: "Mindy", lastName: "Smith", job: "cook", salary: 120000}
                    ]
                },
                {
                    id: 3,
                    data: [
                        {id: 9, firstName: "George", lastName: "Smith", job: "writer", salary: 50000},
                        {id: 12, firstName: "Michael", lastName: "Handler", job: "DJ", salary: 150000},
                        {id: 13, firstName: "Larry", lastName: "David", job: "writer", salary: 250000},
                        {id: 14, firstName: "Mindy", lastName: "Smith", job: "cook", salary: 120000}
                    ]
                }
            ],
        pool: pool,
        jumpers: jumpers,
    }

    const [state, dispatch] = useReducer(poolReducer, preloadedState);
    const [manifestsData, setManifestsData] = useState(state.manifestsList)
    const [poolData, setPoolData] = useState(state.pool)
    const [jumperData, setJumperData] = useState(state.jumpers)

    const handleEventClick = (event, clicked) => {
        console.log('Clicked Jumper ID::', clicked)
    }

    const onDragEnd = useCallback((result) => {
        if (result.reason === "DROP") {
            if (!result.destination) {
                console.log('no action', result)
                return;
            }
            if(
                result.source.droppableId === "jumpersList"
                && result.destination.droppableId === "poolList"
            ) {
                addToPool(result)
                dispatch({ type: 'pool/added', payload: result })
            }
            if(
                result.source.droppableId === "poolList"
                && result.destination.droppableId === "jumpersList"
            ) {
                removeFromPool(result)
                dispatch({ type: 'pool/removed', payload: result })
            }
            reloadJumperList()
        }
    }, []);

    async function addToPool(result) {
        return await axios.post(
            '/pool/add',
            {
                id : jumperData[result.source.index].id
            }
        )
            .then(function (response) {
                console.log('Saved (bool)::',response)
            })
            .catch(function (error) {
                console.log('ERROR RESPONSE::', error)
                if(error.code === 'ERR_BAD_REQUEST') {
                    window.location.replace("/login")
                }
            })
    }

    async function removeFromPool(result) {
        return await axios.post(
            '/pool/remove',
            {
                id : poolData[result.source.index].id
            }
        )
            .then(function (response) {
                console.log('Saved (bool)::',response)
            })
            .catch(function (error) {
                console.log('ERROR RESPONSE::', error)
                if(error.code === 'ERR_BAD_REQUEST') {
                    window.location.replace("/login")
                }
            })
    }

    async function  reloadJumperList() {
        return await axios.get(
            '/manifest/jumpers'
        )
            .then(function (response) {
                dispatch({ type: 'jumpers/loaded', payload: response })
            })
            .catch(function (error) {
                console.log('ERROR RESPONSE::', error)
                if(error.code === 'ERR_BAD_REQUEST') {
                    window.location.replace("/login")
                }
            })
    }

    useEffect(() => {
        setPoolData(state.pool)
        setJumperData(state.jumpers)
    },[state])

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
                                                    <div className="grid grid-cols-4 gap-4">

                                                        <Droppable
                                                            className={'pl-6 truncate w-64'}
                                                            droppableId={'poolList'}
                                                            renderClone={(provided, snapshot, rubric) => (
                                                                <div
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    ref={provided.innerRef}
                                                                >
                                                                    <div
                                                                        key={poolData[rubric.source.index].id+'x'}
                                                                        className={'pl-6 truncate w-64'}
                                                                    >
                                                                        {poolData[rubric.source.index].first_name + ' ' + poolData[rubric.source.index].last_name}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        >
                                                            {provided => (
                                                                <>
                                                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                                                        <p className="font-bold pb-3">Ready</p>
                                                                        {poolData.map((item, index2) => (
                                                                            <Draggable
                                                                                draggableId={item.id+item.first_name+item.last_name+index2+'pdrag'}
                                                                                index={index2}
                                                                                key={item.id+item.first_name+item.last_name+index2+'pdrag'}
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
                                                                                            {item.first_name + ' ' + item.last_name}
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





                                                    <div className="grid grid-cols-4 gap-4">
                                                        <Droppable
                                                            className={'pl-6 truncate w-64'}
                                                            droppableId={'jumpersList'}
                                                            renderClone={(provided, snapshot, rubric) => (
                                                                <div
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    ref={provided.innerRef}
                                                                >
                                                                    <div
                                                                        key={jumperData[rubric.source.index].id+'x'}
                                                                        className={'pl-6 truncate w-64'}
                                                                    >
                                                                        {jumperData[rubric.source.index].first_name + ' ' + jumperData[rubric.source.index].last_name}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        >
                                                            {provided => (
                                                                <>
                                                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                                                        <p className="font-bold pb-3 pt-3">Parachutists</p>
                                                                        {state.jumpers.map((item, index2) => (
                                                                            <Draggable
                                                                                draggableId={item.id+item.first_name+item.last_name+index2+'jdrag'}
                                                                                index={index2}
                                                                                key={item.id+item.first_name+item.last_name+index2+'jdrag'}
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
                                                                                            {item.first_name + ' ' + item.last_name}
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
                                            <div className="col-span-6">

                                                 <div className="grid grid-cols-4 gap-4">
                                                    {manifestsData.map((manifest, index) => (
                                                        <div
                                                            className={'bg-slate-50 rounded-lg p-3'}
                                                            key={manifest.id+'_div'}
                                                        >

                                                            <Droppable
                                                                droppableId={manifest.id+'_manifest'}
                                                                renderClone={(provided, snapshot, rubric) => (
                                                                    <div
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        ref={provided.innerRef}
                                                                    >
                                                                        <div
                                                                            key={manifest.data[rubric.source.index].id+'x'}
                                                                            className={'truncate w-48'}
                                                                        >
                                                                            {manifest.data[rubric.source.index].firstName + ' ' + manifest.data[rubric.source.index].id}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            >
                                                                {provided => (
                                                                    <>
                                                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                                                        <p className="font-bold pb-3">Load {manifest.order}</p>
                                                                        {manifest.data.map((item, index2) => (
                                                                            <Draggable
                                                                                draggableId={manifest.id+'_'+item.id+index2+'_manifest'}
                                                                                index={index2}
                                                                                key={manifest.id+'_'+item.id+index2+'_manifest'}
                                                                                type={"A"}
                                                                            >
                                                                                {(provided, snapshot) => (
                                                                                    <div
                                                                                        {...provided.draggableProps}
                                                                                        {...provided.dragHandleProps}
                                                                                        ref={provided.innerRef}
                                                                                    >
                                                                                        <div
                                                                                            key={item.id+'_x'}
                                                                                            className={'truncate w-48'}
                                                                                            onClick={(e) => handleEventClick(e, item.id)}
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
