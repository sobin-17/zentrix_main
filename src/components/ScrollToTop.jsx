import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Scroll window directly (instant, instead of smooth which can glitch across unmounts)
    window.scrollTo(0, 0);
    
    // 2. Scroll specific document nodes in case index.css (height: 100%) shifts scrolling to body/html
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // 3. Keep a small timeout fallback just in case React's painting cycle delays component heights
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 10);
  }, [pathname]);

  return null;
};

export default ScrollToTop;