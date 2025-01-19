import '@/modules/auth/components/features/Login/Login.scss';

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import ButtonFacebook from '@/components/widgets/ButtonFacebook';
import ButtonGoogle from '@/components/widgets/ButtonGoogle';
import EmailInput from '@/components/widgets/EmailInput';
import Form from '@/components/widgets/Form';
import PasswordInput from '@/components/widgets/PasswordInput';
import useFormValidator from '@/hooks/useFormValidator';
import { LOGIN_FORM } from '@/modules/auth/AuthLayout/constants';
import AuthLink from '@/modules/auth/components/shared/AuthLink';
import AuthOr from '@/modules/auth/components/shared/AuthOr';
import AuthTitleSubtitle from '@/modules/auth/components/shared/AuthTitleSubtitle';
import { useLoginMutation } from '@/store/auth/authApiSlice';
import { setCredentials } from '@/store/auth/authSlice';
import { addToast } from '@/store/toaster/toasterSlice';

const Login = () => {
  const { formState, errors, handleChange, validateForm } = useFormValidator(LOGIN_FORM);
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (validateForm()) {
        try {
          const result = await login({
            username: formState.email.value,
            password: formState.password.value,
          }).unwrap();
          if (result?.access_token && result?.refresh_token) {
            dispatch(setCredentials({ ...result, email: formState.email.value }));
          }
        } catch (err) {
          dispatch(addToast({ message: err.data.message, type: 'error' }));
        }
      } else {
        dispatch(addToast({ message: 'Form has errors.', type: 'error' }));
      }
    },
    [validateForm, formState.email.value, formState.password.value, login, dispatch]
  );

  return (
    <div className="login">
      <div className="login__auth-title-subtitle-wrapper">
        <AuthTitleSubtitle title="Hello! Welcome Back" subtitle="Enter your credentials to access your account" />
      </div>
      <div className="login__form-wrapper">
        <Form pending={isLoading} onSubmit={handleSubmit} submitLabel="Login">
          <div className="login__email-input-wrapper">
            <EmailInput name="email" error={errors.email} value={formState.email.value} onChange={handleChange} />
          </div>
          <div className="login__password-input-wrapper">
            <PasswordInput
              name="password"
              error={errors.password}
              value={formState.password.value}
              onChange={handleChange}
            />
          </div>
          <div className="login__auth-link-wrapper--forgot">
            <AuthLink link="/auth/forgot-password" linkText="Forgot Password?" />
          </div>
        </Form>
      </div>
      <div className="login__auth-link-wrapper--register">
        <AuthLink label="Don't have an account?" link="/auth/register" linkText="Create" />
      </div>
      <div className="login__auth-or-wrapper">
        <AuthOr />
      </div>
      <div className="login__social-buttons-wrapper">
        <div className="login__social-button-wrapper">
          <ButtonGoogle />
        </div>
        <div className="login__social-button-wrapper">
          <ButtonFacebook />
        </div>
      </div>
    </div>
  );
};

export default Login;
