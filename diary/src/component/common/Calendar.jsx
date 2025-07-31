
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

const CalendarComponent = ({ marks, onDateChange }) => {
  return (
    <Calendar
      onChange={onDateChange}
      formatDay={(locale, date) => moment(date).format('DD')}
      tileContent={({ date, view }) => {
        if (marks.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
          return (
            <>
              <div className="dot"></div>
            </>
          );
        }
      }}
    />
  );
};

export default CalendarComponent;
