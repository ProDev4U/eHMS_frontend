import axios from 'axios';

// Fetch all relations
export const getAllRelations = async () => {
    try {
        const result = await axios.get('http://localhost:5000/relations/');
        return result.data.map(item => ({
            id: item.id,
            doctorName: item.doctorName,
            patientName: item.patientName,
            doctorEmail: item.doctorEmail,
            patientEmail: item.patientEmail,
            state: item.state
        }));
    } catch (error) {
        console.error('Error fetching all relations:', error);
        throw error;
    }
};

// Fetch relations by patient ID
export const getRelationsByPatientId = async (patientId) => {
    try {
        const result = await axios.get(`http://localhost:5000/relations/patient/${patientId}`);
        return result.data.map(item => ({
            id: item.id,
            name: item.name,
            email: item.email,
            gender: item.gender,
            age: item.age,
            phoneNumber: item.phoneNumber,
            postalCode: item.postalCode,
            address: item.address.replace(":::", "\n"),
            state: item.state
        }));
    } catch (error) {
        console.error('Error fetching relations by patient ID:', error);
        throw error;
    }
};

// Fetch relations by doctor ID
export const getRelationsByDoctorId = async (doctorId) => {
    try {
        const result = await axios.get(`http://localhost:5000/relations/doctor/${doctorId}`);
        return result.data.map(item => ({
            id: item.id,
            name: item.name,
            email: item.email,
            gender: item.gender,
            age: item.age,
            phoneNumber: item.phoneNumber,
            postalCode: item.postalCode,
            address: item.address.replace(":::", "\n"),
            state: item.state
        }));
    } catch (error) {
        console.error('Error fetching relations by doctor ID:', error);
        throw error;
    }
};

// Create a new relation
export const createRelation = async (data) => {
    try {
        const result = await axios.post('http://localhost:5000/relations/', data);
        return result.data;
    } catch (error) {
        console.error('Error creating relation:', error);
        throw error;
    }
};

// Update relation state by ID
export const updateRelationStateById = async (id, state) => {
    try {
        const result = await axios.put(`http://localhost:5000/relations/${id}/state`, { state });
        return result.data;
    } catch (error) {
        console.error('Error updating relation state by ID:', error);
        throw error;
    }
};

// Delete relation by ID
export const deleteRelationById = async (id) => {
    try {
        const result = await axios.delete(`http://localhost:5000/relations/${id}`);
        return result.data;
    } catch (error) {
        console.error('Error deleting relation by ID:', error);
        throw error;
    }
};
