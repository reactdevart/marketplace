import '@/modules/home/HomeLayout/HomeLayout.scss';

import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { addToast } from '@/store/toaster/toasterSlice';
import { debounce } from '@/utils/common';

const GENERAL_CATEGORIES = [
  { value: 'Vehicles', image: 'vehicle', postsCount: 26 },
  { value: 'Home', image: 'home', postsCount: 26 },
  { value: 'Jobs', image: 'jobs', postsCount: 26 },
  { value: 'Services', image: 'services', postsCount: 26 },
  { value: 'Items', image: 'items', postsCount: 26 },
];

const root = document.documentElement;
const headerHeight = getComputedStyle(root).getPropertyValue('--header-height').trim();
const homeLayoutPaddingTop = getComputedStyle(root).getPropertyValue('--home-layout-padding-top').trim();
const entryTop = parseInt(headerHeight, 10) + parseInt(homeLayoutPaddingTop, 10);
const triggerHeight = entryTop + 68 + 55 + 95;

const HomeLayout = ({ headerRef }) => {
  const layoutRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    let hasTriggeredAbove = false;
    let hasTriggeredBelow = false;

    const handleScroll = debounce(() => {
      if (window.scrollY > triggerHeight && !hasTriggeredAbove) {
        headerRef.current?.showHeaderSubMenu();
        hasTriggeredAbove = true;
        hasTriggeredBelow = false;
      }

      if (window.scrollY <= triggerHeight && !hasTriggeredBelow) {
        headerRef.current?.hideHeaderSubMenu();
        hasTriggeredBelow = true;
        hasTriggeredAbove = false;
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headerRef]);

  const showSuccessToast = () => {
    dispatch(addToast({ message: 'Operation Successful!', type: 'success' }));
  };

  const showErrorToast = () => {
    dispatch(addToast({ message: 'Something went wrong!', type: 'error' }));
  };

  return (
    <div className="home-container">
      <div ref={layoutRef} className="home-layout">
        <h1 className="home-layout__title">Let’s find the best service for you</h1>
        <div className="home-layout__general-categories-wrapper">
          <div className="home-layout__general-categories-list">
            {GENERAL_CATEGORIES.map((category) => (
              <div
                key={category.value}
                className={`home-layout__general-category-item home-layout__general-category-item--${category.image}`}
              >
                <span className="home-layout__general-category-item-text">{category.value}</span>
                <span className="home-layout__general-category-item-count">{category.postsCount} posts</span>
              </div>
            ))}
          </div>
        </div>
        <button onClick={showSuccessToast}>Show Success Toast</button>
        <button onClick={showErrorToast}>Show Error Toast</button>
      </div>
    </div>
  );
};

export default HomeLayout;
