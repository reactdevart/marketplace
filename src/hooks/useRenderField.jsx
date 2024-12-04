import { useCallback } from 'react';

import FileUploader from '@/components/shared/FileUploader';
import Input from '@/components/shared/Input';
import RadioGroup from '@/components/shared/RadioGroup';
import CreatePostFileUploader from '@/components/widgets/CreatePostFileUploader';
import DropdownSubCategory from '@/components/widgets/DropdownSubCategory';
import Location from '@/components/widgets/Location';
import SubCategoryOptionsRadio from '@/components/widgets/SubCategoryOptionsRadio';

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
          if (!options) return null;
          if (options === 'dynamic') {
            if (!trigger) return null;
            switch (trigger) {
              case 'GET_FROM_SUBCATEGORY_OPTIONS':
                return (
                  <SubCategoryOptionsRadio
                    withStar={field?.validation?.required}
                    required={field?.validation?.required}
                    label={label}
                    name={fieldName}
                    value={value}
                    onChange={(value) => handleChange({ target: { name: fieldName, value } })}
                  />
                );

              default:
                return null;
            }
          }
          return null;
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
            <CreatePostFileUploader
              maxCount={formState[fieldName]?.maxCount}
              files={formState[fieldName]?.value}
              acceptedFormats={formState[fieldName]?.acceptedFormats}
              removeFile={(index) =>
                handleChange({
                  target: {
                    name: fieldName,
                    value: [
                      ...formState[fieldName]?.value.slice(0, index),
                      ...formState[fieldName]?.value.slice(index + 1),
                    ],
                  },
                })
              }
              handleFile={(file) =>
                handleChange({ target: { name: fieldName, value: [...formState[fieldName]?.value, ...file] } })
              }
            />
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
