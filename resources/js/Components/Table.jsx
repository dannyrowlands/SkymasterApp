import React, {useState} from "react";
import TableRow from "./TableRow";
import TableHeadItem from "./TableHead";
import EditableText from "@/Utils/Table/EditableText.jsx";

const Table = ({
                   theadData,
                   tbodyData,
                   modelName,
                   isEditable,
                   tEditableData,
                   customClass = 'table'
}) => {
    const [isShowEditableText, setIsShowEditableText] = useState(false)
    const [field, setField] = useState(null)

    const handleCellClick = (id, item, e) => {
        e.preventDefault()
        e.stopPropagation()
        setField(item)
        console.log('CLICKED ' + modelName + ' :: ID-' + id + ' FIELD-' + item[0] + ' VALUE-' + item)
        setIsShowEditableText(true)
    }

    const handleClick = (id, modelName, e) => {
        e.stopPropagation()
        console.log('CLICKED ' + modelName + ' :: ',id)
    }

    return (
        <>
            <table className={customClass}>
                <thead>
                <tr>
                    {theadData.map((h) => {
                        return <TableHeadItem key={h} item={h} />;
                    })}
                </tr>
                </thead>
                <tbody>
                {tbodyData.map((item) => {
                    return<TableRow
                        key={item.id+'-'+Math.floor(Math.random() * 100000)}
                        id={item.id} data={item.items}
                        handleClick={handleClick}
                        handleCellClick={handleCellClick}
                        modelName={modelName}
                        isEditable={isEditable}
                        tEditableData={tEditableData}
                        isShowEditableText={isShowEditableText}
                        setIsShowEditableText={setIsShowEditableText}
                        field={field}
                    />;
                })}
                </tbody>
            </table>
            {isShowEditableText &&
                <EditableText
                    isShowEditableText={isShowEditableText}
                    setIsShowEditableText={setIsShowEditableText}
                    field={field}
                />}
        </>
    );
};

export default Table;
