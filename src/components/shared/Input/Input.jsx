import '@/components/shared/Input/Input.scss';

import classNames from 'classnames';

const Input = ({ label, error, animatedPlaceholder = true, required = false, withStar = false, ...props }) => {
  return (
    <div className="input">
      {label && (
        <label htmlFor={props?.id || props?.name || ''} className="input__label">
          {label} {required && withStar && <span className="input__label-required">*</span>}
        </label>
      )}
      <input
        {...props}
        className={classNames('sign-field-text input__area', {
          'input__area--filled': !!props?.value?.trim().toString(),
          'input__area--error': !!error,
        })}
        id={props?.id || props?.name || ''}
        placeholder={label || !animatedPlaceholder ? props?.placeholder || '' : ''}
        autoComplete="new-password"
      />
      {animatedPlaceholder && props?.placeholder && !label && (
        <span className="sign-field-text input__placeholder">{props?.placeholder}</span>
      )}
      {error && <span className="input__error-text">{error}</span>}
    </div>
  );
};

export default Input;
