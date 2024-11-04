import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const PortalWrapper = ({ children, id, shouldRender }) => {
  const [portalContainer, setPortalContainer] = useState(null);

  useEffect(() => {
    if (shouldRender && !portalContainer) {
      const container = document.createElement('div');
      container.id = id;
      document.body.appendChild(container);
      setPortalContainer(container);
    } else if (!shouldRender && portalContainer) {
      if (portalContainer.parentNode) {
        portalContainer.parentNode.removeChild(portalContainer);
      }
      setPortalContainer(null);
    }

    return () => {
      if (portalContainer && portalContainer.parentNode) {
        portalContainer.parentNode.removeChild(portalContainer);
      }
    };
  }, [shouldRender, portalContainer, id]);

  if (!shouldRender || !portalContainer) return null;

  return ReactDOM.createPortal(children, portalContainer);
};

export default PortalWrapper;
