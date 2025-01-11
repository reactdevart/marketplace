import '@/modules/auth/components/features/ResetPassword/ResetPassword.scss';

import { useCallback } from 'react';

import EmailInput from '@/components/widgets/EmailInput';
import Form from '@/components/widgets/Form';
import PasswordInput from '@/components/widgets/PasswordInput';
import useFormValidator from '@/hooks/useFormValidator';
import { RESET_PASSWORD_FORM } from '@/modules/auth/AuthLayout/constants';
import AuthTitleSubtitle from '@/modules/auth/components/shared/AuthTitleSubtitle';

const ResetPassword = () => {
  const { formState, errors, handleChange, validateForm } = useFormValidator(RESET_PASSWORD_FORM);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (validateForm()) {
        try {
          console.log('Password reset successfully:', result);
        } catch (err) {
          console.error('Failed to reset password:', err);
        }
      } else {
        console.log('Form has errors.');
      }
    },
    [validateForm, formState.email.value, formState.password.value, resetPassword]
  );

  return (
    <div className="reset-password">
      <div className="reset-password__auth-title-subtitle-wrapper">
        <AuthTitleSubtitle
          title="Reset Password"
          subtitle="Your new password must be different from previously used passwords."
        />
      </div>
      <div className="reset-password__form-wrapper">
        <Form onSubmit={handleSubmit} submitLabel="Reset Password">
          <div className="reset-password__email-input-wrapper">
            <EmailInput name="email" error={errors.email} value={formState.email.value} onChange={handleChange} />
          </div>
          <div className="reset-password__password-input-wrapper">
            <PasswordInput
              name="password"
              error={errors.password}
              value={formState.password.value}
              onChange={handleChange}
            />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
