import Joi from "joi-browser";

const validate = (data, formSchema) => {
  const { error } = Joi.validate(data, formSchema, { abortEarly: false });

  if (!error) return null;

  let newErrors = {};
  for (const singleError of error.details)
    newErrors[singleError.path[0]] = singleError.message;
  return newErrors;
};

const validateProperty = (name, value, formSchema) => {
  const { error } = Joi.validate(
    { [name]: value },
    { [name]: formSchema[name] }
  );
  return error ? error.details[0].message : null;
};

export const handleSubmit = (
  event,
  doSubmit,
  { data, setData, errors, setErrors, formSchema }
) => {
  event.preventDefault();
  // console.log("formUtils - handleSubmit - data", data);

  const newErrors = validate(data, formSchema);
  setErrors(newErrors || {});
  // console.log("formUtils - handleSubmit - newErrors", newErrors);

  if (newErrors) return;
  doSubmit(data, errors, setData, setErrors);
};

export const setErrorAndData = (
  targetName,
  targetValue,
  { data, setData, errors, setErrors, formSchema }
) => {
  const previousErrors = { ...errors };
  const errorMessage = validateProperty(targetName, targetValue, formSchema);
  if (errorMessage) previousErrors[targetName] = errorMessage;
  else delete previousErrors[targetName];
  setErrors(previousErrors);

  const previousData = { ...data };
  previousData[targetName] = targetValue;
  setData(previousData);
};
