export function presentDate(date: Date) {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();

    return `${month}-${day}-${year}`;
}
