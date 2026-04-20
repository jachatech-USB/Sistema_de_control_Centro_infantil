const inputCantidad = document.getElementById("cantidadNinos");
const botonGenerar = document.getElementById("generarFormularios");
const seccionNinos = document.getElementById("seccionNinos");
const contenedorNinos = document.getElementById("contenedorNinos");
const formularioRegistro = document.getElementById("formRegistro");
const selectorEstudiante = document.getElementById("esEstudiante");
const camposEstudiante = document.getElementById("camposEstudiante");
const codigoEstudiante = document.getElementById("codigoEstudiante");
const carreraEstudiante = document.getElementById("carreraEstudiante");
const semestreEstudiante = document.getElementById("semestreEstudiante");

function actualizarCamposEstudiante() {
    const esEstudiante = selectorEstudiante.value === "Si";

    camposEstudiante.classList.toggle("oculto", !esEstudiante);
    codigoEstudiante.required = esEstudiante;
    carreraEstudiante.required = esEstudiante;
    semestreEstudiante.required = esEstudiante;

    if (!esEstudiante) {
        codigoEstudiante.value = "";
        carreraEstudiante.value = "";
        semestreEstudiante.value = "";
    }
}

function crearFormularioNino(indice) {
    return `
        <article class="tarjeta-nino">
            <h3>Nino ${indice}</h3>
            <div class="grid-formulario">
                <label>
                    Nombre completo
                    <input type="varchar" name="nombreNino${indice}" placeholder="Ej. Juan Perez" required>
                </label>

                <label>
                    Fecha de nacimiento
                    <input type="date" name="fechaNacimiento${indice}" required>
                </label>

                <label>
                    Cedula de identidad
                    <input type="int" name="ciniño+${indice}" min="0" max="9" placeholder="Ej. 12345678" required>
                </label>

                <label>
                    Dirección
                    <input type="varchar" name="dirNino${indice}" placeholder="Ej. Juan Perez" required>
                </label>

                <label>
                    Cantidad de alergias
                    <input type="int" name="alergiasniño+${indice}" min="0" max="999" placeholder="Una o mas" required>
                </label>

                <label>
                    Genero
                    <select name="generoNino${indice}" required>
                        <option value="">Seleccionar</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                    </select>
                </label>

                <label>
                    Estado de salud
                    <input type="text" name="saludNino${indice}" placeholder="Ej. Sin observaciones" required>
                </label>

                <label class="campo-completo">
                    Observaciones
                    <input type="text" name="observacionesNino${indice}" placeholder="">
                </label>
            </div>
        </article>
    `;
}

function generarFormulariosNinos() {
    const cantidad = Number(inputCantidad.value);

    if (!cantidad || cantidad < 1) {
        alert("Ingresa una cantidad valida de ninos.");
        inputCantidad.focus();
        return;
    }

    contenedorNinos.innerHTML = "";

    for (let i = 1; i <= cantidad; i += 1) {
        contenedorNinos.innerHTML += crearFormularioNino(i);
    }

    seccionNinos.classList.remove("oculto");
}

function mostrarConfirmacion() {
    let mensaje = document.getElementById("mensajeExito");

    if (!mensaje) {
        mensaje = document.createElement("p");
        mensaje.id = "mensajeExito";
        mensaje.className = "mensaje-exito";
        formularioRegistro.appendChild(mensaje);
    }

    mensaje.textContent = "Registro generado correctamente. Esta es una version de prueba sin base de datos.";
}

botonGenerar.addEventListener("click", generarFormulariosNinos);
selectorEstudiante.addEventListener("change", actualizarCamposEstudiante);

inputCantidad.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        generarFormulariosNinos();
    }
});

formularioRegistro.addEventListener("submit", function (event) {
    event.preventDefault();

    if (seccionNinos.classList.contains("oculto")) {
        alert("Primero genera los formularios de los ninos.");
        return;
    }

    if (!formularioRegistro.checkValidity()) {
        formularioRegistro.reportValidity();
        return;
    }

    mostrarConfirmacion();
});

actualizarCamposEstudiante();
