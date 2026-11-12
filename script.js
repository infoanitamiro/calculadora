(function() {
  // ── CONFIGURACIÓN ─────────────────────────────────────────────
  var URL_SIM = 'https://simulador.anitamiro.com/';
  var TEXTO = 'Visualizar mis letras y comprar';

  // Productos que llevan el botón del simulador en las tarjetas de los listados.
  // Se compara con el nombre del producto (en minúsculas) o con parte de su link.
  // Hoy: Letras Originales, Letras MINI e Iniciales. Formas queda con "Comprar".
  var PRODUCTOS = ['letras bubble', 'iniciales- letra 12', 'inicial-letra-12-cm'];

  // Cartelito de prueba abajo a la izquierda. Cuando todo ande, cambiá true por false.
  var DEBUG = true;

  var ESTILO = 'display:block;width:100%;background:#1A1A1A;color:#fff;border-radius:14px;' +
    'padding:18px 24px;font-family:"Nunito Sans",sans-serif;font-size:16px;font-weight:800;' +
    'cursor:pointer;text-decoration:none;text-align:center;letter-spacing:0.02em;' +
    'box-sizing:border-box;position:relative;z-index:1;';

  var estado = { cambiados: 0, candidatos: 0, error: '' };

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

  function esElegido(texto) {
    texto = (texto || '').toLowerCase();
    return PRODUCTOS.some(function(p) { return texto.indexOf(p) !== -1; });
  }

  function claveLink(a) {
    return (a.getAttribute('href') || '').split('?')[0];
  }

  function reemplazarComprar(el) {
    if (el.getAttribute('data-sim-hecho')) return;
    el.setAttribute('data-sim-hecho', '1');
    var boton = crearBoton(false);
    el.parentNode.insertBefore(boton, el);
    el.style.setProperty('display', 'none', 'important');
    estado.cambiados++;
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

  // ── TARJETAS: camino 1 → por el nombre que trae el propio botón ──
  // El botón "Comprar" de las tarjetas trae title="Compra rápida de NOMBRE"
  function porTitulo() {
    document.querySelectorAll('[title]').forEach(function(el) {
      var t = (el.getAttribute('title') || '').toLowerCase();
      if (t.indexOf('compra rápida de') !== 0 && t.indexOf('compra rapida de') !== 0) return;
      estado.candidatos++;
      if (esElegido(t)) reemplazarComprar(el);
    });
  }

  // ── TARJETAS: camino 2 → agrupar por tarjeta y mirar su texto ──
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

  function porTarjeta() {
    buscarTarjetas().forEach(function(tarjeta) {
      if (tarjeta.querySelector('.simulador-btn')) return;
      var txt = (tarjeta.textContent || '').toLowerCase();
      tarjeta.querySelectorAll('a[href*="/productos/"]').forEach(function(a) {
        txt += ' ' + claveLink(a).toLowerCase();
      });
      if (!esElegido(txt)) return;

      var comprar = [];
      tarjeta.querySelectorAll('button, a, input[type="button"], input[type="submit"]').forEach(function(el) {
        if (textoDe(el) === 'comprar' && !el.getAttribute('data-sim-hecho')) comprar.push(el);
      });
      if (comprar.length !== 1) return;
      reemplazarComprar(comprar[0]);
    });
  }

  // ── CARTELITO DE PRUEBA ───────────────────────────────────────
  function mostrarDebug() {
    if (!DEBUG) return;
    var d = document.getElementById('sim-debug');
    if (!d) {
      d = document.createElement('div');
      d.id = 'sim-debug';
      d.style.cssText = 'position:fixed;left:8px;bottom:8px;z-index:99999;background:#fff;color:#000;' +
        'border:1px solid #000;border-radius:8px;padding:6px 10px;font:12px/1.3 sans-serif;max-width:260px;';
      document.body.appendChild(d);
    }
    d.textContent = 'script.js activo · botones "Compra rápida" vistos: ' + estado.candidatos +
      ' · cambiados: ' + document.querySelectorAll('.simulador-btn').length +
      (estado.error ? ' · ERROR: ' + estado.error : '');
  }

  function correr() {
    estado.candidatos = 0;
    try {
      if (esFicha()) fichaInsertar();
      porTitulo();
      porTarjeta();
    } catch (e) {
      estado.error = e.message;
      if (window.console) console.log('script.js simulador error:', e);
    }
    mostrarDebug();
  }

  correr();
  setTimeout(correr, 500);
  setTimeout(correr, 1500);
  setTimeout(correr, 3000);
})();
