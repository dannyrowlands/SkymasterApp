import React from "react";

const TableRow = ({ id, data, handleClick }) => {
    return (
        <tr onClick={() => handleClick(id)}>
            {data.map((item) => {
                return <td key={item+Math.floor(Math.random() * 100000)}>{item}</td>;
            })}
        </tr>
    );
};

export default TableRow;
