const db = firebase.firestore();

var tableDiplomados = document.getElementById("tableBodyDiplomados");
var tableTecnicas = document.getElementById("tableBodyTecnicas");
var alumnoDiplomados = "";
var alumnoTecnicas = "";

window.addEventListener('DOMContentLoaded', async(e) => {
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