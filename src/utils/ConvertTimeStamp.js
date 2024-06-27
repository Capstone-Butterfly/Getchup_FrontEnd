const convertTimeStringToMilliseconds = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
  };
  
const convertMillisecondsToTimeString = (milliseconds) => {
    const totalMinutes = Math.floor(milliseconds / (60 * 1000));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

export default {convertMillisecondsToTimeString, convertTimeStringToMilliseconds}