import '@/components/widgets/EmailInput/EmailInput.scss';

import Input from '@/components/shared/Input';

const EmailInput = ({ placeholder = 'E-mail Address', name = 'email', ...props }) => {
  return (
    <div className="email-input">
      <div className="email-input__input-wrapper">
        <Input type="email" placeholder={placeholder} name={name} {...props} />
      </div>
    </div>
  );
};

export default EmailInput;
