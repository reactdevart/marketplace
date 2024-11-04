import '@/modules/auth/components/features/ForgotPassword/ForgotPassword.scss';

import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useForgotPasswordMutation } from '@/api/auth/forgotPasswordApi';
import EmailInput from '@/components/widgets/EmailInput';
import Form from '@/components/widgets/Form';
import useFormValidator from '@/hooks/useFormValidator';
import { FORGOT_PASSWORD_FORM } from '@/modules/auth/AuthLayout/constants';
import AuthLink from '@/modules/auth/components/shared/AuthLink';
import AuthTitleSubtitle from '@/modules/auth/components/shared/AuthTitleSubtitle';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const { formState, errors, handleChange, validateForm } = useFormValidator(FORGOT_PASSWORD_FORM);
  const [forgotPassword] = useForgotPasswordMutation();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (validateForm()) {
        try {
          const result = await forgotPassword({
            email: formState.email.value,
          })
            .unwrap()
            .then(() => setStep(2));
          console.log('Forgot password instructions sent:', result);
        } catch (err) {
          console.error('Failed to send forgot password instructions:', err);
        }
      } else {
        console.log('Form has errors.');
      }
    },
    [validateForm, formState.email.value, forgotPassword]
  );

  const goBack = () => {
    navigate('/auth/login');
  };

  const goNext = useCallback(() => {
    setStep(1);
  }, [setStep]);

  return (
    <div className="forgot-password">
      {step === 1 && (
        <>
          <div onClick={goBack} className="forgot-password__back-wrapper">
            <i className="icon-left-angel forgot-password__back-icon" />
            <span className="forgot-password__back-text">Back</span>
          </div>
          <div className="forgot-password__auth-title-subtitle-wrapper">
            <AuthTitleSubtitle
              title="Forgot Password?"
              subtitle="Don’t worry, it happens sometimes. Enter your e-mail address and we will send you instructions."
            />
          </div>
          <div className="forgot-password__form-wrapper">
            <Form onSubmit={handleSubmit} submitLabel="Send Instructions">
              <div className="forgot-password__email-input-wrapper">
                <EmailInput name="email" error={errors.email} value={formState.email.value} onChange={handleChange} />
              </div>
            </Form>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <div className="forgot-password__auth-title-subtitle-wrapper">
            <AuthTitleSubtitle
              title="Check Your E-mail"
              subtitle="We have sent password recovery instructions to your e-mail address."
            />
          </div>
          <div className="forgot-password__form-wrapper-step-2">
            <Form submitLabel="Send Instructions Again" />
          </div>
          <div className="forgot-password__auth-link-wrapper">
            <AuthLink label="Didn’t get a link?" callback={goNext} callbackText="Resend" />
          </div>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
