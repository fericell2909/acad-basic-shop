import {pokemonRender} from './pokemodule/pokemons.js'
import { catchPokemon, pokeBagRender, removePokemon , isAlreadyInCart, addQuantityPokemon , CanMinusQuantity , DeleteQuantityPokemon } from './pokemodule/pokeBag.js'

document.addEventListener('DOMContentLoaded', () => {
  pokemonRender()
  pokeBagRender()
  //document.getElementById('container_cart').style.display ='inline-flex';
})

const wrapper = document.getElementById('mycards')
const closeCart = document.getElementById('btn_cerrar_carrito')
const handleCarritoCompra = document.getElementById('handleCarritoCompra');

closeCart.addEventListener('click', function (e) {
  document.getElementById('container_cart').style.display ='none';
})

handleCarritoCompra.addEventListener('click',(e) => {

  document.getElementById('container_cart').style.display ='inline-flex';

});

mycards.addEventListener('click', (e) => {
  
  const id = e.target.dataset.id

  if(e.target.matches('.card_add')) {

  
    if(isAlreadyInCart(+id)) {

      Toastify({
        text: "El Pokemon ya se encuentra en el carrito.",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "center", 
        stopOnFocus: true, 
        style: {
          background: "#ff0009",
        },
        onClick: function(){} // Callback after click
      }).showToast();

    } else  {

      catchPokemon(+id)
      pokeBagRender()
      document.getElementById('container_cart').style.display ='inline-flex';
    
  }
  document.getElementById('container_cart').style.display ='inline-flex';
    
  }

  if(e.target.matches('.btn_remove_carrito') || e.target.matches('.cls-aux-remove') ) {
    
    removePokemon(+id)
    pokeBagRender()
  }

  if(e.target.matches('.card_item_plus')) {

    
    addQuantityPokemon(+id)
    pokeBagRender()
  }

  if(e.target.matches('.card_item_minus')){

    if(!CanMinusQuantity(+id)){

      Toastify({
        text: "La cantidad no puede ser menor a cero.",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "center", 
        stopOnFocus: true, 
        style: {
          background: "#ff0009",
        },
        onClick: function(){} // Callback after click
      }).showToast();

    } else {


      DeleteQuantityPokemon(+id)
      pokeBagRender()

    }
    

  }

 
})



