"use client";

import { useEffect, useState } from "react";

const MobileBlocker = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1000); // Adjust threshold as needed
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Disable scrolling and interactions when the blocker is active
  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Restore scrolling
    }
  }, [isMobile]);

  if (!isMobile) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 text-white text-center p-5 z-[9999] w-full h-full">
      <div className="text-sm font-semibold">
        This website is not yet optimized for small screen devices. <br />
        Please open it on a larger screen for the best experience.
      </div>
    </div>
  );
};

export default MobileBlocker;
