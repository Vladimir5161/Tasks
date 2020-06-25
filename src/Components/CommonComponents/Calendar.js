import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export const CalendarReact = ({ date, onChange }) => {
    return (
        <div style={{ maxWidth: "300px", margin: "0 auto" }}>
            <div>Set deadline</div>
            <Calendar onChange={onChange} value={date} />
        </div>
    );
};
