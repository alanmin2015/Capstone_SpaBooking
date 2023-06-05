import React from 'react';
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

function GoBackButton() {
    const history = useHistory();
    return (
        <Button variant="outline-primary" className='mt-3 mb-3' onClick={() => history.goBack()}>Go Back</Button>
    );
}

export default GoBackButton;