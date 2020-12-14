import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";


interface CalendarReactTypes {
    date: Date | Date[] | null,
    onChange: (date: Date | Date[] | null) => void,
    animateCalendar: boolean,
    errorDeadline: string
}
export const CalendarReact: React.FC<CalendarReactTypes> = ({ date, onChange, animateCalendar, errorDeadline }) => {
    return (
        <div className={animateCalendar ? "calendarBlockAnimated" : "calendarBlock"}>
            {errorDeadline ? <div className="errorDeadline">{errorDeadline}</div> : <div className="deadlineText">Set deadline</div>}
            <Calendar onChange={onChange} value={date} locale='EN' />
        </div >
    );
};
