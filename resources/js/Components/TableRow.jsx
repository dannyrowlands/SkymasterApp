import React, {useState} from "react";
import EditableText from "@/Utils/Table/EditableText.jsx";

const TableRow = ({
                      id,
                      data,
                      handleClick,
                      handleCellClick,
                      modelName,
                      isEditable,
                      tEditableData,
                  }) => {

    return (
        <>
            <tr
                key={id+'-'+Math.floor(Math.random() * 100000)}
                onClick={(e) => handleClick(id, modelName, e)}
            >
                {data.map((item, index) => {
                    return <>
                        {isEditable && item[4] !== 0 && <td
                            key={index+'-'+id}
                            className={'pointer font-faint'}
                            onClick={(e) => handleCellClick(
                                id,
                                item,
                                e
                            )}
                            >{item[1]}
                        </td>}
                        {isEditable && item[4] === 0 && <td
                            key={index+'-'+id}>{item[1]}
                        </td>}
                        {!isEditable && <td
                            key={index+'-'+id}>{item[1]}
                        </td>}
                    </>
                })}
            </tr>
        </>
    );
};

export default TableRow;
