export function reformatISODateTime(isoDateTimeStr?: string, showTime = true): string {
    if (!isoDateTimeStr) return '-';

    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

    // Create a Date object from the ISO date string
    const date = new Date(isoDateTimeStr);

    // Get the day, month, year in local time
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();

    // Get the name of the day in local time
    const dayName = days[date.getDay()];

    // Format day and month to always be two digits
    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month).padStart(2, '0');

    let formattedHours = '';
    let formattedMinutes = '';
    if (showTime) {
        // Format hours and minutes to always be two digits
        const hours = date.getHours();
        const minutes = date.getMinutes();
        formattedHours = String(hours).padStart(2, '0');
        formattedMinutes = String(minutes).padStart(2, '0');
    }

    // Format the output as required
    const formattedDateTime = `${dayName}, ${formattedDay}/${formattedMonth}/${year}${showTime ? `- ${formattedHours}:${formattedMinutes}` : ''}`;

    return formattedDateTime;
}