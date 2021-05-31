$(".txtRojo").hide();
var emailCorrect = false;
var passwordCorrect = false;

$("#formLogIn").on("submit", (event) => {
    event.preventDefault();

    if (emailCorrect == true && passwordCorrect == true) {
        $("#mensajeError").fadeOut();


        data = $("form").serializeArray();
        console.log(data);

        const email = data[0].value;
        const password = data[1].value;

        auth.signInWithEmailAndPassword(email, password).then(userCredential => {
            location.href = "panel.html"
        }).catch(error => {
            var errorMessage = error.message;
            $("#mensajeError").text(errorMessage);
            $("#mensajeError").fadeIn();
        });
    } else {
        $("#mensajeError").text("Revisa los campos");
        $("#mensajeError").fadeIn();
    }

});


// Validaciones

$("#email").blur(() => {
    var estado = checkEmail();
    if (estado) {
        $("#emailText").hide();
        $("#email").removeClass("border-invalid");
        emailCorrect = true;
    } else {
        $("#emailText").show();
        $("#email").addClass("border-invalid");
        emailCorrect = false;
    }
});

$("#password").blur(() => {
    var estado = checkPassword();
    if (estado) {
        $("#passwordText").hide();
        $("#password").removeClass("border-invalid");
        passwordCorrect = true;
    } else {
        $("#passwordText").show();
        $("#password").addClass("border-invalid");
        passwordCorrect = false;
    }
});

function checkEmail() {
    var pattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
    var inputEmail = $("#email").val();
    var estado = true;

    if (pattern.test(inputEmail) && inputEmail !== "") {
        estado = true;
    } else {
        estado = false;
    }

    return estado;
}

function checkPassword() {
    var pattern = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/;
    var inputPassword = $("#password").val();
    var estado = true;

    if (pattern.test(inputPassword) && inputPassword !== "") {
        estado = true;
    } else {
        estado = false;
    }

    return estado;
}