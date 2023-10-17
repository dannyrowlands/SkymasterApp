import React from "react";

const TableRow = ({ id, data, handleClick, modelName }) => {
    return (
        <tr onClick={() => handleClick(id, modelName)}>
            {data.map((item) => {
                return <td key={item+Math.floor(Math.random() * 100000)}>{item}</td>;
            })}
        </tr>
    );
};

export default TableRow;
