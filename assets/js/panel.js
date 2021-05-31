const db = firebase.firestore();

var tableDiplomados = document.getElementById("tableBodyDiplomados");
var tableTecnicas = document.getElementById("tableBodyTecnicas");
var alumnoDiplomados = "";
var alumnoTecnicas = "";

$("#btnModal").css('cursor', 'pointer');
$("#logOut").css('cursor', 'pointer');
$(".txtRojo").hide();
$(".txtVerde").hide();


window.addEventListener('DOMContentLoaded', async(e) => {

    auth.onAuthStateChanged(async user => {
        console.log("Hubo en cambio en el Auth");
        tableDiplomados.innerHTML = '';
        tableTecnicas.innerHTML = '';
        if (user) {
            /* Traemos el arreglo de alumnos */
            const querySnapshot = await db.collection('alumnos').get();

            // Consultamos y llenamos la tabla
            consultarAlumnos(querySnapshot);

            // Eliminar a un alumno
            const btnEliminar = document.querySelectorAll(".btnDelete");
            btnEliminar.forEach(btn => {
                btn.addEventListener('click', async(e) => {
                    id = e.target.dataset.id;
                    await db.collection('alumnos').doc(id).delete();
                    location.reload();
                });
            });
        } else {
            location.href = "admin.html";
        }
    });

});

function consultarAlumnos(querySnapshot) {
    querySnapshot.forEach(doc => {
        var nombre = doc.data().name;
        var edad = doc.data().age;
        var telefono = doc.data().phone;
        var correo = doc.data().email;
        var numCurso = Number(doc.data().curso);
        var curso = definirCurso(numCurso);
        var id = doc.id;

        // Definimos en que tabla va el alumno
        // 1 - 5 Diplomados, 6 - 11 Técnicas

        if (numCurso < 6) {
            // Va en diplomados
            alumnoDiplomados = `
                                <tr>
                                    <td>${nombre}</td>
                                    <td>${edad}</td>
                                    <td>${telefono}</td>
                                    <td>${correo}</td>
                                    <td>${curso}</td>
                                    <td><button class="btnRojos btnDelete" data-id="${id}">X</td>
                                </tr>
                                `;
            tableDiplomados.innerHTML += alumnoDiplomados;
        }

        if (numCurso > 5) {
            // Va en técnicas
            alumnoTecnicas = `
                            <tr>
                                <td>${nombre}</td>
                                <td>${edad}</td>
                                <td>${telefono}</td>
                                <td>${correo}</td>
                                <td>${curso}</td>
                                <td><button class="btnRojos btnDelete" data-id="${id}">X</td>
                            </tr>
                            `;
            tableTecnicas.innerHTML += alumnoTecnicas;
        }

    });
}



function definirCurso(numCurso) {
    // Hacemos un switch con el número del curso para retornarlo como String
    var curso = "";
    switch (numCurso) {
        case 1:
            {
                curso = "Diplomado en Automatización";
                break;
            }
        case 2:
            {
                curso = "Diplomado en Base de Datos";
                break;
            }
        case 3:
            {
                curso = "Diplomado en Calidad Total y Mejora Continua";
                break;
            }
        case 4:
            {
                curso = "Diplomado en Herramientas de Diseño"
                break;
            }
        case 5:
            {
                curso = "Diplomado en ITIL";
                break;
            }
        case 6:
            {
                curso = "Técnico en automotriz y diésel";
                break;
            }
        case 7:
            {
                curso = "Técnico en control numérico computarizado";
                break;
            }
        case 8:
            {
                curso = "Técnico en paquetería computacional";
                break;
            }
        case 9:
            {
                curso = "Técnico en refrigeración y calefacción industrial";
                break;
            }
        case 10:
            {
                curso = "Técnico desarrollador de software";
                break;
            }
        case 11:
            {
                curso = "Técnico industrial en electricidad y electrónica especializada";
                break;
            }
    }

    return curso;
}

// Registrando a un maestro

var emailCorrect = false;
var passwordCorrect = false;


$("#formRegistro").on("submit", (event) => {
    event.preventDefault();
    var email = $("#email").val();
    var password = $("#password").val();
    if (emailCorrect == false && passwordCorrect == false) {
        $("#registerText").fadeOut();
        $("#infoText").fadeIn();
    } else {

        auth.createUserWithEmailAndPassword(email, password).then(userCredential => {
            $("#registerText").text(email + " ha sido registrado");
            $("#registerText").fadeIn();
            setTimeout(() => {
                $("#registerText").fadeOut();
            }, 2000);
            $("#infoText").fadeOut();
            $("#formRegistro").trigger("reset");
            emailCorrect = false;
            passwordCorrect = false;
        }).catch(error => {
            var errorMessage = error.message;
            $("#infoText").text(errorMessage);
            $("#infoText").fadeIn();
        });

    }

    $("#btnCancelar").click(() => {
        $("#infoText").hide();
    });
});

// Cerrando la sesión

$("#logOut").click(() => {
    auth.signOut().then(() => {
        location.href = "admin.html";
    });
});




//  Métodos de validación de campos

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