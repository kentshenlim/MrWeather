import Clock from 'react-clock';
import { useEffect, useState } from 'react';
import 'react-clock/dist/Clock.css';

export default function SunClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <Clock value={time} />;
}
