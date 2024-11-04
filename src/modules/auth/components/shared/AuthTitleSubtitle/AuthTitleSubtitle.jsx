import '@/modules/auth/components/shared/AuthTitleSubtitle/AuthTitleSubtitle.scss';

const AuthTitleSubtitle = ({ title, subtitle }) => {
  return (
    <div className="auth-title-subtitle">
      <span className="sign-title auth-title-subtitle__title">{title}</span>
      <span className="sign-subtitle auth-title-subtitle__subtitle">{subtitle}</span>
    </div>
  );
};

export default AuthTitleSubtitle;
