# The Fitness Zone

  ## Description
  The Fitness Zone is a full stack web application that allows users to find and add workouts to their schedule, with the additional option to calculate your body mass index (BMI). To access the site's functionality, user authentication is required. 

  ## Table of Contents
  * [Description](#description)
  * [Table of Contents](#table-of-contents)
  * [User Story](#user-story)
  * [Technologies](#technologies)
  * [Installation and Usage](#installation-and-usage)
  * [Application](#application)
  * [Contributions](#contributions)
  * [Tests](#tests)
  * [Questions](#questions)
  * [Deployed Links](#deployed-links)

  ## User Story
  * AS a fitness enthusiast, 
  * I WANT to create/view a list of workout programs
  * SO THAT I can schedule my workout routine
  
  ## Technologies
  To create the front end and back end of the application, we used an assortment of technologies:
  * Heroku
  * MySQL
  * Sequelize ORM
  * Ninja API
  * NodeMailer
  * BCrypt
  * Handlebars
  * Node JS/Express.js
  
  ## Installation and Usage
  You can clone the repository using the git clone command in your terminal. It is also important to remember to install dependencies, use MySQL to create the database, and then run the server. 
  1. git clone https://github.com/aramic11/workout-app.git
  2. npm i
  3. mysql -uroot < db/schema.sql
  4. node server.js

  ## Application

  Expanding off of usage, here is a step-by-step guide to using the application. 

  ![Login]()
  The login page has both a login and signup form. The signup form requires email verification to create the account. On any other page, if you press logout, you will be redirected to the login page. <br>
  ![Homepage]()
  The homepage provides a brief description of the site, with a navigation bar that goes to other pages (navigation bar on all pages).<br>
  ![Exercise]()
  On the exercise screen, you are presented with an example of what you can do with the page functionality. <br>
  ![ExerciseSelection]()
  When you hit "Create New Program", you enter a modal that allows you to search for a workout based on the dropdown options. You are able to search through a series of workouts categorized by muscle group, where you can choose reps, weights, weight type, and sets. Once you've created the program, you can select the program on the Exercise page and a session date to save all the information to the database. <br>
  ![Schedule]()
  On the schedule page, you can view all of your scheduled workouts. It will display all related attributes such as weight type and reps, and you have the option to remove the workout from your schedule. <br>
  ![BMI]()
  An additional function of the application is a BMI calculator page where users can calculate their BMI according to weight and height. <br>

  ## Contributions

  Visit the public repository on Github to make pull requests or message on of our team with possible changes or concerns you find. 

  ## Credits

  Special thanks to the great team of people working on this:
  * [Ahmed Ramic](https://github.com/aramic11)
  * [Connor Bazil](https://github.com/cbazil114)
  * [Mitchel Busnel](https://github.com/average-android)
  * [Noah Cote](https://github.com/NoahCote10)
  
  ## Questions

  If you have and questions or comments, reach out to one of our team members at their respective Github pages in the credit links!

  ## Deployed Links
  * [Github](https://github.com/aramic11/workout-app)
  * [Heroku](https://mighty-inlet-17491.herokuapp.com)
 
