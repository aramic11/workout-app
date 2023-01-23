let counter = 0;
let inputTextValue = $('.text');

// The text input has to be text, backspace or space
inputTextValue.onkeydown = function (e) {
    if (!((e.keyCode > 64 && e.keyCode < 91)
        || e.keyCode == 8 || e.keyCode == 32 || e.keyCode == 46)) {
        return false;
    }
}

//function which displays the new workout modal
$(".createNewWorkoutBtn").click(function () {
    $(".setupSectionEl").removeClass('is-flex');
    $(".setupSectionEl").addClass('is-hidden');
    $('.createWorkoutEl').show();
    $(".exerciseSearchContainer").show();
    $('.searchResultsEl').hide();
    $('.finishBtn').hide();
});

//once the select program button is clicked itll show the program options
$(".selectProgramBtn").click(function () {
    $('.selectProgramContainer').show();
    displayProgramOptions();
});

//once the select button is clicked itll display the setup workout
$(".selectBtn").click(function () {
    console.log('clicked');
    displaySetupWorkout();
});

//the search button is used to submit criteria to the Ninja API
$(".searchBtn").click(function () {
    exerciseSearch();
    $('.searchResultsEl').show();
});

//toggle to see the saved exercise on and off
$('.savedExercisesBtn').click(function () {
    $(".savedExercisesContainer").toggle();
    displayWorkout();
})

//button to show more description info the on exercises
$(".exerciseSelections").on('click', '.moreBtn', function () {
    $(this).next().toggle();
});

//button to open up setup section
$(".setupBtn").click(function () {
    let userWorkouts = localStorage.getItem("workouts");
    if (userWorkouts) {
        $('.savedExercisesContainer').hide();
        $('.searchResultsEl').hide();
        $(".exerciseSearchContainer").hide();
        $(".setupSectionEl").removeClass('is-hidden');
        $(".setupSectionEl").addClass('is-flex');
        $('.finishBtn').show();
        startSetup();
    } else {
        alert('You must save the workouts before moving to the setup.');
    }
})

//Quick Search button function to search a workout for the user
$('.quickSearchToggle').click(function () {
    $(".quick").toggle();
    $("#intensityCriterias").toggle();
    if (counter === 0) {
        counter = 1;
    } else {
        counter = 0;
    }
})

//button to save program into local storage which will then display the session form
$(".finishBtn").submit((event) => {
    $('.sessionModel').show();
    finishSetup();
    event.preventDefault();
});

//button to remove whats saved in the exercise section
$(".removeBtn").click(function () {
    localStorage.setItem("workouts", '');
    $('.savedExerciseSection').empty();
    $(".setupSectionEl").hide();
});

//button to hide the exercise modals and contents inside it
$('.delete, .cancelBtn').click(function () {
    $(".modal").hide();
    $('.finishBtn').hide();
    $(".setupSectionEl").removeClass('is-flex');
    $(".setupSectionEl").addClass('is-hidden');
});

//button to save all inputted info from the user's session to the database
$(".save_db").submit(async (e) => {
    saveToDB();
    e.preventDefault();
});

//Displays the exercises once the user inputs them
async function exerciseSearch() {
    $('.exerciseSelections').empty();
    $('.modal').show();
    //requests the exercises from the API once defined
    let requestUrl = '';
    if (counter === 0) {
        //looks at the users intensity level and muscle they want to target
        let intensityValue = $("#intensitySelectionEl").val();
        let muscleValue = $("#muscleSelectionEl").val();
        //Variable to add the combo between instensity and muscle group
        let intensityAnd = '';
        //add section to URL depending on user input
        if (muscleValue.length) {
            requestUrl = 'muscle=' + muscleValue;
            intensityAnd = '&';
        }
        if (intensityValue.length) {
            requestUrl = requestUrl + intensityAnd + 'difficulty=' + intensityValue;
        }

    } else {
        let nameValue = $('.search-bar').val();
        requestUrl = `name=${nameValue}`;
    }

    //Takes the user data input and sends an api request
    let data = await helpers.getData(`/api/exercise/${requestUrl}`);

    //Error message gets shown if the API cant find the exercise
    if (data.length === 0) {
        $('.exerciseSelections').text("No Results Found, Please Try Again")
        return
    }
    //Returns input selectors from the data within the modal
    for (let i = 0; i < data.length; i++) {
        let name = data[i].name
        let equipment = data[i].equipment
        let instructions = data[i].instructions

        //Results get displayed
        let results = $(`<input type="radio" name="result" 
                data-name="${name}" data-equipment="${equipment}" data-instructions="${instructions}"/>
                <span>${name}</span>
                    <button class="moreBtn">
                      Instructions
                  </button>
                  <div class='moreInfo'>  
                      <p><u><b><span>Equipment:</span></b></u>&nbsp;${equipment}</p>
                      <p><u><b><span>Instructions:</span></b></u></p>
                      <p>${instructions}</p>
                      </div>`);

        //Can change the workout by appending the other results
        results.on("change", saveworkout)
        $('.exerciseSelections').append(results)
    }
}

//Once the different exercise programs are added by the user, theyre able to select which one they want to do
async function displayProgramOptions() {
    try {
        let url = '/api/program/';
        let response = await helpers.getData(url);
        $('.programOptionSelectEl').empty();
        let optionEl = '';
        for (let i = 0; i < response.length; i++) {
            optionEl += `<option value="${response[i].id}">${response[i].program_name}</option>`;
        }
        $('.programOptionSelectEl').append(optionEl);
    }
    catch {
        console.log('failure');
    }
}

//function to save the workouts to the local storage
function saveworkout() {
    let workouts = [];
    let priorWorkouts = localStorage.getItem("workouts");
    if (priorWorkouts) {
        workouts = JSON.parse(localStorage.getItem("workouts"));
    }

    //The function has an object which can retrieve specific dataset information
    let workout = {
        name: this.dataset.name,
        equipment: this.dataset.equipment,
        instructions: this.dataset.instructions,
    }
    workouts.push(workout);
    //in order for the workouts to be saved, the save button must be clicked
    $(".exerciseSaveBtn").on("click", function () {
        localStorage.setItem("workouts", JSON.stringify(workouts));
        $('.savedExerciseSection').show();
        $('.savedExercisesContainer').show();
        displayWorkout();
    })
}

//workouts are displayed in the saved exercise section. Theyre retrived from the local storage
function displayWorkout() {
    $('.savedExerciseSection').empty();
    let workouts = [];
    let priorWorkouts = localStorage.getItem("workouts");
    if (priorWorkouts) {
        workouts = JSON.parse(localStorage.getItem("workouts"));
    }
    for (let i = 0; i < workouts.length; i++) {
        let name = workouts[i].name
        let results = $(`<div><h5>${name}</h5></div>`);
        $('.savedExerciseSection').append(results);
    }
}

//function to display which requests for input from the user to complete the setup
function startSetup() {
    $('.setupSectionEl').empty();
    let workouts = [];
    let priorWorkouts = localStorage.getItem("workouts");
    if (priorWorkouts) {
        workouts = JSON.parse(localStorage.getItem("workouts"));
    }
    let programName = `<input id="workoutName" type="text" placeholder="Workout Name" required>`;
    $('.setupSectionEl').append(programName);
    for (let i = 0; i < workouts.length; i++) {
        let name = workouts[i].name;
        //Results of user input is displayed here
        let results = $(`<div class='setupInputs'><h5 class='exerciseName'>${name}</h5></div>
        <span>
        <label for="${i}Set">Set</label>
        <input placeholder="3" id="${i}Set" type="number" min="0" required>
        </span>
        <span>
        
        <label for="${i}Reps">Reps&nbsp;</label>
        <input placeholder="10" id="${i}Reps" type="number" min="0" required>
        </span>
        <span>
        <label for="${i}Weight">Weight</label>
        <input placeholder="lbs" id="${i}Weight" type="number" min="0" required>
        </span>
        <span>
        <label for="${i}Type">Equipment Type</label>
        <select id="${i}Type" name="typeOSU" required>
                <option value="Barbell">Barbell</option>
                <option value="Cable">Cable</option>
                <option value="Dumbbell">Dumbbell</option>
                <option value="Machine">Machine</option>
        </select>
        </span>
        </br>`);
        $('.setupSectionEl').append(results);
    }
}

//function to save the new workout to the local storage. Then it gets displayed
async function finishSetup() {

    let exerciseInfo = JSON.parse(localStorage.getItem("workouts"));
    let programName = $('#workoutName').val();
    let programObject = {
        program_name: programName
    };
    //fetch request to set the correct program name and get the id
    let postUrl = `/api/program/`;
    let response = await helpers.postData(postUrl, programObject);
    let programId = response.id;
    let programWorkoutsArray = [];

    //saves all of the user's inputs into an array of objects
    for (let i = 0; i < exerciseInfo.length; i++) {
        let programWorkoutObject = {
            program_id: programId,
            exercise_name: exerciseInfo[i].name,
            set_amount: $(`#${i}Set`).val(),
            rep_amount: $(`#${i}Reps`).val(),
            weight: $(`#${i}Weight`).val(),
            weight_type: $(`#${i}Type`).val(),
            user_id: ""
        }
        programWorkoutsArray.push(programWorkoutObject);
    }
    //Uses a fetch request to save array of objects into the database 
    let programUrl = `/api/program/wkts/`;
    let workoutResponse = await helpers.postData(programUrl, programWorkoutsArray);
    console.log(workoutResponse);
    $('.modal').hide();
}

//function used to display the  new program created to the main exercise section
async function displaySetupWorkout() {
    console.log('inFunction');
    $('.exerciseName').empty();
    $('.openExerciseLog').empty();
    $('.trainingTable').empty();
    $('.sessionModel').show();
    let logSection = $('.exerciseLog');
    logSection.empty();

    let programId = $('.programOptionSelectEl').val();
    console.log(programId);
    let url = `/api/program/id/${programId}`;
    let response = await helpers.getData(url);
    console.log(response);

    //Appends the program to the display so the user could look at the sets, reps, weight type and comments
    logSection.append($(`<div><h3 class='program'>${response.program_name}</h3></div>`));
    for (let i = 0; i < response.programWorkouts.length; i++) {
        logSection.append($(`<br><h4 class='exerciseName' id="workout${i}">${response.programWorkouts[i].exercise_name}</h4>`));
        let workoutPlanTable = $('<table class="trainingTable">');
        let tableHeader = $(`<tr>
        <th>Set</th>
        <th>Reps</th>
        <th>Weight</th>
        <th>Type</th>
        <th>Comments</th>
    </tr>`);
        workoutPlanTable.append(tableHeader);
        for (let e = 0; e < response.programWorkouts[i].set_amount; e++) {
            let tableRow = $(`<tr>
            <td class='set${i} set${i}${e}' id='set${i}${e}'>${e + 1}</td>
            <td><input id='reps${i}${e}' type="number" min="0" size="8" placeholder="${response.programWorkouts[i].rep_amount}" required></td>
            <td><input id='weight${i}${e}' type="number" min="0" size="8" placeholder="${response.programWorkouts[i].weight}" required></td>
            <td>
                <select id='type${i}${e}' class='text' name="typeOSU">
                    <option value="${response.programWorkouts[i].weight_type}">${response.programWorkouts[i].weight_type}</option>
                    <option value="Barbell">Barbell</option>
                    <option value="Cable">Cable</option>
                    <option value="Dumbbell">Dumbbell</option>
                    <option value="Machine">Machine</option>
                </select>
            </td>
            <td><input id='comments${i}${e}' class='text' size="8" type="text"></td>
        </tr>`)
            workoutPlanTable.append(tableRow);
        }
        logSection.append(workoutPlanTable);
    }

}

//function to save all information to the database
async function saveToDB() {
    try {
        let selectedDate = $(".date").val();
        let userSessionObject = {
            date: selectedDate
        }
        let postUrl = `/api/session/`;
        let response = await helpers.postData(postUrl, userSessionObject);
        let id = response.id;
        let workoutSessionArray = [];
        for (let i = 0; i < $(".trainingTable").length + 1; i++) {
            for (let e = 0; e < $(`.set${i}`).length; e++) {
                let exercise_name = document.getElementById(`workout${i}`);
                let set_number = document.getElementById(`set${i}${e}`);
                let rep_amount = $(`#reps${i}${e}`).val();
                let weight = $(`#weight${i}${e}`).val();
                let weight_type = $(`#type${i}${e}`).val();
                let comments = $(`#comments${i}${e}`).val();
                let workoutSessionEl = {
                    session_id: id,
                    exercise_name: exercise_name.textContent,
                    set_number: set_number.textContent,
                    rep_amount: rep_amount,
                    weight: weight,
                    weight_type: weight_type,
                    comments: comments,
                    user_id: ""
                }
                workoutSessionArray.push(workoutSessionEl);
            }
        }
        console.log(workoutSessionArray);
        //push the workouts to the database
        let workoutUrl = `/api/session/wkts/`;
        let another = await helpers.postData(workoutUrl, workoutSessionArray);
        //Alerts the user the workout is saved
        if (another) {
            alert("Workout is Saved Succesfully");
        }
        //error message if anything is wrong
    }
    catch (err) {
        console.log(err);
    }
}

function init() {
    let programValidateCheck = JSON.parse(localStorage.getItem("setupWorkout"));
    if (programValidateCheck) {
        $('.sessionModel').show();
    }
}

init();
