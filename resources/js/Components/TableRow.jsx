import React from "react";

const TableRow = ({ data }) => {
    return (
        <tr>
            {data.map((item) => {
                return <td key={item+Math.floor(Math.random() * 100000)}>{item}</td>;
            })}
        </tr>
    );
};

export default TableRow;
