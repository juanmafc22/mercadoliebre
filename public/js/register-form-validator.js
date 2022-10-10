const form = document.getElementById("form");
const fullname = document.getElementById("fullname");
const username = document.getElementById("username");
const email = document.getElementById("email");
const typeOfUser = document.getElementById("typeOfUser");
const password = document.getElementById("password");


// Show error messages
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = "form-control error";
    const small = formControl.querySelector("small");
    small.innerText = message
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

// Show valid email
function isValidEmail(email) {
    const re = /^.+@.+\..+$/;
    return re.test(String(email).toLowerCase());
}

// event listener for the submit of the forms
form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (fullname.value === "") {
        showError(fullname, "Se requiere su nombre completo");
    } else if (fullname.value.length > 0 && fullname.value.length < 5) {
        showError(fullname, `No sea tramposo, de verdad su nombre completo solo tiene ${fullname.value.length} caracteres?`);
    } else {
        showSuccess(fullname);
    }

    
    if (username.value === "") {
        showError(username, "Se requiere nombre de usuario")
    } else if (username.value.length > 0 && username.value.length < 8) {
        showError(username, "El nombre de usuario debe tener por lo menos 8 caracteres")
    } else {
        showSuccess(username);
    }
    

    if (email.value === "") {
        showError(email, "Se requiere una dirección de email")
    } else if (!isValidEmail(email.value)) {
        showError(email, "La dirección de email no es válida")
    } else {
        showSuccess(email);
    }

    if (birthdate.value === "") {
        showError(birthdate, "Se requiere una fecha de nacimiento");
    } else {
        showSuccess(birthdate);
    }


    if (password.value === "") {
        showError(password, "Debe ingresar su contraseña")
    } else if (password.value.length > 0 && password.value.length < 8) {
        showError(password, "La contraseña debe tener por lo menos 8 caracteres")
    } else {
        showSuccess(password);
    }
    
});