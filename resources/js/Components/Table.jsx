import React from "react";
import TableRow from "./TableRow";
import TableHeadItem from "./TableHead";

const Table = ({ theadData, tbodyData, handleClick, customClass = 'table' }) => {

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
                return <TableRow key={item.id} id={item.id} data={item.items} handleClick={handleClick}/>;
            })}
            </tbody>
        </table>
    );
};

export default Table;
