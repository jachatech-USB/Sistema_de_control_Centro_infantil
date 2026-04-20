const tipoBusqueda = document.getElementById("tipoBusqueda");
const valorBusqueda = document.getElementById("valorBusqueda");
const botonBuscar = document.getElementById("botonBuscar");
const mensajeBusqueda = document.getElementById("mensajeBusqueda");
const filasTabla = document.querySelectorAll("#tablaBeneficiarios tr");
const tipoBeneficiario = document.getElementById("tipoBeneficiario");
const botonesFiltro = document.querySelectorAll(".boton-filtro");
let filtroActivo = "todos";

const columnasBusqueda = {
    nombre: 1,
    ci: 2,
    codigo: 4
};

function buscarBeneficiarios() {
    const tipo = tipoBusqueda.value;
    const texto = valorBusqueda.value.trim().toLowerCase();
    const indiceColumna = columnasBusqueda[tipo];

    let coincidencias = 0;

    filasTabla.forEach((fila) => {
        const celdas = fila.querySelectorAll("td");
        const valorCelda = celdas[indiceColumna].textContent.toLowerCase();

        // 🔍 filtro texto
        const coincideTexto = texto === "" || valorCelda.includes(texto);

        // 🎯 filtro botones
        const tipoFila = fila.dataset.beneficiario;

        let coincideFiltro = true;

        if (filtroActivo === "si") {
            coincideFiltro = tipoFila === "si";
        } else if (filtroActivo === "no") {
            coincideFiltro = tipoFila === "no";
        }

        const mostrar = coincideTexto && coincideFiltro;

        fila.style.display = mostrar ? "" : "none";

        if (mostrar) coincidencias++;
    });

    mensajeBusqueda.textContent = `Se encontraron ${coincidencias} resultado(s).`;
}

botonesFiltro.forEach(boton => {
    boton.addEventListener("click", () => {
        // quitar activo
        botonesFiltro.forEach(b => b.classList.remove("activo"));

        // activar el clickeado
        boton.classList.add("activo");

        // guardar filtro
        filtroActivo = boton.dataset.filtro;

        buscarBeneficiarios();
    });
});

botonBuscar.addEventListener("click", buscarBeneficiarios);

valorBusqueda.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        buscarBeneficiarios();
    }
});

buscarBeneficiarios();
