import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (document.getElementById('appContentScroll')) {
        document.getElementById('appContentScroll').scroll({top:0, behavior:'auto'});
    }
  }, [pathname]);
  return null;
}