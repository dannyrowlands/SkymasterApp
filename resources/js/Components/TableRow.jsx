import React from "react";

const TableRow = ({
                      id,
                      data,
                      handleClick,
                      handleCellClick,
                      modelName,
                      isEditable,
                  }) => {

    return (
            <tr
                key={data[0][5]}
                onClick={(e) => handleClick(data[0][5], modelName, e)}
            >
                {data.map((item, index) => {
                    return <>
                        {isEditable && item[4] !== 0 && <td
                            key={index+'-'+id}
                            className={'pointer font-faint'}
                            onClick={(e) => handleCellClick(
                                item[5],
                                item,
                                e
                            )}
                            >{item[1]}
                        </td>}
                        {isEditable && item[4] === 0 && <td
                            key={index+'-'+id}>{item[1]}
                        </td>}
                        {!isEditable && <td
                            className={'pointer'}
                            key={index+'-'+id}>{item[1]}
                        </td>}
                    </>
                })}
            </tr>
    );
};

export default TableRow;
