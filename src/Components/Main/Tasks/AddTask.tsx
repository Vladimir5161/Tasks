import React from "react";
import { AddTaskThunk, UpdateTaskThunk } from "../../../store/TaskReducer";
import AddTaskForm from "../../FormControls/AddTaskReduxForm";
import { connect } from "react-redux";
import { CalendarReact } from "../../CommonComponents/Calendar";
import Clock from "../../CommonComponents/Clock";
import { validateAdd } from "../../../validators/validators";

interface AddTaskType {
    AddTaskThunk: (
        text: string,
        status: string,
        settedTime: string | null,
        settedDate: string | null,
        priority: string | null
    ) => Promise<void>;
    changeAddTask: (value: boolean) => void;
    BlockedButtonArray: Array<number | string>;
}
const AddTask: React.FC<AddTaskType> = ({
    AddTaskThunk,
    changeAddTask,
    BlockedButtonArray,
}) => {
    const [choseState, setChoseState]: any = React.useState({
        priority: "",
    });
    const handleChange = (event: any) => {
        setChoseState({
            priority: event.target.value,
        });
    };
    const [choseStatus, setStatus] = React.useState({
        status: "",
    });
    const changeStatus = (event: any) => {
        setStatus({ status: event.target.value });
    };

    //-----------------
    // here we can set new date for "deadline" and check if it is not older than the current date
    let [calendarDate, setCalendarDate]: any = React.useState(null);
    const onChange = (dateProp: null | Date | Date[]) => {
        const dateStr = dateProp ? dateProp.toString() : new Date()
        const resultDate = new Date(dateStr).getDate() === new Date().getDate()
        if (dateProp) {
            if (dateProp >= new Date() && resultDate === false) {
                setCalendarDate(dateProp);
                setAnimateCalendar(false)
                setAnimateClock(true)
                setErrorDeadline('')
            } else if (resultDate) {
                setCalendarDate(dateProp);
                setAnimateCalendar(false)
                setAnimateClock(true)
                setErrorDeadline('')
            } else {
                setErrorDeadline('you cannot chose this date')
            }
        } else return null;
    };
    let [errorDeadline, setErrorDeadline] = React.useState('')
    let [animateCalendar, setAnimateCalendar] = React.useState(true)
    let [animateClock, setAnimateClock] = React.useState(false)

    let [deadline, changeDeadline]: any = React.useState(false);

    const setDeadline = () => {
        deadline ? changeDeadline(false) : changeDeadline(true);
    };
    // the same for time
    const [selectedTime, setSelectedTime]: any = React.useState(null);
    const handleTimeChange = (time: null | Date | Date[]) => {
        if (time) {
            const timeStr = time.toString()
            const resultDate = new Date(timeStr).getTime() > new Date().getTime()
            if (resultDate) {
                setSelectedTime(time);
                setDeadline();
                setAnimateCalendar(true)
                setAnimateClock(false)
                setErrorDeadline('')
            } else {
                setErrorDeadline('you cannot chose this time')
            }
        }
    };
    const settedDate = calendarDate
        ? calendarDate.toLocaleString().split(",")[0].split(".").reverse().join("-")
        : null;
    const settedTime = selectedTime
        ? selectedTime
            .toLocaleString()
            .split(",")[1]
            .split(":")
            .reverse()
            .splice(1, 2)
            .reverse()
            .join(":")
        : null;

    const onSubmit = async (data: { addTask: string }) => {
        const newDate = new Date()
            .toLocaleString()
            .split(",")[0]
            .split(".")
            .reverse()
            .join("-");
        const newTime = new Date()
            .toLocaleString()
            .split(",")[1]
            .split(":")
            .reverse()
            .splice(1, 2)
            .reverse()
            .join(":");
        const resultDate =
            new Date(newDate + newTime) > new Date(settedDate + settedTime)
                ? true
                : false;

        if (resultDate) {
            await AddTaskThunk(
                data.addTask,
                choseStatus.status,
                null,
                null,
                choseState.priority
            );
        } else {
            await AddTaskThunk(
                data.addTask,
                choseStatus.status,
                settedTime,
                settedDate,
                choseState.priority
            );
        }
        changeAddTask(false);
    };
    return (
        <>
            {deadline ? (
                <div className="deadlineBlock">
                    <div className="deadline">
                        <CalendarReact date={calendarDate} onChange={onChange} animateCalendar={animateCalendar} errorDeadline={errorDeadline} />
                        <Clock
                            handleTimeChange={handleTimeChange}
                            animateClock={animateClock}
                        />
                    </div>
                </div>
            ) : null}
            <AddTaskForm
                handleChange={handleChange}
                choseState={choseState}
                choseStatus={choseStatus}
                changeStatus={changeStatus}
                BlockedButtonArray={BlockedButtonArray}
                setDeadline={setDeadline}
                settedDate={settedDate}
                settedTime={settedTime}
                initialValues={{ addTask: "" }}
                functionToCall={onSubmit}
                validate={validateAdd}
            />
        </>
    );
};

export default connect(null, { AddTaskThunk, UpdateTaskThunk })(AddTask);
