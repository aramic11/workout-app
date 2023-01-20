look up node mailer
-send email to self to prove it works

add new column to user model called verifyEmail
-add a hook to save UUID to user's email
-add boolean isEmailVerified to start as false, changes to tru when verify is completed

when user signs up, model appears with "email has been sent"
-input box for UUID
-request to back end to get random string from db and email it to user
--when user types in string, db checks string, shows error if incorrect
-add verify later button

stretch goal:
add verify email to logout dropdown for if the click verify email (opens model)
add isEmailVerified to the session
