import React, {useEffect, useCallback, useReducer} from 'react'
import {Head} from "@inertiajs/react"
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"
import "react-big-calendar/lib/css/react-big-calendar.css"
import '../../../css/Calendar.css'

import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'
import poolReducer from "@/Reducers/PoolReducer.jsx"
import {doDragEnd, updateJumperManifestDetails} from "@/Utils/Manifest/functions.jsx"
import ManifestTab from "@/Pages/Manifest/Components/ManifestTab.jsx";
import PoolList from "@/Pages/Manifest/Components/PoolList.jsx";
import JumpersList from "@/Pages/Manifest/Components/JumpersList.jsx";

const View = ({ auth, manifests, pool, jumpers, type }) => {
    const preloadedState = {
        manifestsList: manifests,
        pool: pool,
        jumpers: jumpers,
    }

    const [state, dispatch] = useReducer(poolReducer, preloadedState);

    const handleEventClick = (event, clicked) => {
        console.log('Clicked Jumper ID::', clicked)
    }

    useEffect(() => {
        updateJumperManifestDetails(state)
    }, [state]);

    const onDragEnd = useCallback((result) => {
        doDragEnd(result, state, dispatch)
    }, []);

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
                                                    <PoolList state={state} ></PoolList>
                                                    <JumpersList state={state}></JumpersList>

                                            </div>
                                            <div className="col-span-6">
                                                {/*<Droppable*/}
                                                {/*    droppableId={'manifest'}*/}
                                                {/*    renderClone={(provided, snapshot, rubric) => (*/}
                                                {/*        <div*/}
                                                {/*            {...provided.draggableProps}*/}
                                                {/*            {...provided.dragHandleProps}*/}
                                                {/*            ref={provided.innerRef}*/}
                                                {/*        >*/}
                                                {/*            */}
                                                {/*        </div>*/}
                                                {/*    )}*/}
                                                {/*>*/}
                                                {/*    {provided => (*/}
                                                         <ManifestTab state={state} ></ManifestTab>
                                                {/*    )}*/}
                                                {/*</Droppable>*/}
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
