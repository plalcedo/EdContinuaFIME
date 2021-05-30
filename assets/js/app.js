// Catálogo de diplomados
var diplomados = {
    0: {
        nombre: "Diplomado en Automatización",
        descripcion: "El alumno aprenderá acerca de la automatización."
    },
    1: {
        nombre: "Diplomado en Base de Datos",
        descripcion: "El alumno aprenderá acerca de las bases de datos."
    },
    2: {
        nombre: "Diplomado en Calidad Total y Mejora Continua",
        descripcion: "El alumno aprenderá acerca de la calidad y la mejora continua."
    },
    3: {
        nombre: "Diplomado en Herramientas de Diseño",
        descripcion: "El alumno aprenderá acerca de las herramientas de diseño."
    },
    4: {
        nombre: "Diplomado en ITIL",
        descripcion: "El alumno aprenderá acerca de ITIL"
    }
}

// Catálogo de Educación Técnica
var tecnicas = {
    0: {
        nombre: "Técnico en automotriz y diésel",
        descripcion: "El alumno aprenderá sobre automotriz y diésel."
    },
    1: {
        nombre: "Técnico en control numérico computarizado",
        descripcion: "El alumno aprenderá sobre control númerico computarizado."
    },
    2: {
        nombre: "Técnico en paquetería computacional",
        descripcion: "El alumno aprenderá sobre paquetería computacional."
    },
    3: {
        nombre: "Técnico en refrigeración y calefacción industrial",
        descripcion: "El alumno aprenderá sobre refrigeración y calefacción industrial."
    },
    4: {
        nombre: "Técnico desarrollador de software",
        descripcion: "El alumno aprenderá sobre el desarrollo de software."
    },
    5: {
        nombre: "Técnico industrial en electricidad y electrónica especializada",
        descripcion: "El alumno aprenderá sobre electricidad y electrónica especializada."
    }
}


// ---------------------------------------------------- PROGRAMACIÓN DE MOSTRAR LOS CURSOS ---------------------------------------------------- //


var tableBody = document.getElementById("tableBody");
$(".tablaCursos").hide();

$("#btnDiplomados").click(() => {
    $(".tablaCursos").show();
    vaciarTabla();
    cargarDiplomados();
});

$("#btnEdCont").click(() => {
    $(".tablaCursos").show();
    vaciarTabla();
    cargarEdCont();
});


function vaciarTabla() {
    $("#tableBody tr").remove();
}

function cargarDiplomados() {

    var tablaDiplomados = "";

    for (const diplomado in diplomados) {
        tablaDiplomados = `
                            <tr>
                                <td>${diplomados[diplomado].nombre}</td>
                                <td>${diplomados[diplomado].descripcion}</td>
                                <td><button class="btnVerdes" onclick="enviarCurso('${diplomados[diplomado].nombre}')">Registro</button></td>
                                <td><button class="btnVerdes">Información</button></td>
                            </tr>
                        `;
        tableBody.innerHTML += tablaDiplomados;
    }

}


function cargarEdCont() {

    var tablaTecnicas = "";

    for (const tecnica in tecnicas) {
        tablaTecnicas = `
                            <tr>
                                <td>${tecnicas[tecnica].nombre}</td>
                                <td>${tecnicas[tecnica].descripcion}</td>
                                <td><button class="btnVerdes" onclick="enviarCurso('${tecnicas[tecnica].nombre}')">Registro</button></td>
                                <td><button class="btnVerdes">Información</button></td>
                            </tr>
                        `;
        tableBody.innerHTML += tablaTecnicas;
    }

}


function enviarCurso(curso) {
    location.href = "#formulario";
    console.log(curso);

    switch (curso) {
        case 'Diplomado en Automatización':
            {
                $("#curso").val(1);
                break;
            }
        case 'Diplomado en Base de Datos':
            {
                $("#curso").val(2);
                break;
            }
        case 'Diplomado en Calidad Total y Mejora Continua':
            {
                $("#curso").val(3);
                break;
            }
        case 'Diplomado en Herramientas de Diseño':
            {
                $("#curso").val(4);
                break;
            }
        case 'Diplomado en ITIL':
            {
                $("#curso").val(5);
                break;
            }
        case 'Técnico en automotriz y diésel':
            {
                $("#curso").val(6);
                break;
            }
        case 'Técnico en control numérico computarizado':
            {
                $("#curso").val(7);
                break;
            }
        case 'Técnico en paquetería computacional':
            {
                $("#curso").val(8);
                break;
            }
        case 'Técnico en refrigeración y calefacción industrial':
            {
                $("#curso").val(9);
                break;
            }
        case 'Técnico desarrollador de software':
            {
                $("#curso").val(10);
                break;
            }
        case 'Técnico industrial en electricidad y electrónica especializada':
            {
                $("#curso").val(11);
                break;
            }
    }
}

// ---------------------------------------------------- PROGRAMACIÓN DE MOSTRAR LOS CURSOS ---------------------------------------------------- //


// -------------------------------------------------- PROGRAMACIÓN DE FORMULARIO DE REGISTRO -------------------------------------------------- //

$(".txtRojo").hide();
$(".txtGreen").hide();
$(".check").hide();
$("#btnOtro").hide();


var nameCorrect = false;
var emailCorrect = false;
var cursoCorrect = false;
var phoneCorrect = false;
var ageCorrect = false;

// Creamos la referencia a la base de datos
const db = firebase.firestore();

// Evento del botón del formulario

$("form").on("submit", async(event) => {
    event.preventDefault();


    // Validaciones

    // Validación de Términos y Condiciones
    if ($("#checkTyC").is(":checked")) {
        $("#mensajeAlerta").hide();
        $("#mensajeAlerta").text("");

        // Validación de campos
        if (nameCorrect == true && emailCorrect == true && ageCorrect == true && phoneCorrect == true) {
            $("#mensajeAlerta").hide();
            $("#mensajeAlerta").text("");

            // Validación de curso elegido
            var data = $("form").serializeArray();
            console.log(data);

            if (data[3].value == "0") {
                console.log("Debes elegir un curso");
                $("#mensajeAlerta").show();
                $("#mensajeExitoso").hide();
                $("#mensajeAlerta").text("Debes elegir un curso");
            } else {
                // REGISTRAMOS EN LA BASE DE DATOS

                const name = $("#name").val();
                const email = $("#email").val();
                const age = $("#age").val();
                const curso = $("#curso").val();
                const phone = $("#phone").val();

                db.collection('alumnos').doc().set({
                    name,
                    email,
                    age,
                    curso,
                    phone
                });

                // Se muestra el mensaje de éxito
                $("#mensajeAlerta").hide();
                $("#mensajeAlerta").text("");
                $("form").fadeOut();

                setTimeout(() => {
                    $("#mensajeExitoso").fadeIn();
                    $(".check").fadeIn();
                    $("#btnOtro").fadeIn();
                }, 200);

                $("#btnOtro").click(() => {
                    $("#mensajeExitoso").fadeOut();
                    $(".check").fadeOut();
                    $("#btnOtro").fadeOut();
                    $("form").trigger("reset");
                    $("form").fadeIn();
                });
            }

        } else {
            console.log("Revisa los campos");
            $("#mensajeAlerta").show();
            $("#mensajeExitoso").hide();
            $("#mensajeAlerta").text("Revisa los campos");
        }
    } else {
        console.log("Debes aceptar los términos y condiciones");
        $("#mensajeAlerta").show();
        $("#mensajeExitoso").hide();
        $("#mensajeAlerta").text("Debes aceptar los términos y condiciones");
    }
});

// Validación de los campos

$("#name").blur(() => {
    var estado = checkName();
    if (estado) {
        $("#nameText").hide();
        $("#name").removeClass("border-invalid");
        nameCorrect = true;
    } else {
        $("#nameText").show();
        $("#name").addClass("border-invalid");
        nameCorrect = false;
    }
});
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
$("#age").blur(() => {
    var estado = checkAge();
    if (estado) {
        $("#ageText").hide();
        $("#age").removeClass("border-invalid");
        ageCorrect = true;
    } else {
        $("#ageText").show();
        $("#age").addClass("border-invalid");
        ageCorrect = false;
    }
});
$("#phone").blur(() => {
    var estado = checkPhone();
    if (estado) {
        $("#phoneText").hide();
        $("#phone").removeClass("border-invalid");
        phoneCorrect = true;
    } else {
        $("#phoneText").show();
        $("#phone").addClass("border-invalid");
        phoneCorrect = false;
    }
});

function checkName() {
    var pattern = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g;
    var inputName = $("#name").val();
    var estado = true;

    if (pattern.test(inputName) && inputName !== "") {
        estado = true;
    } else {
        estado = false;
    }

    return estado;
}

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

function checkPhone() {
    var pattern = /^[0-9]*$/;
    var inputPhone = $("#phone").val();
    var estado = true;

    if (pattern.test(inputPhone) && inputPhone !== "") {
        estado = true;
    } else {
        estado = false;
    }

    return estado;
}

function checkAge() {
    var pattern = /^[0-9]*$/;
    var inputAge = $("#age").val();
    var estado = true;

    if (pattern.test(inputAge) && inputAge !== "") {
        estado = true;
    } else {
        estado = false;
    }

    return estado;
}