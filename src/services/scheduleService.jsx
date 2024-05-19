import axios from 'axios';

//fetch schedule by user id
export const getScheduleByUserId = async (userId) => {
    let tmp_data = [];
    const result = await axios.get(
        `http://localhost:5000/schedules/user/${userId}`,
    );
    result.data?.map((item) => {
      let tmp_item = {
        id: item.id,
        userName: item.userName,
        title: item.title,
        date: item.date,
      };
      tmp_data.push(tmp_item);
    });
    return tmp_data;
};

// fetch all schedules
export const getAllSchedules = async () => {
    let tmp_data = [];
    const result = await axios.get(
        `http://localhost:5000/schedules/`,
    );
    result.data?.map((item) => {
      let tmp_item = {
        id: item.id,
        userName: item.userName,
        title: item.title,
        date: item.date,
      };
      tmp_data.push(tmp_item);
    });
    return tmp_data;
};

// create new schedule
export const addSchedule = async (data) => {
    const result = await axios.post(
        `http://localhost:5000/schedules/`,
        data,
    );
    return result;
};

// edit schedule by id
export const editScheduleById = async (id, data) => {
    const result = await axios.put(
        `http://localhost:5000/schedules/${id}`,
        data,
    );
    return result;
};

// delete schedule by id
export const deleteScheduleById = async (id) => {
    const result = await axios.delete(
        `http://localhost:5000/schedules/${id}`,
    );
    return result;
};