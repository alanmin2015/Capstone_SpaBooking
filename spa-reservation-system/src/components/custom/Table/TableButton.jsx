import React from 'react';
import { Button } from "react-bootstrap";

const TableButton = ({ buttonInfo, styleInfo, selectedRowID }) => {
    // console.log('TableButton - - buttonInfo.id', buttonInfo.id)
    return (
        <React.Fragment key={`${buttonInfo.id}`}>
            <Button
                className={styleInfo}
                variant={buttonInfo.type}
                onClick={() => buttonInfo.handleClick(selectedRowID)}
                key={`button-${buttonInfo.id}`}
            >
                {buttonInfo.buttonText}
            </Button>
        </React.Fragment>
    )
};

export default TableButton;