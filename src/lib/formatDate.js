export function formatDate(dateString) {
    const fullDate = new Date(`${dateString.split('/').join('-')}T00:00:00Z`).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    });
  
    // Get the month from the full date
    const [month, day, year] = fullDate.split(' ');
  
    // Return the formatted date with the month in lowercase
    return `${month.toLowerCase().slice(0, 3)} ${day.slice(0, -1)}, ${year}`;
  }
  
  export function formatMonthYear(dateString) {
    const dt = new Date(`${dateString.split('/').join('-')}T00:00:00Z`);
    var month = dt.toLocaleString('default', { month: 'long' });
    var year = dt.toLocaleString('default', { year: 'numeric' });
    
    return month.toLowerCase() + ' ' + year
  
  }
  