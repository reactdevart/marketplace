import { useCallback } from 'react';

import Dropdown from '@/components/shared/Dropdown';
import FileUploader from '@/components/shared/FileUploader';
import Input from '@/components/shared/Input';
import DropdownSubCategory from '@/components/widgets/DropdownSubCategory';
import Location from '@/components/widgets/Location';

const useRenderField = ({ formState, errors, handleChange }) => {
  return useCallback(
    (field) => {
      const { fieldName, type, options, label = '', constantSymbol = '', trigger = '' } = field;
      const value = formState[fieldName]?.value || '';
      switch (type) {
        case 'text':
        case 'textarea':
        case 'number':
          return (
            <Input
              withStar={field?.validation?.required}
              required={field?.validation?.required}
              style={{ height: 54 }}
              key={fieldName}
              constantSymbol={constantSymbol}
              label={label}
              value={value}
              error={errors[fieldName]}
              name={fieldName}
              type={type === 'number' ? 'number' : 'text'}
              onChange={handleChange}
              animatedPlaceholder
            />
          );

        case 'radio':
          return (
            <Dropdown
              withStar={field?.validation?.required}
              required={field?.validation?.required}
              height={54}
              label={label}
              key={fieldName}
              options={options}
              onSelect={(option) => handleChange({ target: { name: fieldName, value: option.label } })}
              selectedOption={options?.[0]}
              isOutsideClickEnabled
            />
          );
        case 'location':
          return (
            <Location
              withStar={field?.validation?.required}
              required={field?.validation?.required}
              height={54}
              label={label}
              key={fieldName}
              onSelect={(option) => handleChange({ target: { name: fieldName, value: option.label } })}
              isOutsideClickEnabled
            />
          );
        case 'file':
          return (
            // <Input
            //   key={fieldName}
            //   label={fieldName}
            //   type="file"
            //   name={fieldName}
            //   onChange={handleChange}
            //   required={required}
            //   error={errors[fieldName]}
            // />
            <FileUploader>hopar</FileUploader>
          );
        case 'select':
          if (!options) return null;
          if (options === 'dynamic') {
            if (!trigger) return null;
            switch (trigger) {
              case 'GET_FROM_SUBCATEGORY':
                return (
                  <DropdownSubCategory
                    withStar={field?.validation?.required}
                    required={field?.validation?.required}
                    height={54}
                    label={label}
                    key={fieldName}
                    onSelect={(option) => handleChange({ target: { name: fieldName, value: option.label } })}
                    isOutsideClickEnabled
                  />
                );

              default:
                return null;
            }
          }
          return null;

        default:
          return null;
      }
    },
    [formState, errors, handleChange]
  );
};

export default useRenderField;
