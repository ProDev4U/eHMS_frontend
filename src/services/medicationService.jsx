
import axios from 'axios';

// fetch medication by patient id
export const getMedicationByPatientId = async (patientId) => {  
    let tmp_data = [];
    const result = await axios.get(
        `http://localhost:5000/medications/patient/${patientId}`,
    );
    result.data?.map((item) => {
      let tmp_item = {
        id: item.id,
        medicineName: item.medicineName,
        usageText: item.usageText,
        dose: item.dose,
        frequency: item.frequency,
        date: item.date,
        time: item.time,
        useState: item.useState,
      };
      tmp_data.push(tmp_item);
    });
    
    return tmp_data;
};

// create new medication
export const addMedication = async (data) => {
    const result = await axios.post(
        `http://localhost:5000/medications/`,
        data,
    );
    return result;
};

// edit medication by id
export const editMedicationById = async (id, data) => {
    const result = await axios.put(
        `http://localhost:5000/medications/${id}`,
        data,
    );
    return result;
};

export const editMedicationStateById = async (id) => {
    const result = await axios.put(
        `http://localhost:5000/medications/${id}/increase-state`
    );
    return result;
};

// delete medication by id
export const deleteMedicationById = async (id) => {
    const result = await axios.delete(
        `http://localhost:5000/medications/${id}`,
    );
    return result;
};