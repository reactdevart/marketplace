import '@/components/widgets/Form/Form.scss';

import Button from '@/components/shared/Button/Button';

const Form = ({ children, submitLabel, onSubmit, pending }) => {
  return (
    <div className="form">
      {children && <div className="form__content">{children}</div>}
      <div style={{ marginTop: children ? 40 : 0 }} className="form__button-wrapper">
        <Button pending={pending} onClick={onSubmit} variant="gradient">
          {submitLabel}
        </Button>
      </div>
    </div>
  );
};

export default Form;
