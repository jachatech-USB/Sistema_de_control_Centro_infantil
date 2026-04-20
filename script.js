function login() {
    let usuario = document.getElementById("usuario").value;
    let password = document.getElementById("password").value;
    let mensaje = document.getElementById("mensaje");

    if (usuario===""||password===""){
        mensaje.style.color="black";
        mensaje.textContent="Completar todos los campos";
        
        document.getElementById("usuario").style.border = usuario === "" ? "1px solid red" : "";
        document.getElementById("password").style.border = password === "" ? "1px solid red" : "";

        document.getElementById("usuario").addEventListener("input", function() {
            this.style.border = "";
        });

        document.getElementById("password").addEventListener("input", function() {
            this.style.border = "";
        });

        return;
    }
    
    if (usuario!=="a"){
        mensaje.style.color="red";
        mensaje.textContent="Usuario no encontrado";
        return;
    }

    if (password!=="1"){
        mensaje.style.color="red";
        mensaje.textContent="Contraseña incorrecta";
        return;
    }

    window.location.href="inicio.html"        
    
}

function togglePassword(boton) {
    let input = document.getElementById("password");

    if (input.type === "password") {
        input.type = "text";
        boton.textContent = "🙈";
    } else {
        input.type = "password";
        boton.textContent = "👁️";
    }
}


// Enter en usuario → ir a contraseña
document.getElementById("usuario").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        document.getElementById("password").focus();
    }
});

// Enter en contraseña → ejecutar login
document.getElementById("password").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        login();
    }
});

