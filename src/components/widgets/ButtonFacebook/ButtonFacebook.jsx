import '@/components/widgets/ButtonFacebook/ButtonFacebook.scss';

import Button from '@/components/shared/Button';

const ButtonFacebook = ({ ...props }) => {
  return (
    <Button {...props} className="button-facebook" variant="ghost">
      <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
        <path
          d="M23 12.0288C23 5.66491 17.848 0.5 11.5 0.5C5.152 0.5 0 5.66491 0 12.0288C0 17.6088 3.956 22.2549 9.2 23.3271V15.4875H6.9V12.0288H9.2V9.14662C9.2 6.92155 11.0055 5.11153 13.225 5.11153H16.1V8.57018H13.8C13.1675 8.57018 12.65 9.08897 12.65 9.72306V12.0288H16.1V15.4875H12.65V23.5C18.4575 22.9236 23 18.0123 23 12.0288Z"
          fill="#0047FF"
        />
      </svg>
      <span style={{ marginLeft: 12 }}>Facebook</span>
    </Button>
  );
};

export default ButtonFacebook;
