import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { scrollToElement } from '../utils/motion';

export function useScrollToSection() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = useCallback(
    (sectionId, e) => {
      e?.preventDefault();

      if (location.pathname === '/') {
        scrollToElement(document.getElementById(sectionId));
      } else {
        navigate('/', { state: { scrollTo: sectionId } });
      }
    },
    [location.pathname, navigate],
  );

  return scrollToSection;
}
