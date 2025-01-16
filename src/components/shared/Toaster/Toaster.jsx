import '@/components/shared/Toaster/Toaster.scss';

import { memo, useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PortalWrapper from '@/components/shared/PortalWrapper/PortalWrapper';
import { removeToast, selectToasts } from '@/store/toaster/toasterSlice';

const Toaster = () => {
  const toasts = useSelector(selectToasts);
  const [slideOutToasts, setSlideOutToasts] = useState(new Set());
  const dispatch = useDispatch();

  const handleAnimationStart = useCallback(
    (toastId) => {
      if (!slideOutToasts.has(toastId)) {
        const timer = setTimeout(() => {
          setSlideOutToasts((prev) => new Set(prev).add(toastId));
        }, 3000);

        return () => clearTimeout(timer);
      }
    },
    [slideOutToasts]
  );

  const handleAnimationEnd = useCallback(
    (id) => {
      if (slideOutToasts.has(id)) {
        dispatch(removeToast(id));
        setSlideOutToasts((prev) => {
          const updatedSet = new Set(prev);
          updatedSet.delete(id);
          return updatedSet;
        });
      }
    },
    [dispatch, slideOutToasts]
  );

  const toastStyles = useMemo(
    () =>
      toasts.map((toast) => ({
        top: toast.id === 0 ? 0 : `${toast.id * 93}px`,
        animationClass: slideOutToasts.has(toast.id) ? 'toaster__item--slide-out' : '',
      })),
    [toasts, slideOutToasts]
  );

  return (
    <PortalWrapper id="toaster" shouldRender={toasts.length > 0}>
      <div className="toaster">
        {toasts.map((toast, index) => (
          <div
            style={{ top: toastStyles[index].top }}
            key={toast.id}
            onAnimationEnd={() => handleAnimationEnd(toast.id)}
            onAnimationStart={() => handleAnimationStart(toast.id)}
            className={`toaster__item toaster__item--${toast.type} ${toastStyles[index].animationClass}`}
          >
            <div className="toaster__item-icon">
              {toast.type === 'success' ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="6" fill="url(#paint0_linear_2841_370)" />
                  <path
                    d="M8.5 12.5L10.5 14.5L15.5 9.5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_2841_370"
                      x1="12"
                      y1="0"
                      x2="12"
                      y2="24"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#48CA93" />
                      <stop offset="1" stopColor="#48BACA" />
                    </linearGradient>
                  </defs>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="6" fill="url(#paint0_linear_2841_353)" />
                  <path
                    d="M15 9.00002L9 15M8.99997 9L14.9999 15"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_2841_353"
                      x1="12"
                      y1="0"
                      x2="12"
                      y2="24"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#E88B76" />
                      <stop offset="1" stopColor="#CA5048" />
                    </linearGradient>
                  </defs>
                </svg>
              )}
            </div>
            <span className="toaster__item-message">{toast.message}</span>
          </div>
        ))}
      </div>
    </PortalWrapper>
  );
};

export default memo(Toaster);
