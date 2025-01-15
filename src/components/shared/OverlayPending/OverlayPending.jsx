import './OverlayPending.scss';

import Spinner from '../Spinner';

const OverlayPending = ({ pending, spinnerSize, children }) => {
  if (!pending) return children;
  return (
    <div className="overlay-pending">
      <div className="overlay-pending__spinner-wrapper">
        <Spinner size={spinnerSize} />
      </div>
      <div className="overlay-pending__children-wrapper">{children}</div>
    </div>
  );
};

export default OverlayPending;
