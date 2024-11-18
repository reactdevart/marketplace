import '@/components/entities/categories/CategoryFormRenderer/CategoryFormRenderer.scss';

import { useCallback, useMemo } from 'react';

import useFormValidator from '@/hooks/useFormValidator';
import useRenderField from '@/hooks/useRenderField';
import { extractFields, getInitialState } from '@/utils/formUtils';

const CategoryFormRenderer = ({ form }) => {
  const { name = '', ...renderedFields } = form;

  console.log(name);

  const collectionOfFields = useMemo(() => extractFields(renderedFields), [renderedFields]);

  const initialState = useMemo(() => getInitialState(collectionOfFields), [collectionOfFields]);

  const { formState, errors, handleChange, validateForm } = useFormValidator(initialState);
  const renderField = useRenderField({ formState, errors, handleChange });

  const renderSection = useMemo(
    () =>
      Object.values(renderedFields).map(({ label, fields }, index) => (
        <div key={index}>
          <div>{label}</div>
          {fields.map((field) => renderField(field))}
        </div>
      )),
    [renderedFields, renderField]
  );

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (validateForm()) {
        console.log('Form Submitted:', formState);
      } else {
        console.log('Validation Errors:', errors);
      }
    },
    [formState, errors, validateForm]
  );

  return (
    <form className="category-form-renderer" onSubmit={handleFormSubmit}>
      {renderSection}
      <button type="submit" className="category-form-renderer__submit">
        Submit
      </button>
    </form>
  );
};

export default CategoryFormRenderer;
