// setup navbar to show links based on auth state
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const profileDetails = document.querySelector('.profile-details');

const setupUI = (user) => {
    if (user) {
        // profile info
        const html = `
            <div>Logged in as ${user.email}</div>        
        `;
        //profileDetails.innerHTML = html;
        // toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        // hide profile details
        //profileDetails.innerHTML = '';
        // toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}
// setup closure of the modal
const regButton = $('#lg-reg');
const logButton = $("#lg-log");

function closeRegModal() {
    regButton.attr("data-dismiss", "modal");
    regButton.trigger('click');
    regButton.removeAttr("data-dismiss", "modal");
}

function closeLogModal() {
    logButton.attr("data-dismiss", "modal");
    logButton.trigger('click');
    logButton.removeAttr("data-dismiss", "modal");
}
