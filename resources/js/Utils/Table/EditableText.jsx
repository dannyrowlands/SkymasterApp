import React, { useState } from 'react';

const EditableText = (
    {
        auth,
        isShowEditableText,
        setIsShowEditableText,
        field,
        modelName,
        id,
        setTbodyData,
    }
) => {

    const [values, setValues] = useState(null)

    async function storeDataToDatabase(values, e) {
        return await axios.post(
            'update/' + modelName.toLowerCase() + '/' + id,
            values
        )
        .then(function (response) {
            const myList = JSON.parse(localStorage.getItem('jumpers'))
            var record = null
            var outerIndex = myList.map((o) => o.id).indexOf(id)
            myList[outerIndex].items.forEach((data, index) => {
                Array.prototype.inArray = function( needle ){
                    return Array(this).join(",").indexOf(needle) >-1;
                }
                if(data.inArray(Object.keys(values)))
                {
                    myList[outerIndex].items[index][1] = Object.values(values)[0]
                }
            })
            localStorage.setItem('jumpers', JSON.stringify(myList))
            setTbodyData(myList)
        })
        .catch(function (error) {
            console.log('ERROR RESPONSE::', error)
        })
    }

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues({
            [key]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        e.stopPropagation()
        storeDataToDatabase(values, e)
        setIsShowEditableText(false)
    }

    function hidePopup(e) {
        e.preventDefault()
        e.stopPropagation()
        setIsShowEditableText(false)
    }

    return (
        <>
            <div className='popup'>
                <div className="shadow-lg p-3 mb-5 bg-gray-100 rounded">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="py-1 text-left">
                                <label htmlFor={field[0]}>{field[3]}:</label>
                            </div>
                            <div className="py-1 text-left">
                                <input id={field[0]} defaultValue={field[1]} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="py-1 text-right float-sm-left col">
                                <button type="cancel" onClick={(e)=>hidePopup(e)}>Cancel</button>
                            </div>
                            <div className="py-1 text-left float-sm-right col">
                                <button type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditableText
