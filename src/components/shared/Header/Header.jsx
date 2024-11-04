import '@/components/shared/Header/Header.scss';

import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Button from '@/components/shared/Button';
import Logo from '@/components/shared/Logo';
import Search from '@/components/widgets/Search';

const GENERAL_CATEGORIES = [
  { value: 'Vehicles', icon: 'icon-car' },
  { value: 'Home', icon: 'icon-home' },
  { value: 'Jobs', icon: 'icon-job' },
  { value: 'Services', icon: 'icon-services' },
  { value: 'Items', icon: 'icon-items' },
];

const Header = forwardRef((_, ref) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const localRef = useRef(null);

  const handleNavigate = useCallback(
    (route) => {
      navigate(route);
    },
    [navigate]
  );

  useImperativeHandle(ref, () => ({
    showHeaderSubMenu: () => {
      if (localRef.current) {
        localRef.current.style.display = 'flex';
      }
    },
    hideHeaderSubMenu: () => {
      if (localRef.current) {
        localRef.current.style.display = 'none';
      }
    },
  }));

  if (pathname?.startsWith('/auth')) {
    return null;
  }

  return (
    <>
      <div className="header-line" />
      <div ref={localRef} style={{ display: 'none' }} className="header-sub-menu-wrapper">
        <div className="header-sub-menu-list">
          {GENERAL_CATEGORIES.map((category) => (
            <div
              key={category.value}
              className="header-sub-menu-item"
              // onClick={() => handleNavigate(`/posts/${category.value.toLowerCase()}`)}
            >
              <i className={`header-sub-menu-item-icon ${category.icon}`} />
              <span className="header-sub-menu-item-text">{category.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="header-wrapper">
        <div className="header">
          <div className="header__left">
            <div className="header__logo-wrapper">
              <Logo />
            </div>
            <div className="header__search-wrapper">
              <Search />
            </div>
          </div>
          <div className="header__right">
            <div className="header__buttons-wrapper">
              <div className="header__button-wrapper">
                <Button onClick={() => handleNavigate('/auth/login')} variant="secondary">
                  Login
                </Button>
              </div>
              <div className="header__button-wrapper header__button-wrapper--icon">
                <Button onClick={() => handleNavigate('/posts/create-post')} variant="gradient">
                  <span>+</span>
                  <span>Create a Post</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
Header.displayName = 'Header';

export default Header;
