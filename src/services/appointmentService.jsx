import axios from 'axios';

// fetch all appoments
export const getAllAppointments = async (doctorId) => {
    let tmp_data = [];
    const result = await axios.get(
        `http://localhost:5000/appointments/`,
    );
    result.data?.map((item) => {
      let tmp_item = {
        id: item.id,
        doctorName: item.doctorName,
        patientName: item.patientName,
        doctorEmail: item.doctorEmail,
        patientEmail: item.patientEmail,
        date: item.date,
        from_time: item.from_time,
        end_time: item.end_time,
        topic: item.topic,
        notes: item.notes,
        state: item.state,
      };
      tmp_data.push(tmp_item);
    });
    
    return tmp_data;
};

// fetch appoments by patient id
export const getAppontmentsByPatientId = async (patientId) => {
    let tmp_data = [];
    const result = await axios.get(
        `http://localhost:5000/appointments/patient/${patientId}`,
    );
    result.data?.map((item) => {
      let tmp_item = {
        id: item.id,
        doctorName: item.doctorName,
        doctorEmail: item.doctorEmail,
        date: item.date,
        from_time: item.from_time,
        end_time: item.end_time,
        topic: item.topic,
        notes: item.notes,
        state: item.state,
      };
      tmp_data.push(tmp_item);
    });
    
    return tmp_data;
};

// fetch appoments by doctor id
export const getAppontmentsByDoctorId = async (doctorId) => {
    let tmp_data = [];
    const result = await axios.get(
        `http://localhost:5000/appointments/doctor/${doctorId}`,
        // {
        //     params: {
        //     doctorId: doctorId
        //     }
        // }
    );
    result.data?.map((item) => {
      let tmp_item = {
        id: item.id,
        patientName: item.patientName,
        email: item.email,
        date: item.date,
        from_time: item.from_time,
        end_time: item.end_time,
        topic: item.topic,
        notes: item.notes,
        state: item.state,
      };
      tmp_data.push(tmp_item);
    });
    
    return tmp_data;
};

export const addAppointment = async (data) => {
    const result = await axios.post(
        `http://localhost:5000/appointments/`,
        data,
    );
    return result;
};  

export const editAppointmentById = async (id, data) => {
    const result = await axios.put(
        `http://localhost:5000/appointments/${id}`,
        data,
    );
    return result;
};

// delete appointment by id
export const deleteAppointmentById = async (id) => {
    const result = await axios.delete(
        `http://localhost:5000/appointments/${id}`,
    );
    return result;
};