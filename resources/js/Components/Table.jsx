import React from "react";
import TableRow from "./TableRow";
import TableHeadItem from "./TableHead";

const Table = ({ theadData, tbodyData, handleClick, modelName, customClass = 'table' }) => {

    return (
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
                const object = item.items
                return <TableRow key={item.id+'-'+Math.floor(Math.random() * 100000)} id={item.id} data={item.items} handleClick={handleClick} modelName={modelName}/>;
            })}
            </tbody>
        </table>
    );
};

export default Table;
