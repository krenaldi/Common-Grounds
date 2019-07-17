// signup
const registerForm = document.querySelector('#register-form');
registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = registerForm['reg-email'].value;
  const password = registerForm['password'].value;

  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    console.log(cred.user);
    // close the signup modal & reset form
    document.querySelector('#modal').close();
    registerForm.reset();
  });
});