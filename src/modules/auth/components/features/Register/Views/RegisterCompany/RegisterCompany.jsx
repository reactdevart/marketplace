import '@/modules/auth/components/features/Register/Views/RegisterCompany/RegisterCompany.scss';

import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import Checkbox from '@/components/shared/Checkbox';
import Input from '@/components/shared/Input';
import EmailInput from '@/components/widgets/EmailInput';
import Form from '@/components/widgets/Form';
import PasswordInput from '@/components/widgets/PasswordInput';
import useFormValidator from '@/hooks/useFormValidator';
import { REGISTER_COMPANY_FORM } from '@/modules/auth/AuthLayout/constants';
import AuthLink from '@/modules/auth/components/shared/AuthLink';
import AuthUploadFile from '@/modules/auth/components/widgets/AuthUploadFile';
import AuthUploadedFileArea from '@/modules/auth/components/widgets/AuthUploadFile/AuthUploadedFileArea';
import AuthUploadedFileItem from '@/modules/auth/components/widgets/AuthUploadFile/AuthUploadedFileItem';
import AuthUploadFileArea from '@/modules/auth/components/widgets/AuthUploadFile/AuthUploadFileArea';
import { useLoginMutation, useRegisterCompanyMutation } from '@/store/auth/authApiSlice';
import { setCredentials } from '@/store/auth/authSlice';
import { addToast } from '@/store/toaster/toasterSlice';

const RegisterCompany = () => {
  const dispatch = useDispatch();
  const [registerCompany, { isLoading: isRegisterCompanyLoading }] = useRegisterCompanyMutation();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [files, setFiles] = useState([]);
  const { formState, errors, handleChange, validateForm } = useFormValidator(REGISTER_COMPANY_FORM);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (validateForm()) {
        try {
          const formData = new FormData();
          formData.append('company_name', formState.company_name.value);
          formData.append('email', formState.email.value);
          formData.append('license_code', formState.license_code.value);
          formData.append('password', formState.password.value);
          formData.append('password_confirmation', formState.password_confirmation.value);

          if (files.length > 0) {
            files.forEach((file, index) => {
              formData.append(`licenses[${index + 1}]`, file);
            });
          }

          const result = await registerCompany(formData).unwrap();
          if (result?.data?.email) {
            const loginResult = await login({
              username: formState.email.value,
              password: formState.password.value,
            }).unwrap();
            if (loginResult?.access_token && loginResult?.refresh_token) {
              dispatch(setCredentials({ ...loginResult, email: formState.email.value }));
              dispatch(addToast({ message: 'Company registered successfully', type: 'success' }));
            }
          }
        } catch (err) {
          dispatch(addToast({ message: err?.data?.message || 'Failed to register company', type: 'error' }));
        }
      } else {
        dispatch(addToast({ message: 'Form has errors.', type: 'error' }));
      }
    },
    [validateForm, files, dispatch, formState, login, registerCompany]
  );

  const handleFile = useCallback(
    (files) => {
      if (files && files instanceof FileList) {
        setFiles((prev) => [...prev, ...Array.from(files)]);
      }
    },
    [setFiles]
  );

  const handleRemoveFile = useCallback(
    (fileName) => {
      setFiles((prev) => prev.filter((f) => f.name !== fileName));
    },
    [setFiles]
  );

  return (
    <div className="register-company">
      <div className="register-company__form-wrapper">
        <Form pending={isRegisterCompanyLoading || isLoginLoading} onSubmit={handleSubmit} submitLabel="Create Account">
          <div className="register-company__input-wrapper">
            <Input
              type="text"
              placeholder="Company Name"
              name="company_name"
              error={errors.company_name}
              value={formState.company_name.value}
              onChange={handleChange}
            />
          </div>
          <div className="register-company__input-wrapper">
            <EmailInput
              name="email"
              placeholder="Company E-mail"
              error={errors.email}
              value={formState.email.value}
              onChange={handleChange}
            />
          </div>
          <div className="register-company__input-wrapper">
            <Input
              type="text"
              placeholder="License Code"
              name="license_code"
              error={errors.license_code}
              value={formState.license_code.value}
              onChange={handleChange}
            />
          </div>
          <div className="register-company__auth-upload-file-wrapper">
            <AuthUploadFile>
              {files.length > 0 ? (
                <AuthUploadedFileArea multiple handleFile={handleFile}>
                  <div className="register-company__files-list">
                    {files?.map((file) => (
                      <div className="register-company__auth-uploaded-file-item-wrapper" key={file.name}>
                        <AuthUploadedFileItem handleRemoveFile={handleRemoveFile} fileName={file.name} />
                      </div>
                    ))}
                  </div>
                </AuthUploadedFileArea>
              ) : (
                <AuthUploadFileArea multiple handleFile={handleFile} />
              )}
            </AuthUploadFile>
          </div>
          <div className="register-company__input-wrapper">
            <PasswordInput
              name="password"
              error={errors.password}
              value={formState.password.value}
              onChange={handleChange}
            />
          </div>
          <div className="register-company__input-wrapper">
            <PasswordInput
              name="password_confirmation"
              error={errors.password_confirmation}
              value={formState.password_confirmation.value}
              onChange={handleChange}
              placeholder="Confirm Password"
            />
          </div>
          <div className="register-company__checkbox-auth-link-wrapper">
            <div className="register-company__checkbox-wrapper">
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
            <div className="register-company__auth-link-wrapper">
              <AuthLink link="/terms-and-conditions" linkText="Terms & Conditions" />
            </div>
          </div>
        </Form>
        <div className="register-company__auth-link-wrapper--login">
          <AuthLink label="Already have an account?" link="/auth/login" linkText="Login" />
        </div>
      </div>
    </div>
  );
};

export default RegisterCompany;
