import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Select from 'react-select'

import { setErrorAndData, handleSubmit } from '../utils/formUtils'
import FormUnitFrame from "./FormUnitFrame";
import GoBackButton from '../common/GoBackButton';
import MultiValueRemove from "../common/MultiValueRemove";

function CustomForm({
  formInfo,
  formStructure,
  formSchema,
  initializedData = {},
  doSubmit,
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
    <Form>
      {formInfo.map((singleFormInfo) => (
        <Form.Group
          className="mb-3"
          controlId={singleFormInfo.id}
          key={singleFormInfo.id}
        >
          {singleFormInfo.type === "multiselect" && (
            <FormUnitFrame
              errors={errors[singleFormInfo.id]}
              label={singleFormInfo.label}
              formText={singleFormInfo.formText} >
              <Select
                options={singleFormInfo.options}
                defaultValue={data[singleFormInfo.id]}
                isMulti={singleFormInfo.isMulti}
                isClearable={false}
                name={singleFormInfo.id}
                onChange={(selectedList, formUnit) => setErrorAndData(formUnit.name, selectedList, formStateAndSchema)}
                components={{ MultiValueRemove }}
              />
            </FormUnitFrame>
          )}
          {(singleFormInfo.type === "text" || singleFormInfo.type === "password" || singleFormInfo.type === 'email' || singleFormInfo.type === 'date') && (
            <FormUnitFrame
              errors={errors[singleFormInfo.id]}
              label={singleFormInfo.label}
              formText={singleFormInfo.formText} >
              <Form.Control
                onChange={({ currentTarget: formUnit }) => setErrorAndData(formUnit.name, formUnit.value, formStateAndSchema)}
                name={singleFormInfo.id}
                value={data[singleFormInfo.id]}
                type={singleFormInfo.type}
                disabled={singleFormInfo.disabled || false}
              />
            </FormUnitFrame>
          )}
          {singleFormInfo.type === "textarea" && (
            <FormUnitFrame
              errors={errors[singleFormInfo.id]}
              label={singleFormInfo.label}
              formText={singleFormInfo.formText} >
              <Form.Control
                onChange={({ currentTarget: formUnit }) => setErrorAndData(formUnit.name, formUnit.value, formStateAndSchema)}
                name={singleFormInfo.id}
                value={data[singleFormInfo.id]}
                disabled={singleFormInfo.disabled || false}
                as={singleFormInfo.type}
                rows={5}
              />
            </FormUnitFrame>
          )}
          {singleFormInfo.type === "checkbox" && (
            <FormUnitFrame
              errors={errors[singleFormInfo.id]}
              label={singleFormInfo.label}
              formText={singleFormInfo.formText} >
              <Form.Check
                type="checkbox"
                label={singleFormInfo.label}
                onChange={({ currentTarget: formUnit }) => setErrorAndData(formUnit.name, formUnit.checked, formStateAndSchema)}
                name={singleFormInfo.id}
                defaultChecked={data[singleFormInfo.id]}
              />
            </FormUnitFrame>
          )}

        </Form.Group>
      ))}

      {formStructure.back_button && <GoBackButton />}

      {formStructure.submit_button &&
        <Button className="mt-3 mb-3 pull-right" variant="outline-primary" onClick={(event) => handleSubmit(event, doSubmit, formStateAndSchema)} >
          {formStructure.submit_button || 'Submit'}
        </Button>}
    </Form>
  );
}

export default CustomForm;