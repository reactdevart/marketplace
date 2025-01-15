import '@/components/widgets/PhoneInput/PhoneInput.scss';

import Input from '@/components/shared/Input';

const formatPhoneNumber = (value) => {
  const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters

  if (numericValue.length === 0) return '';

  const part1 = numericValue.slice(0, 3); // First 3 digits
  const part2 = numericValue.slice(3, 6); // Next 3 digits
  const part3 = numericValue.slice(6, 10); // Last 4 digits

  let formatted = '';

  if (part1) {
    formatted += `(${part1}`;
  }

  if (part2) {
    formatted += `) ${part2}`;
  }

  if (part3) {
    formatted += `-${part3}`;
  }

  return formatted;
};

const PhoneInput = ({ placeholder = 'Phone Number', name = 'phoneInput', onChange, ...props }) => {
  const handleChange = (e) => {
    const inputValue = e.target.value;
    const formattedValue = formatPhoneNumber(inputValue);
    onChange?.({
      target: {
        value: formattedValue,
        name,
      },
    });
  };

  return (
    <div className="phone-input">
      <div className="phone-input__input-wrapper">
        <Input
          type="tel"
          placeholder={placeholder}
          value={props?.value}
          maxLength={14}
          name={name}
          onChange={handleChange}
          {...props}
        />
      </div>
    </div>
  );
};

export default PhoneInput;
