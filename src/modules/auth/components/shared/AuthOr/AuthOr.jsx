import '@/modules/auth/components/shared/AuthOr/AuthOr.scss';

const AuthOr = ({ label = 'or' }) => {
  return (
    <div className="auth-or">
      <span className="auth-or__line" />
      <span className="auth-or__text">{label}</span>
      <span className="auth-or__line" />
    </div>
  );
};

export default AuthOr;
