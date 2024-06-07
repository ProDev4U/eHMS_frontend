import axios from 'axios';

// fetch all messages for a user by user id
export const getAllMessagesByUserId = async (userId) => {
    let tmp_data = [];
    const result = await axios.get(
        `http://localhost:5000/messages/user/${userId}`,
    );  
    result.data?.map((item) => {      
      let tmp_item = {
        id: item.id,
        toUserId: item.toUserId,
        fromUserId: item.fromUserId,
        content: item.content,
        state: item.state,
        date: item.date,
        userName: item.userName,
        userEmail: item.email,
        userAvatar: item.avatar ? '/img/avatar/'+item.avatar : '/img/avatar/default.png',
      };
      tmp_data.push(tmp_item);
    });
    
    return tmp_data;
};

// fetch messages between two users
export const getMessagesBetweenUsers = async (userId1, userId2) => {
    let tmp_data = [];
    const result = await axios.get(
        `http://localhost:5000/messages/user/${userId1}/${userId2}`,
    );  
    result.data?.map((item) => {      
      let tmp_item = {
        id: item.id,
        toUserId: item.toUserId,
        fromUserId: item.fromUserId,
        content: item.content,
        date: item.date,
        state: item.state,
        userName: item.userName,
        userEmail: item.email,
        userAvatar: item.avatar ? '/img/avatar/'+item.avatar : '/img/avatar/default.png',
      };
      tmp_data.push(tmp_item);
    });
    
    return tmp_data;
};

// fetch unread messages
export const getUnreadMessages = async (userId) => {
    let tmp_data = [];
    const result = await axios.get(
        `http://localhost:5000/messages/unread/user/${userId}`,
    );  
    result.data?.map((item) => {      
      let tmp_item = {
        id: item.id,
        toUserId: item.toUserId,
        fromUserId: item.fromUserId,
        content: item.content,
        date: item.date,
        userName: item.userName,
        userEmail: item.email,
        userAvatar: item.avatar ? '/img/avatar/'+item.avatar : '/img/avatar/default.png',
      };
      tmp_data.push(tmp_item);
    });
    
    return tmp_data;
};

// create new message
export const sendMessage = async (data) => {
    const result = await axios.post(
        `http://localhost:5000/messages/`,
        data,
    );
    return result;
};

// edit message by id
export const editMessageById = async (id, editedContent) => {
    try {
        const result = await axios.put(
            `http://localhost:5000/messages/${id}`,
            { content: editedContent }, // Provide edited content as an object
        );
        return result;
    } catch (error) {
        console.error("Error editing message by ID:", error);
        throw error; // Propagate the error
    }
};

// delete message by id
export const deleteMessageById = async (id) => {
    const result = await axios.delete(
        `http://localhost:5000/messages/${id}`,
    );
    return result;
};
