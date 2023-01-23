const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();
  // let verificationCode;
  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  console.table({ name, email, password });
  const rePass = document.querySelector('#passRetype').value.trim();
  if (password !== rePass) {
    alert('Passwords do not match. Please try again.');
    return;
  }

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        name: name?.trim(),
        email: email?.trim(),
        password: password?.trim(),
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      let verificationCode;
      while (verificationCode == null)
        verificationCode = prompt(
          'An email has been sent with a verification code. Please enter code to verify your account.'
        );

      if (verificationCode) {
        const verifiedResponse = await fetch('/api/users/verify', {
          method: 'POST',
          body: JSON.stringify({
            name: name?.trim(),
            email: email?.trim(),
            password: password?.trim(),
            uuid: verificationCode?.trim(),
          }),
          headers: { 'Content-Type': 'application/json' },
        });
        // const userCode = await fetch('/api/users/verify', {
        //   method: 'GET',
        //   body: JSON.stringify({

        //   })
        // });
        if (verifiedResponse) {
          alert('Your email has been verified! Redirecting to the homepage.');
          document.location.replace('/');
        } else {
          alert(
            'Verification failed! Please try verification at another time. REdirecting to the homepage.'
          );
          document.location.replace('/');
        }
      }

      // if true, document.location.replace('/calendar');
      // if false, alert("verification failed") document.location.replace('/calendar');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
