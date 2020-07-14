import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export const CalendarReact = ({ date, onChange }) => {
    return (
        <div className="calendarBlock">
            <div className="deadlineText">Set deadline</div>
            <Calendar onChange={onChange} value={date} />
        </div>
    );
};
