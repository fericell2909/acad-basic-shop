const productos = [
    {
      id: 1,
      name: 'Pizza Americana',
      description: 'Deliciosa pizza para disfrutar en familia',
      image:'/assets/img/products/pizza_1.webp',
      price: 35.90
    },
    {
      id:2,
      name: 'Pizza Hawaiana',
      description: 'Disfrutala con tus amigos mas cercanos',
      image:'/assets/img/products/pizza_2.webp',
      price: 32.90
    },
    {
      id: 3,
      name: 'Pizza Oriental',
      description: 'La que nos puso en el mapa internacional',
      image:'/assets/img/products/pizza_3.webp',
      price: 42.90
    },
    {
        id: 4,
        name: 'Pizza Peruanísima',
        description: 'Con el sabor que nos caracteriza',
        image:'/assets/img/products/pizza_4.webp',
        price: 59.90
    },
    {
        id: 5,
        name: 'Pizza Mexicana',
        description: 'La preferida de los chicos.',
        image:'/assets/img/products/pizza_5.webp',
        price: 18.90
    }
  ];

  const db = {
    items: productos,
    methods: {
      find: function (id) {
        return db.items.find(function (item) {return item.id === id })
      },
      render: function () {
        let html = ''
        html += db.items.map(function (item) {
                return `<div class="card">
                            <img class="card_image" src="${item.image}" alt="${item.name}" title="${item.image}" style="margin: 0;">
                            <div class="card_information">
                                <button class="card_add" data-id="${item.id}">+</button>
                                <div class="card_title">${item.name}</div>
                                <div class="card_description">${item.description}</div>
                                <div class="card_price_action">
                                    <div>S/. ${item.price.toFixed(2)}</div>
                                </div>
                            </div>
                        </div>`}).join('')

        return html
      }
    }
  }

  const cart = {
    items: [],
    methods: {
      add: function (id) {
        if (cart.methods.isAlreadyInCart(id)) {
          alert('ese producto ya se encuentra en el carrito')
        } else {
          const item = db.methods.find(id)
          cart.items.push(item)
        }
      },
      remove: function (id) {
        cart.items = cart.items.filter(function (item) {return item.id !== id})
      },
      isAlreadyInCart: function (id) {
        return cart.items.find(function (item) {return item.id === id})
      },
      count: function () {
        return cart.items.length
      },
      render: function () {
        //document.getElementById('count').innerHTML = cart.methods.count()
        let html = ''
        html += '<ul>'
        html += cart.items.map(function (item) { return `<li>${item.name} - ${item.price}</li> <button class="btn-remove" data-id="${item.id}">delete</button>`}).join('')
        html += '</ul>'
        return html
      }
    }
  }

  const productsContainer = document.getElementById('cards')
  productsContainer.innerHTML = db.methods.render()

  const closeCart = document.getElementById('btn_cerrar_carrito')
  const cartContainer = document.getElementById('container-cart_items')
  const wrapper = document.getElementById('mycards')

  closeCart.addEventListener('click', function (e) {
      document.getElementById('container_cart').style.display ='none';
  })

  wrapper.addEventListener('click', function (e) {

    if (e.target.matches('.card_add')) {
      const id = e.target.dataset.id
      cart.methods.add(+id)
      cartContainer.innerHTML = cart.methods.render()
    }
  
    if (e.target.matches('.btn-remove')) {
      const id = e.target.dataset.id
      cart.methods.remove(+id)
      cartContainer.innerHTML = cart.methods.render()
    }
  
  })
  