import React, {useEffect, useState} from 'react';
import {Head} from "@inertiajs/react";
import Table from '@/Components/Table.jsx'

const JumperList = (
    {
        list
    }
) => {

    const myList = []
    list.data.forEach((item, index) => {
        myList.push(
            {
                id: item.id,
                items: [
                    ['name', item.full_name, 'text', 'Name', 0],
                    ['email', item.email, 'email', 'Email', 1],
                    ['tel_no', item.tel_no, 'telephone', 'Telephone', 1],
                    ['dob', item.dob, 'date', 'Date of Birth', 1],
                    ['updated', item.last_updated, 'datetime', 'Last Updated', 0]
                ],
            }
        )
    })

    const headList = []
    const dataModelName = 'People'
    const [tbodyData, setTbodyData] = useState([])
    const [theadData, setTheadData] = useState([])
    const [isEditable, setIsEditable] = useState(false)

    const toggleEdit = () => {
        setIsEditable(!isEditable)
    }

    useEffect(() => {
        setTbodyData(myList)
        localStorage.setItem('jumpers', JSON.stringify(myList))
        myList[0].items.forEach((field, index) => {
            headList.push(field[3])
        })
        setTheadData(headList)
    },[])

    return (
        <>
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
                                        modelName={dataModelName}
                                        isEditable={isEditable}
                                        setTbodyData={setTbodyData}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JumperList
