import { useEffect } from 'react';
import Input from '@/components/shared/Input';
import Dropdown from '@/components/shared/Dropdown';
import './CategoryFormRenderer.scss';
import useFormValidator from '@/hooks/useFormValidator';

const CategoryFormRenderer = ({ form }) => {
  // Extract fields and validations from the form data
  const fields = form?.fields || [];

  console.log({
    fields,
    form,
  });

  // Initialize form state and validation using your custom hook
  const initialState = fields.reduce((acc, field) => {
    acc[field.fieldName] = {
      value: '',
      ...field.validation,
      options: field.options || null,
    };
    return acc;
  }, {});

  const { formState, errors, handleChange, validateForm } = useFormValidator(initialState);

  // Handler for form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form Submitted:', formState);
    } else {
      console.log('Validation Errors:', errors);
    }
  };

  // Render the form fields dynamically based on the type
  const renderField = (field) => {
    const { fieldName, type, options } = field;
    const value = formState[fieldName]?.value || '';

    switch (type) {
      case 'text':
      case 'textarea':
      case 'number':
        return (
          <Input
            key={fieldName}
            label={fieldName}
            value={value}
            error={errors[fieldName]}
            required={field.required}
            name={fieldName}
            type={type === 'number' ? 'number' : 'text'}
            onChange={handleChange}
            placeholder={`Enter ${fieldName}`}
            animatedPlaceholder={true}
          />
        );

      case 'radio':
        console.log(options);
        return (
          <Dropdown
            key={fieldName}
            options={options}
            onSelect={(option) => handleChange({ target: { name: fieldName, value: option.value } })}
            sllectedOption={options?.[0]}
            isOutsideClickEnabled
          />
        );

      case 'select':
        // Skipping dynamic options for now
        return (
          <Dropdown
            key={fieldName}
            options={options}
            onSelect={(option) => handleChange({ target: { name: fieldName, value: option.value } })}
            sllectedOption={options?.[0]}
            isOutsideClickEnabled
          />
        );

      case 'file':
        return (
          <Input
            key={fieldName}
            label={fieldName}
            type="file"
            name={fieldName}
            onChange={handleChange}
            required={field.required}
            error={errors[fieldName]}
          />
        );

      default:
        return null;
    }
  };

  return (
    <form className="category-form-renderer" onSubmit={handleFormSubmit}>
      {fields.map((field) => renderField(field))}
      <button type="submit" className="category-form-renderer__submit">
        Submit
      </button>
    </form>
  );
};

export default CategoryFormRenderer;
