(function() {
  function insertarBoton() {
    // Buscar el formulario de compra con múltiples selectores
    var target = document.querySelector('.js-product-form') || 
                 document.querySelector('[data-store*="product-form"]') ||
                 document.querySelector('form[action*="comprar"]') ||
                 document.querySelector('.buy-button') ||
                 document.querySelector('.js-buy-button');
    
    if (!target) return;

    // Evitar insertar el botón dos veces
    if (document.getElementById('simulador-btn')) return;

    var wrapper = document.createElement('div');
    wrapper.style.cssText = 'margin-bottom: 16px;';
    
    var boton = document.createElement('a');
    boton.id = 'simulador-btn';
    boton.href = 'https://simulador.anitamiro.com/';
    boton.target = '_blank';
    boton.rel = 'noopener noreferrer';
    boton.innerText = 'Configurar mis letras y comprar';
    boton.style.cssText = 'display:block;width:100%;background:#1A1A1A;color:#fff;border-radius:14px;padding:18px 24px;font-family:"Nunito Sans",sans-serif;font-size:16px;font-weight:800;cursor:pointer;text-decoration:none;text-align:center;letter-spacing:0.02em;box-sizing:border-box;';
    
    wrapper.appendChild(boton);
    target.parentNode.insertBefore(wrapper, target);
  }

  // Intentar inmediatamente y también con delay por si el DOM no está listo
  insertarBoton();
  setTimeout(insertarBoton, 500);
  setTimeout(insertarBoton, 1500);
})();
