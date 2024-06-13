const formatDateString = (dateString) => {
    const date = new Date(dateString);
    
    // Function to pad numbers with leading zeros
    const pad = (num) => num.toString().padStart(2, '0');
    
    const formattedDate = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    
    return formattedDate;
};

export default formatDateString;