export interface TaskTypes {
    data: string;
    id: number;
    keyFirebase?: string;
    prevStatus?: string | null;
    priority: string | null;
    settedDate: string | null;
    settedTime: string | null;
    status: string;
    text: string;
}

export interface TasksFCTypes {
    TasksArray: Array<TaskTypes>;
    DeleteTaskThunk: (id: number, keyFirebase: string) => void;
    isAuth: boolean;
    filterArray: (value: string) => void;
    loading: boolean;
    confirm: boolean;
    BlockedButtonArray: Array<number | string>;
    deleteId: number | null;
    deleteKey?: string | null;
    taskPanel: Array<number | string>;
    setTaskPanel: (id: number) => void;
}

export interface TaskItemContainerTypes {
    data: string;
    id: number;
    text: string;
    BlockedButtonArray: Array<number | string>;
    priority: string | null;
    status: string;
    DeleteTaskThunk: (id: number, keyFirebase: string) => void;
    keyFirebase?: string;
    UpdateTaskThunk: (
        text: string,
        status: string,
        id: number,
        date: string,
        newSettedDate: string | null,
        newSettedTime: string | null,
        priority: string | null,
        keyFirebase?: string
    ) => Promise<void>;
    SetToPrevStatusThunk: (keyFirebase: string) => void;
    SetToDoneThunk: (keyFirebase: string) => void;
    settedDate: string | null;
    settedTime: string | null;
    confirm: boolean;
    setConfirm: (confirm: boolean, id?: number, key?: string) => void;
    TasksArray: Array<TaskTypes>;
    deleteId: number | null;
    deleteKey?: string | null;
    taskPanel: Array<number | string>;
    setTaskPanel: (id: number) => void;
}

export interface TaskItemTypes {
    setTaskPanel: (id: number) => void;
    data: string;
    id: number;
    text: string;
    priority: string | null;
    status: string;
    keyFirebase?: string;
    editTask: { [id: number]: boolean };
    EditButtonFunc: () => void;
    BlockedButtonArray: Array<number | string>;
    settedDate: string | null;
    settedTime: string | null;
    newSettedDate: string;
    newSettedTime: string;
    deadline: { [id: number]: boolean };
    onChange: (date: null | Date[] | Date) => void;
    handleTimeChange: (time: null | Date[] | Date) => void;
    choseState: { priority: string };
    changeStatus: (event: any) => void;
    handleChange: (event: any) => void;
    setDeadline: () => void;
    onSubmit: (formData: any) => void;
    choseStatus: { status: string };
    missed: { [id: number]: boolean };
    taskPanel: Array<number | string>;
    urgent: { [id: number]: boolean };
    OnDoneButtonClick: () => void;
    DeleteTask: (iD: number, keyFirebase: string) => void;
    confirm: boolean;
    setConfirm: (confirm: boolean, id?: number, key?: string) => void;
    handleUpdate: () => void;
    deleteId: number | null;
    deleteKey?: string | null;
    confirmSave: boolean;
    selectedTime: null | Date[] | Date;
    setConfirmSave: (value: boolean) => void;
}
