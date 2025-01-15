import '@/components/shared/RadioGroup/RadioGroup.scss';

import { useEffect } from 'react';

const RadioGroup = ({
  options = [],
  name,
  selectedValue,
  label = '',
  required = false,
  withStar = false,
  onChange,
  width = 20,
  height = 20,
  value,
}) => {
  useEffect(() => {
    if (!value && selectedValue) {
      onChange(selectedValue);
    }
  }, [value, selectedValue, onChange]);
  return (
    <div className="radio-group">
      {label && (
        <div className="radio-group__label">
          {label} {required && withStar && <span className="radio-group__label-required">*</span>}
        </div>
      )}
      <div className="radio-group__inner">
        {options.map((option) => (
          <label key={option.id} className={`radio ${selectedValue === option.label ? 'radio--selected' : ''}`}>
            <input
              className="radio__input"
              type="radio"
              name={name}
              value={option.label}
              checked={selectedValue === option.label}
              onChange={() => onChange(option)}
            />
            <span
              style={{
                width: option.width || width,
                height: option.height || height,
                ...(option.style || {}),
              }}
              className="radio__circle"
            >
              {selectedValue === option.label && <span className="radio__circle-inner" />}
            </span>
            {option.name && <span className="radio__label">{option.name}</span>}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
