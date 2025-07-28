'use client'
// pages/index.tsx or another component file
import React, { useState, useEffect } from "react";
import DigitalClock from "./DigitalClock";

const HomePage: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // convert 0 to 12
      const formattedHours = String(hours).padStart(2, "0");

      setCurrentTime(`${formattedHours}:${minutes}:${seconds} ${ampm}`);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <DigitalClock time={currentTime} />
    </div>
  );
};

export default HomePage;
