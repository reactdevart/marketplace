import '@/components/shared/Button/Button.scss';

import classNames from 'classnames';

import Spinner from '@/components/shared/Spinner';

const Button = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={classNames('button', {
        [`button--${props.variant}`]: !!props?.variant,
        [props?.className]: !!props?.className,
      })}
      type="button"
      disabled={props?.pending}
    >
      {children}
      {props?.pending && (
        <div className="button__spinner-wrapper">
          <Spinner size={20} />
        </div>
      )}
    </button>
  );
};

export default Button;
