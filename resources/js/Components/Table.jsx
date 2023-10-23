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
                   setTbodyData,
                   customClass = 'table'
}) => {

    const [isShowEditableText, setIsShowEditableText] = useState(false)
    const [field, setField] = useState(null)
    const [id, setId] = useState(null)

    const handleCellClick = (id, item, e) => {
        e.preventDefault()
        e.stopPropagation()
        setField(item)
        setId(id)
        //console.log('CLICKED ' + modelName + ' :: ID-' + id + ' FIELD[0]-' + item[0] + ' VALUE[1]-' + item[1] + ' TYPE[2]-' + item[2] + ' Display Name[3]' + item[3])
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
                <tr key="x">
                    {theadData.map((h) => {
                        return <TableHeadItem key={h} item={h} />;
                    })}
                </tr>
                </thead>
                <tbody>
                {tbodyData.map((item) => {
                    return <TableRow
                        key={item.id+'-'+Math.floor(Math.random() * 100000)}
                        id={item.id}
                        data={item.items}
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
                    modelName={modelName}
                    id={id}
                    setTbodyData={setTbodyData}
                />}
        </>
    );
};

export default Table;
