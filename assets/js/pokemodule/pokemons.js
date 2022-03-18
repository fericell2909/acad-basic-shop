const url = 'https://pokeapi.co/api/v2/pokemon?limit=20'

const getPokemons = async () => {
  const res = await fetch(url)
  const {results} = await res.json()
  let pokemons = []
  for (let pokemon of results) {
    const res = await fetch(pokemon.url)
    let data = await res.json()
    
    data.price =  data.weight * 0.5;  
    data.quantity = 1;

    //console.log(data);
    pokemons.push(data)
  }
  localStorage.setItem('pokemons', JSON.stringify(pokemons))
  return pokemons
}

export const ceckLS = localStorage.getItem('pokemons') ? JSON.parse(localStorage.getItem('pokemons')) : getPokemons()

export const pokemonRender = async () => {
  const pokemons = await ceckLS
  let html = ''
  for (const pokemon of pokemons) {
    let aux  = pokemon.sprites.other;
    //console.log(aux['official-artwork'].front_default)
    html += `<div class="card">
                <img class="card_image" src="${aux['official-artwork'].front_default}" 
                            alt="${pokemon.name}" title="${pokemon.name}" style="margin: 0;">
                <div class="card_information">
                    <button class="card_add" alt="{${pokemon.name}}" data-id="${pokemon.id}">+</button>
                    <div class="card_title">${pokemon.name}</div>
                    <div class="card_description">Expericencia : ${pokemon.base_experience}</div>
                    <div class="card_price_action">
                        <div>S/. ${(pokemon.price ).toFixed(2) }</div>
                    </div>
                </div>
            </div>`
  }
  //document.getElementById('cards').innerHTML = html;
  cards.innerHTML = html
}