import React, {useEffect, useState} from 'react';
import {Head, router} from "@inertiajs/react";
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Table from '@/Components/Table.jsx'
import storeLocalData from '@/Pages/Diary/Calender'
const List = (
    {
        auth,
        list
    }
) => {

    const myList = []
    const modelName = 'Jumper'
    const [tbodyData, setTbodyData] = useState([])
    const [isEditable, setIsEditable] = useState(false)

    const handleCellClick = (id, modelName, field, item, e) => {
        e.stopPropagation()
        console.log('CLICKED ' + modelName + ' :: ID-' + id + ' FIELD-' + field + ' VALUE-' + item)

    }

    const handleClick = (id, modelName) => {
        console.log('CLICKED ' + modelName + ' :: ',id)
    }

    const toggleEdit = () => {
        setIsEditable(!isEditable)
        console.log('isEditable::',isEditable)
    }

    useEffect(() => {
        list.data.forEach((item, index) => {
            myList.push(
                {
                    id: item.id,
                    items: [
                        ['name', item.full_name],
                        ['email', item.email],
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
                header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Parachutists</h2>}
            >
                <Head title="Parachutists" />
                <div className='app'>
                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                {isEditable &&
                                    <div className={"p-2"}>
                                        <button className={'button'} onClick={toggleEdit}>[Select View Mode]</button>
                                    </div>
                                }
                                {!isEditable &&
                                    <div className={"p-2"}>
                                        <button className={'button'} onClick={toggleEdit}>[Select Edit Mode]</button>
                                    </div>
                                }
                                <div className="p-6 text-gray-900">
                                    <div className='list-container'>
                                        <Table
                                            theadData={theadData}
                                            tbodyData={tbodyData}
                                            handleClick={handleClick}
                                            handleCellClick={handleCellClick}
                                            modelName={modelName}
                                            isEditable={isEditable}
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
