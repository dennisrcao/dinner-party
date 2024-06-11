import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import './CustomCalendar.scss';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const testValue = "Wed Jun 29 2024";
const testValue2 = "Monday Jan 1 2024";

interface CustomCalendarProps {
  date: string;
}


export default function CustomCalendar({date}: CustomCalendarProps) {

  console.log("<CustomCalendar> with date:", date);
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div className="calendar_container">
        <Calendar
          value={date}
        />
    </div>
  );
}