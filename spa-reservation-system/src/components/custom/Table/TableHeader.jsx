import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

const TableHeader = ({ headerData, sortColumn, setSortColumn }) => {
    const handleSort = (path) => {
        if (sortColumn.path === path) {
            const sortOrder = sortColumn.order === "asc" ? "desc" : "asc";
            setSortColumn({ path, order: sortOrder });
        } else setSortColumn({ path, order: "asc" });
    };
    {/********************************************* render header ******************************************************/ }
    const renderSortIcon = (column) => {
        if (column.path) {
            if (sortColumn.path !== column.path) return null;
            if (sortColumn.order === "asc")
                return <FontAwesomeIcon icon={faSortUp} />;
            return <FontAwesomeIcon icon={faSortDown} />;
        }
    };
    return (
        <thead>
            <tr>
                {headerData.map((column) => (
                    <th
                        style={{ cursor: "pointer" }}
                        className="clickable"
                        key={column.path}
                        onClick={() => handleSort(column.path)}
                    >
                        {renderSortIcon(column)} {column.label}{" "}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHeader;