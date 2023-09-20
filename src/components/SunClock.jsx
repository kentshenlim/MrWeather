import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';

export default function SunClock({ time }) {
  return (
    <Clock value={time} renderSecondHand={false} renderMinuteMarks={false} />
  );
}
