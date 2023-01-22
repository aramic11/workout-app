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

  // Adds functionality to the remove workout buttons

const deleteButton = document.querySelectorAll("deleteBtn")
for (let i = 0; i < deleteButton.length + 1; i++) {
  deleteButton[i].addEventListener("click", delButtonHandler)
}

  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/wkts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/calendar');
      } else {
        alert('Failed to delete workout');
      }
    }
  };

// get data, iterate with for loop, if day of week matches, append div button workout