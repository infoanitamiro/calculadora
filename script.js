(function() {
  function insertarBoton() {
    var targets = document.querySelectorAll('.js-addtocart, .js-product-form, form[action*="comprar"]');

    targets.forEach(function(target) {
      // Evita insertar el botón dos veces en el mismo formulario
      if (target.dataset.simuladorBtnInserted === 'true') return;

      var wrapper = document.createElement('div');
      wrapper.style.cssText = 'margin-bottom: 16px;';

      var boton = document.createElement('a');
      boton.className = 'simulador-btn';
      boton.href = 'https://simulador.anitamiro.com/';
      boton.target = '_blank';
      boton.rel = 'noopener noreferrer';
      boton.innerText = 'Visualizar mis letras y comprar';
      boton.style.cssText = 'display:block;width:100%;background:#1A1A1A;color:#fff;border-radius:14px;padding:18px 24px;font-family:"Nunito Sans",sans-serif;font-size:16px;font-weight:800;cursor:pointer;text-decoration:none;text-align:center;letter-spacing:0.02em;box-sizing:border-box;';

      wrapper.appendChild(boton);
      target.parentNode.insertBefore(wrapper, target);

      target.dataset.simuladorBtnInserted = 'true';
    });
  }

  insertarBoton();
  setTimeout(insertarBoton, 500);
  setTimeout(insertarBoton, 1500);
})();
