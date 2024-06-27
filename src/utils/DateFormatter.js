const DateFormatter = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() returns 0-based index, so add 1
    const day = date.getDate();
    
    const formattedDate = new Date(year, month - 1, day); // month - 1 because Date object months are 0-indexed
    
    return formattedDate;
  }
  
export default DateFormatter;
  