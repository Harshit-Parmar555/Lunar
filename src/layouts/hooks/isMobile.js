import { useState, useEffect } from "react";

const useMobile = (breakPoint = 768) => {
  const [isMobile, setIsMobile] = useState(null);
  useEffect(() => {
    const checkIsMobile =()=>{
      setIsMobile(window.innerWidth <= breakPoint);
    }
    checkIsMobile();
    const handleResize = () => {
      setIsMobile(window.innerWidth <= breakPoint);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakPoint]);

  return {isMobile};
};
export default useMobile;
