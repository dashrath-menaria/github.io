// components/DigitalClock.tsx
import React from "react";

interface DigitalClockProps {
  time: string;
}

const DigitalClock: React.FC<DigitalClockProps> = ({ time }) => {
  return (
    <div className="digital-clock">
      <h1 style={{fontSize:"30px"}}>{time}</h1>
    </div>
  );
};

export default DigitalClock;
