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
    1: {
        nombre: "Técnico en automotriz y diésel",
        descripcion: "El alumno aprenderá sobre automotriz y diésel."
    },
    2: {
        nombre: "Técnico en control numérico computarizado",
        descripcion: "El alumno aprenderá sobre control númerico computarizado."
    },
    1: {
        nombre: "Técnico en paquetería computacional",
        descripcion: "El alumno aprenderá sobre paquetería computacional."
    },
    1: {
        nombre: "Técnico en refrigeración y calefacción industrial",
        descripcion: "El alumno aprenderá sobre refrigeración y calefacción industrial."
    },
    1: {
        nombre: "Técnico desarrollador de software",
        descripcion: "El alumno aprenderá sobre el desarrollo de software."
    },
    1: {
        nombre: "Técnico industrial en electricidad y electrónica especializada",
        descripcion: "El alumno aprenderá sobre electricidad y electrónica especializada."
    },
}


// Evento: Cargar los diplomados, ed técnica o todos

$("#btnDiplomados").click(() => {
    var size = Object.keys(diplomados).length

    var tableBody = document.getElementById("tableBody");
    for (var i = 0; i < size; i++) {

        // Creamos los elementos necesarios para cada fila
        var tr = document.createElement("tr");
        var th = document.createElement("th");
        var tdNombre = document.createElement("td");
        var tdDescripcion = document.createElement("td");
        var tdBtnRegistro = document.createElement("td");
        var tdBtnVerMas = document.createElement("td");
        var btnRegistro = document.createElement("button");
        var btnVerMas = document.createElement("button");

        // Establecemos clases y atributos
        th.setAttribute(`scope`, "row");
        btnRegistro.classList.add("btnVerdes");
        btnVerMas.classList.add("btnVerdes");

        // Ingresamos los botones en su respectivo campo
        tdBtnRegistro.appendChild(btnRegistro);
        tdBtnVerMas.appendChild(btnVerMas);

        // Ingresamos información en su respectivo campo
        tdNombre.innerHTML = diplomados[i].nombre;
        tdDescripcion.innerHTML = diplomados[i].nombre;
        th.innerHTML = (i + 1);
        btnRegistro.innerHTML = "Registro";
        btnVerMas.innerHTML = "Ver más";


        // Construimos la fila
        tr.appendChild(th);
        tr.appendChild(tdNombre);
        tr.appendChild(tdDescripcion);
        tr.appendChild(tdBtnRegistro);
        tr.appendChild(tdBtnVerMas);


        // Agregamos la fila a la tabla
        tableBody.appendChild(tr);
    }
});