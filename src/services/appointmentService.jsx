import axios from 'axios';
import formatDateString from './utilService';

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
        date: formatDateString(item.date).split(' ')[0],
        from_time: item.from_time,
        end_time: item.end_time,
        topic: item.topic,
        notes: item.notes,
      };
      if(item.state === 0){
        tmp_item.state = "Pending";
      } else if(item.state === 1){
        tmp_item.state = "Declined";  
      } else if(item.state === 2){
        tmp_item.state = "Accepted";
      } else if(item.state === 3){
        tmp_item.state = "Finished";
      }
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
        doctor_id: item.doctor_id,
        name: item.doctorName,
        email: item.doctorEmail,
        date: formatDateString(item.date).split(' ')[0],
        from_time: item.from_time,
        end_time: item.end_time,
        topic: item.topic,
        notes: item.notes,
      };
      if(item.state === 0){
        tmp_item.state = "Pending";
      } else if(item.state === 1){
        tmp_item.state = "Declined";  
      } else if(item.state === 2){
        tmp_item.state = "Accepted";
      } else if(item.state === 3){
        tmp_item.state = "Finished";
      }
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
        name: item.patientName,
        email: item.patientEmail,
        date: formatDateString(item.date).split(' ')[0],
        from_time: item.from_time,
        end_time: item.end_time,
        topic: item.topic,
        notes: item.notes,
      };
      if(item.state === 0){
        tmp_item.state = "Pending";
      } else if(item.state === 1){
        tmp_item.state = "Declined";  
      } else if(item.state === 2){
        tmp_item.state = "Accepted";
      } else if(item.state === 3){
        tmp_item.state = "Finished";
      }
      tmp_data.push(tmp_item);
    });
    
    return tmp_data;
};

export const getAppointmentsByUserId = async (userId) => {
    let tmp_data = [];
    const result = await axios.get( 
        `http://localhost:5000/appointments/user/${userId}`,
    );
    result.data?.map((item) => {
      let tmp_item = {
        id: item.id,
        name: item.patientName,
        email: item.patientEmail,
        date: formatDateString(item.date).split(' ')[0],
        from_time: item.from_time,
        end_time: item.end_time,
        topic: item.topic,
        notes: item.notes,
      };
      if(item.state === 0){
        tmp_item.state = "Pending";
      } else if(item.state === 1){
        tmp_item.state = "Declined";  
      } else if(item.state === 2){
        tmp_item.state = "Accepted";
      } else if(item.state === 3){
        tmp_item.state = "Finished";
      }
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

export const editAppointmentById = async (id, state) => {
    const result = await axios.put(
        `http://localhost:5000/appointments/${id}/state`,
        { state }
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