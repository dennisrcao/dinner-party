import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import './CustomCalendar.scss';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const testValue = "Wed Jun 29 2024";
const testValue2 = "Monday Jan 1 2024";


export default function CustomCalendar() {
  const [value, onChange] = useState<Value>(new Date());
  console.log("value:", value);
  return (
    <div className="calendar_container">
        <Calendar
          onChange={onChange}
          value={testValue}
        />
    </div>
  );
}