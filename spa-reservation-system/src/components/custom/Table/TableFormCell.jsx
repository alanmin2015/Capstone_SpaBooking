import React, { useState } from "react";
import { Form } from "react-bootstrap";
import FormUnitFrame from "../Form/FormUnitFrame";
import Select from 'react-select'

import { setErrorAndData, handleSubmit } from '../utils/formUtils'
import MultiValueRemove from "../common/MultiValueRemove";

function TableFormCell({
  formInfo,
  formSchema,
  initializedData = [],
  doSubmit
}) {

  const [data, setData] = useState(initializedData);
  const [errors, setErrors] = useState({});

  const formStateAndSchema = {
    'data': data,
    "setData": setData,
    "errors": errors,
    "setErrors": setErrors,
    "formSchema": formSchema
  }

  return (
    <Form onBlur={(event) => handleSubmit(event, doSubmit, formStateAndSchema)} onSubmit={event => event.preventDefault()}>
      {(formInfo.type === "text" || formInfo.type === "date") && (
        <>
          <Form.Control
            onChange={({ currentTarget: formUnit }) => setErrorAndData(formUnit.name, formUnit.value, formStateAndSchema)}
            name={formInfo.id}
            value={data[formInfo.id]}
            type={formInfo.type}
            disabled={formInfo.disabled || false}
          />
          {errors[formInfo.id] && (
            <div size="sm" className="alert alert-primary">
              {errors[formInfo.id]}
            </div>
          )}
        </>
      )}
      {formInfo.type === "multiselect" && (
        <FormUnitFrame>
          <Select
            options={formInfo.options}
            defaultValue={data[formInfo.id]}
            isMulti={formInfo.isMulti}
            isClearable={false}
            name={formInfo.id}
            onChange={(selectedList, formUnit) => setErrorAndData(formUnit.name, selectedList, formStateAndSchema)}
            components={{ MultiValueRemove }}
          />
          {errors[formInfo.id] && (
            <div size="sm" className="alert alert-primary">
              {errors[formInfo.id]}
            </div>
          )}
        </FormUnitFrame>
      )}
    </Form>
  );
}

export default TableFormCell;
