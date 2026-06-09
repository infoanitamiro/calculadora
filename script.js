(function() {
  function insertarBoton() {
    if (document.getElementById('simulador-btn')) return;

    var target = document.querySelector('.js-addtocart') || 
                 document.querySelector('.js-product-form') || 
                 document.querySelector('form[action*="comprar"]');
    
    if (!target) return;

    // Ocultar el botón nativo de Tienda Nube
    var formRow = target.closest('.form-row') || target.parentNode;
    if (formRow) formRow.style.display = 'none';

    var wrapper = document.createElement('div');
    wrapper.style.cssText = 'margin-bottom: 16px;';
    
    var boton = document.createElement('a');
    boton.id = 'simulador-btn';
    boton.href = 'https://simulador.anitamiro.com/';
    boton.target = '_blank';
    boton.rel = 'noopener noreferrer';
    boton.innerText = 'Visualizar mis letras y comprar';
    boton.style.cssText = 'display:block;width:100%;background:#1A1A1A;color:#fff;border-radius:50px;padding:18px 24px;font-family:"Nunito Sans",sans-serif;font-size:16px;font-weight:800;cursor:pointer;text-decoration:none;text-align:center;letter-spacing:0.02em;box-sizing:border-box;';
    
    wrapper.appendChild(boton);
    target.parentNode.insertBefore(wrapper, target.parentNode.firstChild);
  }

  insertarBoton();
  setTimeout(insertarBoton, 500);
  setTimeout(insertarBoton, 1500);
})();
