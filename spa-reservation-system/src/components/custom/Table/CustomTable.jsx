import React, { useState, useEffect } from 'react';
import _ from "lodash";
import { Table } from "react-bootstrap";

import GoBackButton from '../common/GoBackButton';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableButton from './TableButton';
import TablePagination from './TablePagination';

const CustomTable = ({ headerData, bodyData, buttonGroup = {}, filterGroup = [], pageSize = 5 }) => {
    const [completeBodyData, setCompleteBodyData] = useState(bodyData);
    const [sortColumn, setSortColumn] = useState({ path: "id", order: "asc" });
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredBodyData, setFilteredBodyData] = useState(completeBodyData);
    const [selectedRowID, setSelectedRowID] = useState("");

    const sorted = _.orderBy(filteredBodyData, [sortColumn.path], [sortColumn.order]);
    const itemsDisplayed = _(sorted)
        .slice((currentPage - 1) * pageSize)
        .take(pageSize)
        .value();

    const totalCount = filteredBodyData.length
    if (currentPage > Math.ceil(totalCount / pageSize)) setCurrentPage(currentPage - 1)

    useEffect(() => {
        setCompleteBodyData(bodyData)
        setFilteredBodyData(bodyData)
    }, [bodyData]);

    return (
        <>
            {buttonGroup.hasOwnProperty('upper_left') && <>
                {buttonGroup.upper_left.map((button) => <TableButton buttonInfo={button} styleInfo='m-2' selectedRowID={selectedRowID} key={button.id} />)}
            </>}

            {totalCount === 0 ? <h3>There is currently no data.</h3> :
                <Table bordered hover>
                    <TableHeader headerData={headerData} sortColumn={sortColumn} setSortColumn={setSortColumn} />
                    <TableBody completeBodyData={completeBodyData} setCompleteBodyData={setCompleteBodyData} itemsDisplayed={itemsDisplayed} headerData={headerData} selectedRowID={selectedRowID} setSelectedRowID={setSelectedRowID} />
                </Table>
            }

            <TablePagination
                numItems={totalCount}
                maxNumItemDisplayed={pageSize}
                activePage={currentPage}
                setPage={setCurrentPage}
            />

            {buttonGroup.hasOwnProperty('lower_left') && <GoBackButton />}
            {buttonGroup.hasOwnProperty('lower_right') && <>
                {buttonGroup.lower_right.map((button) => <TableButton buttonInfo={button} styleInfo='m-2 pull-right' selectedRowID={selectedRowID} key={button.id} />)}
            </>}

        </>
    );
};

export default CustomTable;