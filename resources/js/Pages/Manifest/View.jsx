import React, {useEffect, useCallback, useReducer} from 'react'
import {Head} from "@inertiajs/react"
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"
import "react-big-calendar/lib/css/react-big-calendar.css"
import '../../../css/Calendar.css'

import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
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

    const handleEventClick = (event, clicked) => {
        console.log('Clicked Jumper ID::', clicked)
    }

    useEffect(() => {
        updateJumperManifestDetails()
    }, [state]);

    const onDragEnd = useCallback((result) => {
        doDragEnd(result)
    }, []);

    async function doDragEnd(result) {
        if (result.reason === "DROP") {
            if (!result.destination) {
                return;
            }

            if(
                result.source.droppableId === "jumpersList"
                && result.destination.droppableId === "poolList"
            ) {
                await addToPool(result)
                    .then (function (response) {
                        dispatch({type: 'pool/added', payload: result})
                        reloadJumperList()
                    }
                )
            }

            if(
                result.source.droppableId === "poolList"
                && result.destination.droppableId === "jumpersList"
            ) {
                await removeFromPool(result)
                    .then (function (response) {
                        dispatch({type: 'pool/removed', payload: result})
                        reloadJumperList()
                    }
                )
            }

            if(
                result.source.droppableId === "poolList"
                && result.destination.droppableId === "poolList"
            ) {
                dispatch({type: 'pool/moved', payload: result})
                reloadJumperList()
            }
        }
    }

    async function updateJumperManifestDetails() {
        return await axios.post(
            '/manifest/set_details',
            {
                poolState : state.pool,
            }
        )
            .catch(function (error) {
                console.log('ERROR RESPONSE::', error)
                if(error.code === 'ERR_BAD_REQUEST') {
                    window.location.replace("/login")
                }
            })
    }

    async function addToPool(result) {
        return await axios.post(
            '/pool/add',
            {
                id : state.jumpers[result.source.index].id,
                sequence: result.destination.index,
                group_identifier: null,
                note: null
            }
        )
            .then(function (response) {
                console.log('Saved (bool)::',result)
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
                id : state.pool[result.source.index].id
            }
        )
            .then(function (response) {
                console.log('Saved (bool)::',result)
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
                                                                        key={state.pool[rubric.source.index].individual.id+'x'+rubric.source.index}
                                                                        className={'pl-6 truncate w-64'}
                                                                    >
                                                                        {state.pool[rubric.source.index].individual.first_name + ' ' + state.pool[rubric.source.index].individual.last_name}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        >
                                                            {provided => (
                                                                <>
                                                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                                                        <p className="font-bold pb-3">Ready</p>
                                                                        {state.pool.map((item, index) => (
                                                                            <Draggable
                                                                                draggableId={item.id+item.individual.first_name+item.individual.last_name+item.individual.id+index+'pdrag'}
                                                                                index={index}
                                                                                key={item.id+item.individual.first_name+item.individual.last_name+item.individual.id+'pdrag'}
                                                                            >
                                                                                {(provided, snapshot) => (
                                                                                    <div
                                                                                        {...provided.draggableProps}
                                                                                        {...provided.dragHandleProps}
                                                                                        ref={provided.innerRef}
                                                                                    >
                                                                                        <div
                                                                                            key={item.id+'x'+index}
                                                                                            className={'pl-6 truncate w-64'}
                                                                                        >
                                                                                            {item.individual.first_name + ' ' + item.individual.last_name}
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
                                                                        key={state.jumpers[rubric.source.index].id+'x'+rubric.source.index}
                                                                        className={'pl-6 truncate w-64'}
                                                                    >
                                                                        {state.jumpers[rubric.source.index].individual.first_name + ' ' + state.jumpers[rubric.source.index].individual.last_name}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        >
                                                            {provided => (
                                                                <>
                                                                    <div ref={provided.innerRef} {...provided.droppableProps}>
                                                                        <p className="font-bold pb-3 pt-3">Parachutists</p>
                                                                        {state.jumpers.map((item, index) => (
                                                                            <Draggable
                                                                                draggableId={item.id+item.individual.first_name+item.individual.last_name+item.individual_id+index+'jdrag'}
                                                                                index={index}
                                                                                key={index}
                                                                            >
                                                                                {(provided, snapshot) => (
                                                                                    <div
                                                                                        {...provided.draggableProps}
                                                                                        {...provided.dragHandleProps}
                                                                                        ref={provided.innerRef}
                                                                                    >
                                                                                        <div
                                                                                            key={item.id+'x'+index}
                                                                                            className={'pl-6 truncate w-64'}
                                                                                        >
                                                                                            {item.individual.first_name + ' ' + item.individual.last_name}
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
                                                    {state.manifestsList.map((manifest, index) => (
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
                                                                        {manifest.data.map((item, index) => (
                                                                            <Draggable
                                                                                draggableId={manifest.id+'_'+item.id+index+'_manifest'}
                                                                                index={index}
                                                                                key={manifest.id+'_'+item.id+index+'_manifest'}
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
