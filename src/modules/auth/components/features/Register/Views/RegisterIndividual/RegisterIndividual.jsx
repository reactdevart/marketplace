import '@/modules/auth/components/features/Register/Views/RegisterIndividual/RegisterIndividual.scss';

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Checkbox from '@/components/shared/Checkbox';
import Input from '@/components/shared/Input';
import ButtonFacebook from '@/components/widgets/ButtonFacebook';
import ButtonGoogle from '@/components/widgets/ButtonGoogle';
import EmailInput from '@/components/widgets/EmailInput';
import Form from '@/components/widgets/Form';
import PasswordInput from '@/components/widgets/PasswordInput';
import useFormValidator from '@/hooks/useFormValidator';
import { REGISTER_INDIVIDUAL_FORM } from '@/modules/auth/AuthLayout/constants';
import AuthLink from '@/modules/auth/components/shared/AuthLink';
import AuthOr from '@/modules/auth/components/shared/AuthOr';
import { useLoginMutation, useRegisterUserMutation } from '@/store/auth/authApiSlice';
import { setCredentials } from '@/store/auth/authSlice';
import { addToast } from '@/store/toaster/toasterSlice';

const RegisterIndividual = () => {
  const { formState, errors, handleChange, validateForm } = useFormValidator(REGISTER_INDIVIDUAL_FORM);
  const dispatch = useDispatch();
  const [registerUser, { isLoading: isRegisterUserLoading }] = useRegisterUserMutation();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (validateForm()) {
        try {
          const result = await registerUser({
            first_name: formState.first_name.value,
            last_name: formState.last_name.value,
            email: formState.email.value,
            password: formState.password.value,
            password_confirmation: formState.password_confirmation.value,
          }).unwrap();
          if (result?.data?.email) {
            const loginResult = await login({
              username: formState.email.value,
              password: formState.password.value,
            }).unwrap();
            if (loginResult?.access_token && loginResult?.refresh_token) {
              dispatch(setCredentials({ ...loginResult, email: formState.email.value }));
              dispatch(addToast({ message: 'You have successfully registered', type: 'success' }));
            }
          }
        } catch (err) {
          dispatch(addToast({ message: err.data.message, type: 'error' }));
        }
      } else {
        dispatch(addToast({ message: 'Form has errors.', type: 'error' }));
      }
    },
    [validateForm, dispatch, formState, login, registerUser]
  );

  return (
    <div className="register-individual">
      <div className="register-individual__form-wrapper">
        <Form onSubmit={handleSubmit} pending={isRegisterUserLoading || isLoginLoading} submitLabel="Create Account">
          <div className="register-individual__inputs-wrapper">
            <div className="register-individual__input-wrapper">
              <Input
                type="text"
                placeholder="First Name"
                name="first_name"
                error={errors.first_name}
                value={formState.first_name.value}
                onChange={handleChange}
              />
            </div>
            <div className="register-individual__input-wrapper">
              <Input
                type="text"
                name="last_name"
                placeholder="Last Name"
                error={errors.last_name}
                value={formState.last_name.value}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="register-individual__input-wrapper">
            <EmailInput name="email" error={errors.email} value={formState.email.value} onChange={handleChange} />
          </div>
          <div className="register-individual__input-wrapper">
            <PasswordInput
              name="password"
              error={errors.password}
              value={formState.password.value}
              onChange={handleChange}
            />
          </div>
          <div className="register-individual__input-wrapper">
            <PasswordInput
              name="password_confirmation"
              error={errors.password_confirmation}
              value={formState.password_confirmation.value}
              onChange={handleChange}
              placeholder="Confirm Password"
            />
          </div>
          <div className="register-individual__checkbox-auth-link-wrapper">
            <div className="register-individual__checkbox-wrapper">
              <Checkbox
                width={20}
                height={20}
                label="I agree to the"
                name="accept_terms"
                checked={formState.accept_terms.value}
                onChange={handleChange}
                error={errors.accept_terms}
              />
            </div>
            <div className="register-individual__auth-link-wrapper">
              <AuthLink link="/terms-and-conditions" linkText="Terms & Conditions" />
            </div>
          </div>
        </Form>
        <div className="register-individual__auth-link-wrapper--login">
          <AuthLink label="Already have an account?" link="/auth/login" linkText="Login" />
        </div>
        <div className="register-individual__auth-or-wrapper">
          <AuthOr />
        </div>
        <div className="register-individual__social-buttons-wrapper">
          <div className="register-individual__social-button-wrapper">
            <ButtonGoogle />
          </div>
          <div className="register-individual__social-button-wrapper">
            <ButtonFacebook />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterIndividual;
