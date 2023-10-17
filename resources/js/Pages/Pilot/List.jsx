import React, {useEffect, useState} from 'react';
import {Head, router} from "@inertiajs/react";
import _ from 'lodash';
import setEventsData from '@/pages/Diary/Calender.jsx'
import moment from "moment";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Table from "@/Components/Table.jsx";
const List = (
    {
        auth,
        pilots
    }
) => {
    const myList = []
    const [tbodyData, setTbodyData] = useState([])

    const handleClick = (id) => {
        console.log('CLICKED Pilot :: ',id)
    }

    useEffect(() => {
        let count = 0
        pilots.forEach((pilot, index) => {
            count++
            myList.push(
                {
                    id: count,
                    items: Object.values(pilot),
                }
            )
        })
        setTbodyData(myList)
    },[])

    const theadData = ['id', 'person_id', 'created_at', 'updated_at']
    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Pilots</h2>}
            >
                <Head title="Calender" />
                <div className='app'>
                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900">
                                    <h1 className='text-center'>Pilots</h1>
                                    <div className='list-container'>
                                        <Table
                                            theadData={theadData}
                                            tbodyData={tbodyData}
                                            handleClick={handleClick}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    )
}

export default List
