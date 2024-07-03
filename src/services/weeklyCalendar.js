const formatDateToString = (date) => {
    const today = new Date();
    const dateToCompare = new Date(date);

    if (today.getDate() === dateToCompare.getDate() &&
        today.getMonth() === dateToCompare.getMonth() &&
        today.getFullYear() === dateToCompare.getFullYear()) {
        return 'Today';
    } else if (today.getFullYear() === dateToCompare.getFullYear()) {
        return dateToCompare.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short'
        });
    } else {
        return dateToCompare.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    }
};

export { formatDateToString }