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

  // const delButtonHandler = async (event) => {
  //   if (event.target.hasAttribute('data-id')) {
  //     const id = event.target.getAttribute('data-id');
  
  //     const response = await fetch(`/api/wkts/${id}`, {
  //       method: 'DELETE',
  //     });
  
  //     if (response.ok) {
  //       document.location.replace('/calendar');
  //     } else {
  //       alert('Failed to delete workout');
  //     }
  //   }
  // };

// get data, iterate with for loop, if day of week matches, append div button workout