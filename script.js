(function() {
  // ── CONFIGURACIÓN ─────────────────────────────────────────────
  var URL_SIM = 'https://simulador.anitamiro.com/';
  var TEXTO = 'Visualizar mis letras y comprar';

  // En las tarjetas de listados (home, "Los más buscados", categorías) el botón
  // se pone SOLO en los productos cuyo nombre contenga alguna de estas palabras.
  // Hoy: Letras Originales, Letras MINI e Iniciales. Formas queda con "Comprar".
  // Para sumar otro producto, agregá una palabra de su nombre o de su link, ej: 'formas-bubble'
  var PRODUCTOS = ['letras bubble', 'inicial-letra-12-cm'];

  var ESTILO = 'display:block;width:100%;background:#1A1A1A;color:#fff;border-radius:14px;' +
    'padding:18px 24px;font-family:"Nunito Sans",sans-serif;font-size:16px;font-weight:800;' +
    'cursor:pointer;text-decoration:none;text-align:center;letter-spacing:0.02em;' +
    'box-sizing:border-box;position:relative;z-index:1;';

  function crearBoton(esFicha) {
    var a = document.createElement('a');
    a.className = 'simulador-btn';
    if (esFicha) a.id = 'simulador-btn';
    a.href = URL_SIM;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = TEXTO;
    a.style.cssText = ESTILO;
    return a;
  }

  function textoDe(el) {
    return ((el.value || el.textContent || '') + '').trim().toLowerCase();
  }

  function botonesComprar(raiz) {
    var res = [];
    raiz.querySelectorAll('button, a, input[type="button"], input[type="submit"]').forEach(function(el) {
      if (textoDe(el) === 'comprar') res.push(el);
    });
    return res;
  }

  // ── FICHA DE PRODUCTO (/productos/nombre-del-producto/) ───────
  function esFicha() {
    return /\/productos\/[^\/]+/.test(location.pathname);
  }

  function fichaInsertar() {
    if (document.getElementById('simulador-btn')) return;
    var target = document.querySelector('.js-addtocart') ||
                 document.querySelector('.js-product-form') ||
                 document.querySelector('form[action*="comprar"]');
    if (!target) return;
    var wrapper = document.createElement('div');
    wrapper.style.cssText = 'margin-bottom: 16px;';
    wrapper.appendChild(crearBoton(true));
    target.parentNode.insertBefore(wrapper, target);
  }

  // ── TARJETAS DE LISTADOS ──────────────────────────────────────
  function claveLink(a) {
    return (a.getAttribute('href') || '').split('?')[0];
  }

  // Agrupa cada producto en su "tarjeta": sube desde el link del producto
  // hasta justo antes de que el contenedor incluya otro producto distinto.
  function buscarTarjetas() {
    var tarjetas = [];
    document.querySelectorAll('a[href*="/productos/"]').forEach(function(a) {
      var clave = claveLink(a);
      var nodo = a;
      while (nodo.parentElement && nodo.parentElement !== document.body) {
        var padre = nodo.parentElement;
        var hayOtro = false;
        padre.querySelectorAll('a[href*="/productos/"]').forEach(function(x) {
          if (claveLink(x) !== clave) hayOtro = true;
        });
        if (hayOtro) break;
        nodo = padre;
      }
      if (tarjetas.indexOf(nodo) === -1) tarjetas.push(nodo);
    });
    return tarjetas;
  }

  function esProductoElegido(tarjeta) {
    var txt = (tarjeta.textContent || '').toLowerCase();
    tarjeta.querySelectorAll('a[href*="/productos/"]').forEach(function(a) {
      txt += ' ' + claveLink(a).toLowerCase();
    });
    return PRODUCTOS.some(function(p) { return txt.indexOf(p) !== -1; });
  }

  function tarjetasProcesar() {
    buscarTarjetas().forEach(function(tarjeta) {
      if (tarjeta.querySelector('.simulador-btn')) return;
      if (!esProductoElegido(tarjeta)) return;

      var comprar = botonesComprar(tarjeta);
      // Si el contenedor abarca varios productos (más de un "Comprar"), no tocar
      if (comprar.length > 1) return;

      var boton = crearBoton(false);
      if (comprar.length === 1) {
        comprar[0].parentNode.insertBefore(boton, comprar[0]);
        comprar[0].style.setProperty('display', 'none', 'important');
      } else {
        tarjeta.appendChild(boton);
      }
    });
  }

  function correr() {
    if (esFicha()) { fichaInsertar(); } else { tarjetasProcesar(); }
  }

  correr();
  setTimeout(correr, 500);
  setTimeout(correr, 1500);
  setTimeout(correr, 3000);
})();
