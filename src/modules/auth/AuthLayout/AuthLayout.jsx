import '@/modules/auth/AuthLayout/AuthLayout.scss';

import { Navigate, Route, Routes } from 'react-router-dom';

import Logo from '@/components/shared/Logo';
import ForgotPassword from '@/modules/auth/components/features/ForgotPassword';
import Login from '@/modules/auth/components/features/Login';
import Register from '@/modules/auth/components/features/Register';
import ResetPassword from '@/modules/auth/components/features/ResetPassword';

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <div className="auth-layout__inner">
        <div className="auth-layout__left">
          <div className="auth-layout__logo-wrapper">
            <Logo />
          </div>
          <div className="auth-layout__routes">
            <Routes>
              <Route path="/" element={<Navigate to="login" />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />
            </Routes>
          </div>
        </div>
        <div className="auth-layout__right">
          <div className="auth-layout__right-inner" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
