// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user);
        setupUI(user);
        // get data from firebase db
        db.ref().on('value', function (snapshot) {
            console.log(snapshot.val());
            // create error handling
        }, function (errorObject) {
            console.log('Reading db failed: ' + errorObject.code);
        });
    } else {
        console.log('user logged out');
        setupUI();
    }
});



// signup
const registerForm = document.querySelector('#register-form');
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // get user info
    const email = registerForm['reg-email'].value;
    const password = registerForm['reg-password'].value;

    // sign up the user
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.ref('users/' + cred.user.uid).set({
            displayname: registerForm['displayName'].value,
            city: registerForm['city'].value,
            state: registerForm['reg-state'].value
        });
    }).then(() => {
        // reset form
        registerForm.reset();
        registerForm.querySelector('.reg-error').innerHTML = '';
        // close modal
        closeRegModal();
    }).catch(err => {
        registerForm.querySelector('.reg-error').innerHTML = err.message;
    });
    // redirect user to create group page
    window.location.replace("group.html");
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
    // redirect user to homepage on logout
    window.location.replace("index.html");
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        //console.log(cred.user);
        // reset form
        loginForm.reset();
        loginForm.querySelector('.login-error').innerHTML = ''; 
        // close modal
        closeLogModal();
    }).catch(err => {
        loginForm.querySelector('.login-error').innerHTML = err.message;    
    });
    // redirect user to search page
    window.location.replace("search.html");
});
