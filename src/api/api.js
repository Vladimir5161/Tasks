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
    pushTasks(tasks) {
        return instance.post(`tasks.json`, tasks).then((res) => {
            return res.data;
        });
    },
};
