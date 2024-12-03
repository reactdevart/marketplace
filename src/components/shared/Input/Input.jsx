import '@/components/shared/Input/Input.scss';

import classNames from 'classnames';

const CONSTANT_SYMBOL_LINE_HEIGHT = 18;

const Input = ({
  label,
  error,
  animatedPlaceholder = true,
  required = false,
  withStar = false,
  constantSymbol = '',
  ...props
}) => {
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
        placeholder={constantSymbol ? '' : label || !animatedPlaceholder ? props?.placeholder || '' : ''}
        autoComplete="new-password"
      />
      {animatedPlaceholder && props?.placeholder && !label && (
        <span className="sign-field-text input__placeholder">{props?.placeholder}</span>
      )}
      {error && <span className="input__error-text">{error}</span>}
      {constantSymbol && (
        <span
          style={{
            lineHeight: `${CONSTANT_SYMBOL_LINE_HEIGHT + 3}px`,
            bottom: `calc(50% - ${parseInt(props?.style?.height, 10) / 2 + CONSTANT_SYMBOL_LINE_HEIGHT / 2 || 0}px)`,
          }}
          className="input__constant-symbol"
        >
          {constantSymbol}
        </span>
      )}
    </div>
  );
};

export default Input;
