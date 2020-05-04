import * as axios from "axios";

const instance = axios.create({
    baseURL: "https://tasks-project-12af2.firebaseio.com/",
    withCreadentials: true,
    headers: {
        key: `AAAAJUvgKzw:APA91bHdyP_suyOtAoCKDSBRs2LQD7VJ0LpVeG7nhkN8suDHw2gAb5ilZ3ZIilugqGTBHLOeHr7cbeSG2auxl95pSI8_nM3NWf9iYyhu3y4BPkTZqozcYqa_NoR4ICkaLHOZGkv55Gsk`,
    },
});

export const WebApi = {
    getTasks() {
        return instance.get(`tasks.json`).then((resp) => {
            return resp.data;
        });
    },
    addTask(task) {
        return instance.post(`tasks.json`, task).then((resp) => {
            return resp.data;
        });
    },
    deleteTask(keyFirebase) {
        return instance.delete(`tasks/${keyFirebase}.json`).then((resp) => {
            return resp.data;
        });
    },
    updateTask(task) {
        return instance
            .put(`tasks/${task.keyFirebase}.json`, task)
            .then((resp) => {
                return resp.data;
            });
    },
};
