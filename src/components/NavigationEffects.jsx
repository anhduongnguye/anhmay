import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToElement, scrollToTop } from '../utils/motion';

export default function NavigationEffects() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const sectionId = location.state?.scrollTo;
    if (!sectionId || location.pathname !== '/') return;

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToElement(document.getElementById(sectionId));
        navigate('.', { replace: true, state: {} });
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [location.state?.scrollTo, location.pathname, navigate]);

  useEffect(() => {
    if (!location.hash || location.state?.scrollTo) return;

    const id = location.hash.slice(1);
    const frame = requestAnimationFrame(() => {
      scrollToElement(document.getElementById(id));
    });
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.hash, location.state?.scrollTo]);

  useEffect(() => {
    if (location.state?.scrollTo || location.hash) return;
    scrollToTop();
  }, [location.pathname]);

  return null;
}
