import React, {useState} from "react";

const TableRow = ({ id, data, handleClick, handleCellClick, modelName }) => {

    return (
        <tr onClick={() => handleClick(id, modelName)} className="pointer">
            {data.map((item) => {
                return <td
                    onClick={(e) => handleCellClick(
                        id,
                        modelName,
                        item[0],
                        item[1],
                        e
                    )}
                    key={item[1]+'-'+Math.floor(Math.random() * 100000)}>{item[1]}
                </td>;
            })}
        </tr>
    );
};

export default TableRow;
