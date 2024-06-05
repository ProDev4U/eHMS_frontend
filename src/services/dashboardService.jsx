import axios from 'axios';

export const getDashboardUsersInfo = async () => {
    const result = await axios.get(
        `http://localhost:5000/users/`,
    );
    
    let patients = [];
    let newRegisters = [];

    result.data?.filter((item) => {
        return item.role === 'Patient' && item.permission === 1
    }).map((item) => {
      let tmp_item = {
        id: item.id,
        name: item.firstName + " " + item.lastName,
        email: item.email,
        gender: item.gender,
        age: item.age,
        phoneNumber: item.phoneNumber,
        postalCode: item.postalCode,
        address: item.address.replace(":::", "\n"),
        role: item.role,
        permission: item.permission ? "Permit" : "Block",  
        avatar: item.avatar ? '/img/avatar/'+item.avatar : '/img/avatar/default.png',
      };
      patients.push(tmp_item);
    });

    result.data?.filter((item) => {
        return item.role === 'Patient' && item.permission === 0
    }).map((item) => {
      let tmp_item = {
        id: item.id,
        name: item.firstName + " " + item.lastName,
        email: item.email,
        gender: item.gender,
        age: item.age,
        phoneNumber: item.phoneNumber,
        postalCode: item.postalCode,
        address: item.address.replace(":::", "\n"),
        role: item.role,
        permission: item.permission ? "Permit" : "Block",  
        avatar: item.avatar ? '/img/avatar/'+item.avatar : '/img/avatar/default.png',
      };
      newRegisters.push(tmp_item);
    })

    const cntDoctors = result.data?.filter((item) => {
        return item.role === 'Doctor' || item.role === 'Admin'
    }).length;

    const cntAllUsers = result.data?.length;

    return { patients, newRegisters, cntDoctors, cntAllUsers };
};

export const getUpcomingAppointments = async () => {
    const result = await axios.get(
        `http://localhost:5000/appointments/upcoming/`,
    );
    return result.data;
};  


export const getPatientsByDoctorId = async (doctorId) => {
    const result = await axios.get(
        `http://localhost:5000/relations/doctor/${doctorId}`,
    );
    return result.data;
};