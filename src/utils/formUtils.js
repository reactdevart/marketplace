export const extractFields = (renderedFields) =>
  Object.values(renderedFields)
    .map((item) => item.fields)
    .flat();

export const getInitialState = (collectionOfFields) =>
  collectionOfFields.reduce((acc, field) => {
    acc[field.fieldName] = {
      value: '',
      ...field.validation,
      options: field.options || null,
    };
    return acc;
  }, {});
