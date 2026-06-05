(function() {
  function insertarBoton() {
    var buyButton = document.querySelector('.js-buy-button') || 
                    document.querySelector('[data-store="buy-button"]') ||
                    document.querySelector('.buy-button');
    
    if (!buyButton) return;

    var wrapper = document.createElement('div');
    wrapper.style.cssText = 'margin-bottom: 12px;';
    
    var boton = document.createElement('a');
    boton.href = 'https://simulador.anitamiro.com/';
    boton.target = '_blank';
    boton.rel = 'noopener noreferrer';
    boton.innerText = 'Configurar mis letras y comprar';
    boton.style.cssText = 'display:block;width:100%;background:#1A1A1A;color:#fff;border-radius:14px;padding:18px 24px;font-family:"Nunito Sans",sans-serif;font-size:16px;font-weight:800;cursor:pointer;text-decoration:none;text-align:center;letter-spacing:0.02em;box-sizing:border-box;';
    
    wrapper.appendChild(boton);
    buyButton.parentNode.insertBefore(wrapper, buyButton);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', insertarBoton);
  } else {
    insertarBoton();
  }
})();
