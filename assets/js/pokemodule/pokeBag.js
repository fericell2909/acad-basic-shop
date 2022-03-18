import { pokemonRender,getPokemons} from './pokemons.js'

let bag = localStorage.getItem('pokeBag') ? JSON.parse(localStorage.getItem('pokeBag')) : []


export const catchPokemon = async (id) => {


  let ceckLS = localStorage.getItem('pokemons') ? JSON.parse(localStorage.getItem('pokemons')) : []

  const pokemon = ceckLS.find((pokemon)=> pokemon.id === id)
  bag.push(pokemon)
  localStorage.setItem('pokeBag', JSON.stringify(bag))
}


export const removePokemon = (id) => {
    let ceckLS = localStorage.getItem('pokemons') ? JSON.parse(localStorage.getItem('pokemons')) : []
  const pokemon = ceckLS.find((pokemon)=> pokemon.id === id)
  bag.splice(bag.indexOf(pokemon), 1)
  localStorage.setItem('pokeBag', JSON.stringify(bag))
}

export const addQuantityPokemon = (id) => {
 
  bag.map((item) => {
    if(item.id === id) {
      item.quantity += 1; 
    }
  })

  pokeBagRender();

}

export const DeleteQuantityPokemon = (id) => {
 
  bag.map((item) => {
    if(item.id === id) {
      item.quantity -= 1; 
    }
  })

  pokeBagRender();

}

export const isAlreadyInCart =  (id) => {
  
  return bag.find(function (item) {return item.id === id})
}

export const CanMinusQuantity =  (id) => {
  
  const aux = bag.find(function (item) {return item.id === id})

  if(aux.quantity <= 1) {
    return false
  } else {
    return true
  }
}

export const totalprice =  () => {
  let total = 0;
    bag.map((item)  => {
          total += item.price * item.quantity;
      });
  return total;
}

export const pokeBagRender = async () => {
  let html = ''
  for (let pokemon of bag) {

    let aux  = pokemon.sprites.other;

    html += `<div class="cart-item">
    <div class="cart-item--operation">
        <button class="btn-cart-item--operation card_item_plus" data-id="${(pokemon.id)}">+</button>
        <label for="">${pokemon.quantity}</label>
        <button class="btn-cart-item--operation card_item_minus"  data-id="${(pokemon.id)}">-</button>
    </div>
    <div class="cart-item--flex">
        <img src="${aux['official-artwork'].front_default}" class="cart-item--flex_image">
    </div>
    <div class="cart-item--flex cart-item--flex_att">
        <div class="cart_title_flex">${pokemon.name}</div>
            <div class="cart_description_flex">Exp: ${pokemon.base_experience}</div>
            <p>${pokemon.quantity} X</p>   
            <div class="cart_price_flex">
                <div>S/. ${(pokemon.price*pokemon.quantity).toFixed(2)}</div>
        </div>
    </div>
    <div class="cart-item--flex" style="width: 100%; align-items: flex-end;"><button  type="button" class="cart-item--delete btn_remove_carrito" title="Quitar producto" data-id="${pokemon.id}" ><img class="cls-aux-remove" id="remove_carrito" data-id="${pokemon.id}" src="/assets/img/delete.png" alt="Eliminar Pokemon"></img></button></div>
</div>`
  }

  if(bag.length <= 0) {

    html += '<div class="cart-item--flex color-primary color-primary-opacity" ><img src="/assets/img/empty.png" alt="Carrito está vacío"></img> No Tiene pokemones para compra</div>'
    
    document.getElementById('container-cart_items').style.alignItems ='center';
    document.getElementById('container-cart_items').style.justifyContent ='center';
  
  } else {

    document.getElementById('container-cart_items').style.alignItems ='inherit';
    document.getElementById('container-cart_items').style.justifyContent ='inherit';

  }
  // pokebagContainer.innerHTML = html
  document.getElementById('container-cart_items').innerHTML = html

  document.getElementById('count').innerHTML = bag.length;
  document.getElementById('total_page').innerHTML = "S/. " + totalprice().toFixed(2);

  localStorage.setItem('pokeBag', JSON.stringify(bag))

}