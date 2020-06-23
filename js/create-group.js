// create group name
// const createForm = document.querySelector('#create-group');
// createForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     groupname = $('#groupname').val().trim();
//     db.ref('groups/').set({
//         groupname: groupname
//     });
// });

// add members to the group
const createMembers = document.querySelector('#create-members');
createMembers.addEventListener('submit', (e) => {
    e.preventDefault();
    groupname = $('#groupname').val().trim();
    name = $("#membername").val().trim();
    email = $("#memberemail").val().trim();
    city = $("#membercity").val().trim();
    state = $("#memberstate").val().trim();

    db.ref('groups/').push({
        groupname: groupname,
        member: name,
        email: email,
        city: city,
        state: state
    });
});