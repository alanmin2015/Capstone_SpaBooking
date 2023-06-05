import React, { useState } from 'react';
import _ from "lodash";

import TableFormCell from './TableFormCell';

const TableBody = ({ completeBodyData, setCompleteBodyData, itemsDisplayed, headerData, selectedRowID, setSelectedRowID }) => {
    {/********************************************* handle unit cell change *********************************************/ }
    const [selectedInputIndex, setSelectedInputIndex] = useState({ "selectedRowID": 0, "selectedColumnPath": '' });
    const handleDoubleClick = (rowID, columnPath) => {
        setSelectedInputIndex({
            'selectedRowID': rowID,
            "selectedColumnPath": columnPath
        })
    };
    const handleInputChange = (value) => {
        const { selectedColumnPath: columnPath, selectedRowID: rowID } =
          selectedInputIndex;

        const complet_body_data = Array.from(completeBodyData);

        const rowIndex = complet_body_data.findIndex(
          (element) => element.id == rowID
        );

        complet_body_data[rowIndex] = {
          ...complet_body_data[rowIndex],

          [columnPath]: value,
        };

        setCompleteBodyData(complet_body_data);

        setSelectedInputIndex({ selectedRowID: 0, selectedColumnPath: "" });
    };
    const handleSubmit = (data, rowID, doSumbitInOuterCmpnnt) => {
        // console.log('CustomTable - submitInTableLevel - data', data)
        // console.log('CustomTable - submitInTableLevel - Object.values(data)[0]', Object.values(data)[0])

        handleInputChange(Object.values(data)[0]);
        data['id'] = rowID
        doSumbitInOuterCmpnnt(data)
    };
    {/************************************************ render body ******************************************************/ }
    const renderCell = (row, column) => {
        const customContent = column.customContent
        const contentString = _.get(row, column.path)
        if (customContent) {
            if (customContent.type === 'inputbox') {
                const cellKey = `${row.id}-${column.path}`
                return <td key={cellKey} onDoubleClick={() => handleDoubleClick(row.id, column.path)}>
                    {selectedInputIndex.selectedRowID + '-' + selectedInputIndex.selectedColumnPath === cellKey ?
                        <TableFormCell
                            formInfo={customContent.formInfo}
                            initializedData={{ [column.path]: contentString }}
                            doSubmit={(data) => handleSubmit(data, row.id, customContent.doSubmit)}
                            formSchema={customContent.schema} /> :
                        <>{customContent.formInfo.type == 'multiselect' ? contentString.label : contentString}</>
                    }
                </td>
            }
        }
        if (!customContent)
            return <td key={`${row.id}-${column.path}`}>
                {contentString}
            </td>;
    };

    return (
        <tbody>
            {itemsDisplayed.map((row) => (
                <tr
                    key={row.id}
                    onClick={() => setSelectedRowID(row.id)}
                    style={
                        selectedRowID === row.id
                            ? { background: "#f4f4f4" }
                            : { background: "white" }
                    }
                >
                    {headerData.map((column) => (
                        <React.Fragment key={`${column.path}-${row.id}`}>
                            {renderCell(row, column)}
                        </React.Fragment>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

export default TableBody;