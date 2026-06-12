import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  PAGE_TRANSITION_HIDDEN,
  PAGE_TRANSITION_STYLE,
} from '../utils/motion';

export default function PageTransition({ children }) {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div
      style={{
        ...(visible ? PAGE_TRANSITION_STYLE : PAGE_TRANSITION_HIDDEN),
        ...(visible ? {} : { transition: PAGE_TRANSITION_STYLE.transition }),
      }}
    >
      {children}
    </div>
  );
}
