import TaskReducer, { addTask, getTasks, deleteTask } from "./TaskReducer";

const state = {
    TasksArray: [
        { id: 1, text: "bla" },
        { id: 2, text: "bla bla" },
    ],
};



test("task object should be added to state", () => {
    let action = addTask({ id: 1000, text: "bla bla" });

    let newState = TaskReducer(state, action);

    expect(newState.TasksArray.length).toBe(3);
});

test("tasks downloaded from the server should be added to state", () => {
    let action = getTasks([
        { id: 30, text: "text" },
        { id: 40, text: "new task" },
        { id: 50, text: "text" },
    ]);

    let newState = TaskReducer(state, action);

    expect(newState.TasksArray.length).toBeGreaterThan(2);
});

test("after deleting the task, an array of task should not include task with such an id", () => {
    let action = deleteTask(2);

    let newState = TaskReducer(state, action);

    expect(newState.TasksArray).not.toContain(
        newState.TasksArray.filter((id) => id === 2)
    );
});

test("an array of task length should not be changed if id was incorrect", () => {
    let action = deleteTask(245);

    let newState = TaskReducer(state, action);

    expect(newState.TasksArray.length).toBe(3);
});
