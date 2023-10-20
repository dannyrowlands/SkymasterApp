import React, { useState } from 'react';
import {Head, router} from "@inertiajs/react";
import _ from 'lodash';
import moment from "moment";

const MEDICAL_AGE = 40;
const EditableText = (
    {
        auth,
        storeDataToDatabase,
        isShowEditableText,
        setIsShowEditableText,
        field
    }
) => {
    function handleSubmit(e) {
        e.preventDefault()
        e.stopPropagation()
        //storeDataToDatabase(values)
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
                                <label htmlFor={field[2]}>{field[3]}:</label>
                            </div>
                            <div className="py-1 text-left">
                                <input id={field[2]} defaultValue={field[1]} />
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
