import validator from 'validator';
import { ValidationResult, SchemaErrorCheckResult } from '@interfaces/validation';
import { ValidationError } from '@helpers/errors';

declare const debug;

const transformModifierToSchema = (fields, body) => {
  const checkedFields = [];
  const schemaFields = [];
  const trasformedData = fields.reduce((acc, { field, ...rest }) => {
    acc[field] = rest;
    if (!(field in validationModifier)) schemaFields.push(field);
    if (field in body) checkedFields.push(field);

    return acc;
  }, {});

  return { transformed: trasformedData, schemaFields, checkedFields };
};

const validationModifier = {
  $oneOf: (fields, body) => {
    const errors = [];

    const { schemaFields, checkedFields, transformed } = transformModifierToSchema(fields, body);

    const { isValid, ...mainErrors} = schemaErrorCheck(transformed, body);

    if (checkedFields.length > 1) errors.push(`Only one of ${schemaFields} fields is required`);
    if (checkedFields.length < 1) errors.push(`At least one of ${schemaFields} fields is required`);

    return { ...mainErrors, ...(errors.length && {$oneOf: errors}) }
  },
  $allOf: (fields, body) => {
    const errors = [];
    const { schemaFields, checkedFields, transformed } = transformModifierToSchema(fields, body);

    const { isValid, ...mainErrors} = schemaErrorCheck(transformed, body);

    if (checkedFields.length < fields.length) errors.push(`All of ${schemaFields} fields is required`);

    return { ...mainErrors, ...(errors.length && {$allOf: errors}) }
  }
};

const runFieldValidationModifier = (modifier, fields, body) =>{
  return  validationModifier[modifier](fields, body);
};

const runFieldValidations = (field, validations) => {
  return validations && validations.reduce((acc, val) => {
    if (!val.check) return [];
    const validity = val.check(field, ...((val.args && val.args) || []));

    if ((!validity && !('validWhen' in val)) || ('validWhen' in val && val.validWhen !== validity)) {
      acc = [...acc, val.message];
    }
    return acc;
  }, []);
};

const schemaErrorCheck = (validationSchema: any, body): SchemaErrorCheckResult => Object.entries(validationSchema).reduce((acc, kv: any) => {
  const [field, values] = kv;
  if (!('isValid' in acc)) acc['isValid'] = true;
  if (field in validationModifier) {
    acc = { ...acc, ...runFieldValidationModifier(field, values, body) };
  } else {
    if (values.required && !(field in body)) acc[field] = [`${field} is required`];
  
    if (field in body) {
      const fieldValidity = runFieldValidations(body[field], values.validations)
      acc = { ...acc, ...(fieldValidity && fieldValidity.length && { [field]: fieldValidity}) }
    }
  }

  if (field in acc) acc['isValid'] = false;

  return acc;
}, {});

export default (schema: Function) => {
  const validationSchema: Function = schema(validator);
  return async (req, res, next?: (err?: Error) => void): Promise<ValidationResult> => {
    const { body } = req;
    debug(body);
  
    const { isValid, ...errors} = schemaErrorCheck(validationSchema, body);

    if (!isValid && next) next(ValidationError(errors));
    else if(next) await next();
  
    return { valid: isValid, errors };
  };
};
