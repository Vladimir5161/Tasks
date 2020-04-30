import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { connect } from "react-redux";
import "./tasks.css";
import DeleteButton from "../../CommonComponents/DeleteButton";
import EditButton from "../../CommonComponents/EditButon";
import { GetTasksThunk } from "../../../store/TaskReducer";

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
});

const ActionsInExpansionPanelSummary = React.memo(
    ({ TasksArray, GetTasksThunk }) => {
        const classes = useStyles();
        let [written, changeTextDecoration] = useState([]);
        const ChangeTextId = (ID) => {
            if (written.some((id) => id === ID)) {
                changeTextDecoration(written.filter((id) => id !== ID));
            } else changeTextDecoration([...written, ID]);
        };
        let [DeleteClass, changeDeleteClass] = useState("deleteButtonTask");
        let [EditButtonClass, changeEditButton] = useState("editButtonTask");

        useEffect(() => {
            const uploadTasks = () => {
                GetTasksThunk();
            };
            uploadTasks();
        }, [TasksArray.length, GetTasksThunk]);
        return (
            <div className={classes.root}>
                {TasksArray.map(({ id, text, undertext, priority, data }) => (
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-label="Expand"
                            aria-controls="additional-actions1-content"
                            id="additional-actions1-header"
                        >
                            <div className="dataTasks">{data}</div>
                            {written.some((item) => item === id) ? (
                                <FormControlLabel
                                    aria-label="Acknowledge"
                                    control={<Checkbox />}
                                    className="doneText"
                                    onClick={(event) => event.stopPropagation()}
                                    onFocus={(event) => event.stopPropagation()}
                                    onMouseDown={(event) => {
                                        event.stopPropagation();
                                        ChangeTextId(id);
                                    }}
                                    label={text}
                                />
                            ) : (
                                <FormControlLabel
                                    aria-label="Acknowledge"
                                    control={<Checkbox />}
                                    className="clearText"
                                    onClick={(event) => event.stopPropagation()}
                                    onFocus={(event) => event.stopPropagation()}
                                    onMouseDown={(event) => {
                                        event.stopPropagation();
                                        ChangeTextId(id);
                                    }}
                                    label={text}
                                />
                            )}
                            <div className="priorityTask">
                                priority: {priority}
                            </div>
                            <DeleteButton DeleteClass={DeleteClass} />
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography color="textSecondary">
                                {undertext}
                            </Typography>
                            <EditButton EditButton={EditButtonClass} />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                ))}
            </div>
        );
    }
);
const mapStateToProps = (state) => ({
    TasksArray: state.tasks.TasksArray,
});

export default connect(mapStateToProps, { GetTasksThunk })(
    ActionsInExpansionPanelSummary
);
