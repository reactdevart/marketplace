import '@/components/entities/categories/CategoryFormRenderer/CategoryFormRenderer.scss';

import Dropdown from '@/components/shared/Dropdown';
import Input from '@/components/shared/Input';
import useFormValidator from '@/hooks/useFormValidator';

const CategoryFormRenderer = ({ form }) => {
  const { name = '', ...rendereredFileds } = form;

  const collectionOfFileds = Object.values(rendereredFileds)
    .map((item) => item.fields)
    .flat();

  console.log(name);

  const initialState = collectionOfFileds.reduce((acc, field) => {
    acc[field.fieldName] = {
      value: '',
      ...field.validation,
      options: field.options || null,
    };
    return acc;
  }, {});

  const { formState, errors, handleChange, validateForm } = useFormValidator(initialState);

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

  const renderSection = Object.values(rendereredFileds).map(({ label, fields }, index) => (
    <div key={index}>
      <div>{label}</div>
      {fields.map((field) => renderField(field))}
    </div>
  ));
  // Handler for form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form Submitted:', formState);
    } else {
      console.log('Validation Errors:', errors);
    }
  };

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
