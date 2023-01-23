// function getCalendarData() {
//     console.log('Working')
// }

// getCalendarData()

// const getWorkouts = () =>
// fetch ('/api/SessionWorkouts', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

  // Adds functionality to the remove workout buttons

  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/calendar/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/calendar');
      } else {
        alert('Failed to delete workout');
      }
    }
  };

const deleteButton = document.querySelectorAll(".deleteBtn")
  for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener("click", delButtonHandler)
  };
// document
//   .querySelector('.deleteBtn')
//   .addEventListener('click', delButtonHandler);



// get data, iterate with for loop, if day of week matches, append div button workout