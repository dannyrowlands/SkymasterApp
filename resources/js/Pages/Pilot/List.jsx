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
        list
    }
) => {
    const myList = []
    const modelName = 'Pilot'
    const [tbodyData, setTbodyData] = useState([])

    const handleCellClick = (id, modelName, field, item, e) => {
        e.stopPropagation()
        console.log('CLICKED ' + modelName + ' :: ID-' + id + ' FIELD-' + field + ' VALUE-' + item)
    }

    const handleClick = (id, modelName) => {
        console.log('CLICKED ' + modelName + ' :: ',id)
    }

    useEffect(() => {
        list.data.forEach((item, index) => {
            myList.push(
                {
                    id: item.id,
                    items: [
                        [ 'name', item.full_name],
                        [ 'email', item.email],
                        ['tel_no', item.tel_no],
                        ['dob', item.dob],
                        ['updated', item.last_updated]
                    ],
                }
            )
        })
        setTbodyData(myList)
    },[])

    const theadData = [
        'Name',
        'Email',
        'Telephone',
        'Date of Birth',
        'Last Updated'
    ]

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
                                            handleCellClick={handleCellClick}
                                            modelName={modelName}
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
