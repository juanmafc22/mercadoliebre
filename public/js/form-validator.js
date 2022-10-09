const form = document.getElementById("form");
const username = document.getElementById("username");
const password = document.getElementById("password");

// Show error messages
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector('small');
    small.innerText = message
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

// event listener for the submit of the forms
form.addEventListener('submit', function(event) {
    event.preventDefault();

    if (username.value === '') {
        showError(username, 'Se requiere nombre de usuario, no puede estar vacío')
    } else if (username.value.length > 0 && username.value.length < 8) {
        showError(username, 'El nombre de usuario debe tener por lo menos 8 caracteres')
    }
    else {
        showSuccess(username);
    }
})
