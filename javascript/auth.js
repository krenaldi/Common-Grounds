const regButton = $('#lg-reg');
//console.log(regButton);
const logButton = $("#lg-log");

function closeRegModal(){
    regButton.attr("data-dismiss", "modal");
    regButton.trigger('click');
    regButton.removeAttr("data-dismiss", "modal");
}

function closeLogModal(){
    logButton.attr("data-dismiss", "modal");
    logButton.trigger('click');
    logButton.removeAttr("data-dismiss", "modal");
}

// signup
const registerForm = document.querySelector('#register-form');
// console.log("Hello");
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log("Hello again");
    // get user info
    const email = registerForm['reg-email'].value;
    const password = registerForm['reg-password'].value;
    
    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
        // reset form
        registerForm.reset();
    });
    closeRegModal();
});