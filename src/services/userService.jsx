import axios from 'axios';

// fetch all users
export const getAllUsers = async () => {
    let tmp_data = [];
    const result = await axios.get(
        `http://localhost:5000/users/`,
    );
    result.data?.map((item) => {
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
        permission: item.permission,  
      };
      tmp_data.push(tmp_item);
    });
    
    return tmp_data;
};

// fetch all doctors
export const getAllDoctors = async () => {
    let tmp_data = [];
    const result = await axios.get(
      'http://localhost:5000/users/doctor/manage',
    );
    result.data?.map((item) => {
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
        permission: item.permission,  
        control: ''
      };
      tmp_data.push(tmp_item);
    });
    
    return tmp_data;
};


// fetch all patients
export const getAllPatients = async () => {
  let tmp_data = [];
  const result = await axios.get(
    'http://localhost:5000/users/patient/manage',
  );
  result.data?.map((item) => {
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
      permission: item.permission,  
      control: ''
    };
    tmp_data.push(tmp_item);
  });
  
  return tmp_data;
};


//fetch all new users
export const getAllNewUsers = async () => {
  let tmp_data = [];
  const result = await axios.get(
    'http://localhost:5000/users/new/manage',
  );
  result.data?.map((item) => {
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
      permission: item.permission,  
      control: ''
    };
    tmp_data.push(tmp_item);
  });
  
  return tmp_data;
};

// Fetch contacted users by user ID
export const getContactedUsers = async (userId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/users/contacted/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching contacted users:", error);
    throw error;
  }
};

// update user by id
export const updateUserById = async (id, data) => {
    const result = await axios.put(
        `http://localhost:5000/users/${id}`,
        data,
    );
    return result;
};

// delete user by id
export const deleteUserById = async (id) => {
    const result = await axios.delete(
        `http://localhost:5000/users/${id}`,
    );
    return result;
};  
