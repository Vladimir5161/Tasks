import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";


interface CalendarReactTypes {
    date: Date | Date[] | null,
    onChange: (date: Date | Date[] | null) => void
}
export const CalendarReact: React.FC<CalendarReactTypes> = ({ date, onChange }) => {
    return (
        <div className="calendarBlock">
            <div className="deadlineText">Set deadline</div>
            <Calendar onChange={onChange} value={date} />
        </div>
    );
};
