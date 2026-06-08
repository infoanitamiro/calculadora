(function() {
  function insertarBoton() {
    if (document.getElementById('simulador-btn')) return;

    var target = document.querySelector('.js-addtocart') || 
                 document.querySelector('.js-product-form') || 
                 document.querySelector('form[action*="comprar"]');
    
    if (!target) return;

    var wrapper = document.createElement('div');
    wrapper.style.cssText = 'margin-bottom: 16px;';
    
    var boton = document.createElement('a');
    boton.id = 'simulador-btn';
    boton.href = 'https://simulador.anitamiro.com/';
    boton.target = '_blank';
    boton.rel = 'noopener noreferrer';
    boton.innerText = 'Configurar mis letras y comprar';
    boton.style.cssText = 'display:block;width:100%;background:#1A1A1A;color:#fff;bord
