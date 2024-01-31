export function formatDate(dateString) {
    const fullDate = new Date(`${dateString}T00:00:00Z`).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    });
  
    // Get the month from the full date
    const [month, day, year] = fullDate.split(' ');
  
    // Convert the month to lowercase
    const monthLowerCase = month.toLowerCase();
  
    // Return the formatted date with the month in lowercase
    return `${month.toLowerCase()} ${day.slice(0, -1)}, ${year}`;
  }
  
  export function formatMonthYear(dateString) {
    const dt = new Date(`${dateString}T00:00:00Z`);
    var month = dt.toLocaleString('default', { month: 'long' });
    var year = dt.toLocaleString('default', { year: 'numeric' });
    
    return month.toLowerCase() + ' ' + year
  
  }
  