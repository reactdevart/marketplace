import '@/modules/auth/components/features/Register/Register.scss';

import classNames from 'classnames';
import { useState } from 'react';

import view from '@/modules/auth/components/features/Register/Views/view';
import AuthTitleSubtitle from '@/modules/auth/components/shared/AuthTitleSubtitle';

const REGISTER_TYPES = ['Individual', 'Company'];

const Register = () => {
  const [registerType, setRegisterType] = useState(REGISTER_TYPES[0]);

  const changeRegisterType = (type) => {
    if (registerType === type) return;
    setRegisterType(type);
  };

  const View = view[registerType];

  return (
    <div className="register">
      <div className="register__auth-title-subtitle-wrapper">
        <AuthTitleSubtitle title="Create an Account" subtitle="Enter your credentials to access your account" />
      </div>
      <div className="register__tabs">
        {REGISTER_TYPES.map((type) => (
          <div
            key={type}
            onClick={() => changeRegisterType(type)}
            className={classNames('register__tab-item', { 'register__tab-item--active': type === registerType })}
          >
            <span className="register__tab-item-text">{type}</span>
            <span className="register__tab-item-line" />
          </div>
        ))}
      </div>
      <div className="register__view-wrapper">
        <div className="register__view-wrapper-inner">
          <View />
        </div>
      </div>
    </div>
  );
};

export default Register;
