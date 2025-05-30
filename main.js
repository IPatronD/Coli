document.addEventListener('DOMContentLoaded', () => {
  // Acordeón de preguntas frecuentes (retraíble)
  const preguntas = document.querySelectorAll('.pregunta');
  preguntas.forEach(pregunta => {
    pregunta.addEventListener('click', () => {
      const item = pregunta.parentElement;

      // Si ya está abierta, ciérrala
      if (item.classList.contains('abierta')) {
        item.classList.remove('abierta');
      } else {
        // Cierra las demás
        preguntas.forEach(p => p.parentElement.classList.remove('abierta'));
        // Abre esta
        item.classList.add('abierta');
      }
    });
  });
});

// Carrusel automático
const slides = document.querySelectorAll('.slide');
let index = 0;

function showSlide(i) {
  const contenedor = document.querySelector('.slide-track');
  const slideWidth = slides[0]?.offsetWidth || 0;
  contenedor.style.transform = `translateX(-${i * slideWidth}px)`;
}

if (slides.length > 1) {
  setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
  }, 3000);
}

//Notificaion
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contacto-form");
  const notificacion = document.getElementById("notificacion");

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita que recargue la página

    // Muestra la notificación
    notificacion.classList.add("mostrar");

    // Oculta después de 3 segundos
    setTimeout(() => {
      notificacion.classList.remove("mostrar");
    }, 3000);

    // Opcional: limpiar formulario
    form.reset();
  });
});

// Modal de adopción
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modalFormulario");
  const abrirBtn = document.getElementById("abrirFormulario");
  const cerrarBtn = document.querySelector(".cerrar");
  const formAdopcion = modal?.querySelector("form");

  if (abrirBtn && modal && cerrarBtn) {
    abrirBtn.addEventListener("click", () => {
      modal.style.display = "block";
    });

    cerrarBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });

    if (formAdopcion) {
      formAdopcion.addEventListener("submit", function (e) {
        e.preventDefault();

        alert("¡Gracias por tu interés en adoptar! Pronto nos pondremos en contacto contigo.");
        formAdopcion.reset();
        modal.style.display = "none";
      });
    }
  }
});

/*Imagen Donaciones */
document.addEventListener("DOMContentLoaded", function () {
  const enlaceQR = document.getElementById('verQR');
  const enlaceBCP = document.getElementById('verBCP');
  const contenedorQR = document.getElementById('contenedorQR');
  const contenedorBCP = document.getElementById('contenedorBCP');

  function toggleContenedor(contenedorMostrar, contenedorOcultar, enlace, textoMostrar, textoOcultar) {
    const activo = contenedorMostrar.classList.contains('activo');

    contenedorMostrar.classList.toggle('activo');
    enlace.textContent = activo ? textoMostrar : textoOcultar;

    // Oculta el otro contenedor e intercambia texto si estaba activo
    if (contenedorOcultar.classList.contains('activo')) {
      contenedorOcultar.classList.remove('activo');
      if (enlaceQR === enlace) enlaceBCP.textContent = 'Ver detalles';
      if (enlaceBCP === enlace) enlaceQR.textContent = 'Ver código QR';
    }
  }

  if (enlaceQR && contenedorQR) {
    enlaceQR.addEventListener('click', function (e) {
      e.preventDefault();
      toggleContenedor(contenedorQR, contenedorBCP, enlaceQR, 'Ver código QR', 'Ocultar código QR');
    });
  }

  if (enlaceBCP && contenedorBCP) {
    enlaceBCP.addEventListener('click', function (e) {
      e.preventDefault();
      toggleContenedor(contenedorBCP, contenedorQR, enlaceBCP, 'Ver detalles', 'Ocultar detalles');
    });
  }
});

// Formato automático para fecha MM/AA
document.getElementById("expira").addEventListener("input", function (e) {
  let val = e.target.value.replace(/\D/g, "").slice(0, 4); // Solo números, máx 4 dígitos

  // Validar que los dos primeros dígitos (mes) estén entre 01 y 12
  if (val.length >= 2) {
    const mes = parseInt(val.slice(0, 2), 10);
    if (mes < 1 || mes > 12) {
      val = "12" + val.slice(2); // Reemplaza por 12 si es inválido
    }
  }

  // Formatear como MM/AA
  if (val.length > 2) {
    val = val.slice(0, 2) + "/" + val.slice(2);
  }

  e.target.value = val;
});

// Formato automático para tarjeta XXXX XXXX XXXX XXXX
document.getElementById("numero-tarjeta").addEventListener("input", function (e) {
  let val = e.target.value.replace(/\D/g, "").substring(0, 16);
  let formatted = val.match(/.{1,4}/g);
  e.target.value = formatted ? formatted.join(" ") : "";
});

// Solo números en CVC
document.getElementById("cvc").addEventListener("input", function (e) {
  e.target.value = e.target.value.replace(/\D/g, "").slice(0, 3);
});

// Mostrar alerta y redirigir al cerrar
function realizarPago() {
  alert("Pago Realizado");
  window.location.href = "dona.html";
}

//Otros:
document.addEventListener('DOMContentLoaded', function () {
  const selectMotivo = document.getElementById('motivo');
  const campoOtro = document.getElementById('campo-otro-motivo');
  const otroInput = document.getElementById('otroMotivo');

  if (selectMotivo && campoOtro && otroInput) {
    selectMotivo.addEventListener('change', function () {
      if (this.value === 'otros') {
        campoOtro.classList.remove('campo-extra');
        otroInput.required = true;
      } else {
        campoOtro.classList.add('campo-extra');
        otroInput.value = '';
        otroInput.required = false;
      }
    });
  }
});

// Iniciar Sesión
function validarLogin() {
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  email.setCustomValidity("");
  password.setCustomValidity("");

  if (!email.value.includes("@")) {
    email.setCustomValidity("El correo debe contener '@'.");
    email.reportValidity();
    return false;
  }

  if (password.value.length <= 5) {
    password.setCustomValidity("La contraseña debe tener más de 5 caracteres.");
    password.reportValidity();
    return false;
  }

  // Si todo es válido
  window.location.href = "bienvenidos.html";
  return false;
}

// Registro
function validarRegistro() {
  const nombre = document.getElementById("nombre");
  const telefono = document.getElementById("telefono");
  const correo = document.getElementById("correo");
  const contrasena = document.getElementById("contrasena");
  const repetirContrasena = document.getElementById("repetirContrasena");

  // Limpiar errores anteriores
  [nombre, telefono, correo, contrasena, repetirContrasena].forEach(campo => campo.setCustomValidity(""));

  // Validar correo
  if (!correo.value.includes("@")) {
    correo.setCustomValidity("El correo debe contener '@'.");
  }

  // Validar contraseña mínima
  if (contrasena.value.length <= 5) {
    contrasena.setCustomValidity("La contraseña debe tener más de 5 caracteres.");
  }

  // Validar que ambas contraseñas coincidan
  if (contrasena.value !== repetirContrasena.value) {
    repetirContrasena.setCustomValidity("Las contraseñas no coinciden.");
  }

  // Si hay errores, mostrar mensajes
  if (!document.getElementById("registroForm").checkValidity()) {
    document.getElementById("registroForm").reportValidity();
    return false;
  }

  // Todo válido
  alert("¡Registro exitoso!");
  window.location.href = "bienvenidosPrimer.html";
  return false;
}

// Ajustar el padding-top del body según la altura real del header
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  if (header) {
    const headerHeight = header.offsetHeight;
    document.body.style.paddingTop = headerHeight + "px";
  }
});