import '@/modules/auth/components/features/Register/Views/RegisterCompany/RegisterCompany.scss';

import { useCallback, useState } from 'react';

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

const RegisterCompany = () => {
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

          console.log('Company registered successfully:');
        } catch (err) {
          console.error('Failed to register company:', err);
        }
      } else {
        console.log('Form has errors.');
      }
    },
    [
      validateForm,
      files,
      formState.company_name.value,
      formState.email.value,
      formState.license_code.value,
      formState.password.value,
      formState.password_confirmation.value,
    ]
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
        <Form onSubmit={handleSubmit} submitLabel="Create Account">
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
