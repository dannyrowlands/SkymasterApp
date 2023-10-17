import React, {useEffect, useState} from 'react';
import {Head, router} from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Table from '@/Components/Table.jsx'
import storeLocalData from '@/Pages/Diary/Calender'
const List = (
    {
        auth,
        jumpers
    }
) => {

    const myList = []
    const modelName = 'Jumper'
    const [tbodyData, setTbodyData] = useState([])

    const handleClick = (id, modelName) => {
        console.log('CLICKED ' + modelName + ' :: ',id)
    }

    useEffect(() => {
        let count = 0
        jumpers.forEach((jumper, index) => {
            count++
            myList.push(
                {
                    id: jumper.id,
                    items: Object.values(jumper),
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
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Parachutists</h2>}
            >
                <Head title="Calender" />
                <div className='app'>
                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6 text-gray-900">
                                    <h1 className='text-center'>Parachutists</h1>
                                    <div className='list-container'>
                                        <Table
                                            theadData={theadData}
                                            tbodyData={tbodyData}
                                            handleClick={handleClick}
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
