import React from "react";
import table from "@/Components/Table.jsx";

const TableHeadItem = ({ item }) => {
    return (
        <td title={item}>
            {item}
        </td>
    );
};

export default TableHeadItem;
