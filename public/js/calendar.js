// function getCalendarData() {
//     console.log('Working')
// }

// getCalendarData()

const getWorkouts = () =>
fetch ('/api/SessionWorkouts', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

// get data, iterate with for loop, if day of week matches, append div button workout