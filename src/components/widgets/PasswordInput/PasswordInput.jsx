import '@/components/widgets/PasswordInput/PasswordInput.scss';

import classNames from 'classnames';
import { useState } from 'react';

import Input from '@/components/shared/Input';

const PasswordInput = ({ placeholder = 'Password', name = 'password', ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="password-input">
      <div className="password-input__input-wrapper">
        <Input type={showPassword ? 'text' : 'password'} placeholder={placeholder} name={name} {...props} />
        <i
          onClick={toggleShowPassword}
          className={classNames('password-input__icon', { 'icon-eye-closed': !showPassword, 'icon-eye': showPassword })}
        />
      </div>
    </div>
  );
};

export default PasswordInput;
