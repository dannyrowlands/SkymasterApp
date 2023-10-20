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
                onClick={(e) => handleClick(id, modelName, e)}
            >
                {data.map((item) => {
                    return <>
                        {isEditable && tEditableData.indexOf(item[0]) !== -1 && <td
                            className={'pointer font-faint'}
                            onClick={(e) => handleCellClick(
                                id,
                                item,
                                e
                            )}
                            key={item[1]+'-'+Math.floor(Math.random() * 100000)}>{item[1]}
                        </td>}
                        {isEditable && tEditableData.indexOf(item[0]) === -1 && <td
                            key={item[1]+'-'+Math.floor(Math.random() * 100000)}>{item[1]}
                        </td>}
                        {!isEditable && <td
                            key={item[1]+'-'+Math.floor(Math.random() * 100000)}>{item[1]}
                        </td>}

                    </>
                })}
            </tr>
        </>
    );
};

export default TableRow;
