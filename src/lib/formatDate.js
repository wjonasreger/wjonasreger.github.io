export function formatDate(dateString, include = 'my') {
  if (dateString === null) {
    return null; // Return null for null values
  }
  
    const fullDate = new Date(`${dateString.split('/').join('-')}T00:00:00Z`).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    });

    if (!fullDate) {
      return null; // Return null if the date couldn't be formatted
    }
  
    // Get the month from the full date
    const [month, day, year] = fullDate.split(' ');
    const formattedDateParts = [];

    if (include.toLowerCase().includes('m')) {
      formattedDateParts.push(month.toLowerCase().slice(0, 3));
    }
  
    if (include.toLowerCase().includes('d')) {
      formattedDateParts.push(day.slice(0, -1));
    }
  
    if (include.toLowerCase().includes('y')) {
      formattedDateParts.push(year);
    }
  
    // Return the formatted date
    return formattedDateParts.join(' ');
  }
  
  export function formatMonthYear(dateString) {
    if (dateString === null) {
      return null; // Return null for null values
    }
    
    const dt = new Date(`${dateString.split('/').join('-')}T00:00:00Z`);
    var month = dt.toLocaleString('default', { month: 'long' });
    var year = dt.toLocaleString('default', { year: 'numeric' });
    
    return month.toLowerCase() + ' ' + year
  
  }
  
export function parseDate(dateString) {
  const [year, month, day] = dateString.split('/');
  return parseInt(year) * 12 + parseInt(month) - 1;
};