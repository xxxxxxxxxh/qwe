export const calculateProgress = (startDate: Date, endDate: Date): string => {
    const total = +new Date(endDate) - +new Date(startDate);
    const elaps = Date.now() - +new Date(startDate);
    return Math.round((elaps / total) * 100) + "%";
};