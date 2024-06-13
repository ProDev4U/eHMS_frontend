
import axios from 'axios';
import formatDateString from './utilService';

// fetch checkups by patient id
export const getCheckupsByPatientId = async (patientId) => {
    let tmp_data = [];
    const result = await axios.get(
        `http://localhost:5000/checkups/patient/${patientId}`,
    );
    result.data?.map((item) => {
      let tmp_item = {
        id: item.id,
        datetime: formatDateString(item.datetime),
        outputCurrent: item.outputCurrent,
        signalFrequency: item.signalFrequency,
        pulseWidth: item.pulseWidth,
        onTime: item.onTime,
        offTime: item.offTime,
        dutyCycle: item.dutyCycle,
        siteEffects: item.siteEffects,
        iderability: item.iderability,
        notes: item.notes,
      };
      tmp_data.push(tmp_item);
    });
    
    return tmp_data;
};

export const addCheckup = async (data) => {
    const result = await axios.post(
        `http://localhost:5000/checkups/`,
        data,
    );
    return result;
};

// edit checkup by id
export const editCheckupById = async (id, data) => {
    const result = await axios.put(
        `http://localhost:5000/checkups/${id}`,
        data,
    );  
    return result;
};  

// delete checkup by id
export const deleteCheckupById = async (id) => {
    const result = await axios.delete(
        `http://localhost:5000/checkups/${id}`,
    );
    return result;
};