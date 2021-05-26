$(".txtRojo").hide();
var emailCorrect = false;
var passwordCorrect = false;

$("form").on("submit", (event) => {
    event.preventDefault();

    if (emailCorrect == true && passwordCorrect == true) {

        data = $("form").serializeArray();
        console.log(data);

        // SIMULACIÓN DE INICIO DE SESIÓN 
        // FALTA REALIZAR LA CONEXIÓN A LA BD

        if (data[0].value == "admin@fime.com" && data[1].value == "admin") {
            $("#mensajeError").fadeOut();
            location.href = "panel.html";
        } else {
            $("#mensajeError").fadeIn();
        }
    } else {
        $("#mensajeError").fadeIn();
    }
    // Validaciones

});



$("#email").blur(() => {
    var estado = checkFields();
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
    var estado = checkFields();
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

function checkFields() {
    var pattern = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
    var inputEmail = $("#email").val();
    var estado = true;

    if (pattern.test(inputEmail) && inputEmail !== "") {
        console.log("Email válido");
        estado = true;
    } else {
        console.log("Email inválido");
        estado = false;
    }

    return estado;
}