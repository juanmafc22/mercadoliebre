const form = document.getElementById("form");
const fullname = document.getElementById("fullname");
const username = document.getElementById("username");
const email = document.getElementById("email");
const birthday = document.getElementById("birthday");
const foto = document.getElementById("profilePic");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");


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
        showError(fullname, "Ingrese su nombre completo");
    } else if (fullname.value.length > 0 && fullname.value.length < 5) {
        showError(fullname, `De verdad su nombre completo solo tiene ${fullname.value.length} caracteres?`);
    } else {
        showSuccess(fullname);
    }

    
    if (username.value === "") {
        showError(username, "Ingrese su nombre de usuario")
    } else if (username.value.length > 0 && username.value.length < 8) {
        showError(username, "El nombre de usuario debe tener por lo menos 8 caracteres")
    } else {
        showSuccess(username);
    }
    

    if (email.value === "") {
        showError(email, "Ingrese una dirección de email")
    } else if (!isValidEmail(email.value)) {
        showError(email, "La dirección de email no es válida")
    } else {
        showSuccess(email);
    }

    if (birthday.value === "") {
        showError(birthday, "Ingrese su fecha de nacimiento");
    } else {
        showSuccess(birthday);
    }

    if (profilePic.value === "") {
        showError(profilePic, "Suba una foto perfil en formato .jpg, .jpeg o .png");
    } else {
        showSuccess(profilePic);
    }

    if (password.value === "") {
        showError(password, "Ingrese una contraseña")
    } else if (password.value.length > 0 && password.value.length < 8) {
        showError(password, "La contraseña debe tener por lo menos 8 caracteres")
    } else {
        showSuccess(password);
    }

    if (password2.value === "") {
        showError(password2, "Repita la misma contraseña")
    } else if (password.value != password2.value) {
        showError(password2, "Las contraseñas no coinciden")
    } else {
        showSuccess(password2);
    }
    
});