import '@/modules/auth/components/shared/AuthLink/AuthLink.scss';

import { Link } from 'react-router-dom';

const AuthLink = ({ link, linkText, label, callback, callbackText }) => {
  return (
    <div className="auth-link">
      {label && <span className="auth-link__label">{label}</span>}
      {link && linkText && (
        <Link to={link} className="auth-link__link">
          {linkText}
        </Link>
      )}
      {callback && callbackText && (
        <span onClick={callback} className="auth-link__callback">
          {callbackText}
        </span>
      )}
    </div>
  );
};

export default AuthLink;
