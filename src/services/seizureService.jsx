
import axios from 'axios';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

// fetch seizures by patient id
export const getSeizuresByPatientId = async (patientId) => {
    let tmp_data = [];
    const result = await axios.get(
        `http://localhost:5000/seizures/patient/${patientId}`,
    );  
    result.data?.map((item) => {      
      let tmp_item = {
        id: item.id,
        description: item.description,
        activity: item.activity,
        mood: item.mood,
        starttime: item.starttime,
        endtime: item.endtime,
        duration: item.duration,
        possibleTrigger: item.possibleTrigger,
        attachName: item.attachName
      };
      tmp_data.push(tmp_item);
    });
    
    return tmp_data;
};

// create new seizure
export const addSeizure = async (data) => {
    console.log(data);
    const result = await axios.post(
        `http://localhost:5000/seizures/`,
        data,
    );
    return result;
};

// edit seizure by id
export const editSeizureById = async (id, data) => {
    const result = await axios.put(
        `http://localhost:5000/seizures/${id}`,
        data,
    );
    return result;
};

// delete seizure by id
export const deleteSeizureById = async (id) => {
    const result = await axios.delete(
        `http://localhost:5000/seizures/${id}`,
    );
    return result;
};

