// Custom date parsing function for "dd/mm/yyyy" format
const ParseDate = (dateString) => {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day); // Month is 0-based in JavaScript
};

export default ParseDate;
