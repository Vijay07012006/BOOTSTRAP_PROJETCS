const products = [
  {
    id: 1,
    name: "iPhone 15",
    price: 79999,
    image: "https://m.media-amazon.com/images/I/71d7rfSl0wL._SX679_.jpg"
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    price: 65999,
    image: "https://m.media-amazon.com/images/I/71rZBHl4J-L._SX679_.jpg"
  },
  {
    id: 3,
    name: "OnePlus 12 5G",
    price: 59999,
    image: "https://m.media-amazon.com/images/I/61he2aNbBKL._SX679_.jpg"
  },
  {
    id: 4,
    name: "Redmi Note 13 Pro",
    price: 24999,
    image: "https://m.media-amazon.com/images/I/71D8ZQH0zGL._SX679_.jpg"
  },
  
  {
    id: 1,
    name: "iPhone 15",
    price: 79999,
    image: "https://m.media-amazon.com/images/I/71d7rfSl0wL._SX679_.jpg"
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    price: 65999,
    image: "https://m.media-amazon.com/images/I/71rZBHl4J-L._SX679_.jpg"
  },
  {
    id: 3,
    name: "OnePlus 12 5G",
    price: 59999,
    image: "https://m.media-amazon.com/images/I/61he2aNbBKL._SX679_.jpg"
  },
  {
    id: 4,
    name: "Redmi Note 13 Pro",
    price: 24999,
    image: "https://m.media-amazon.com/images/I/71D8ZQH0zGL._SX679_.jpg"
  },
  {
    id: 5,
    name: "Realme Narzo 60x",
    price: 13999,
    image: "https://m.media-amazon.com/images/I/81ZSn2rk9WL._SX679_.jpg"
  },
  {
    id: 6,
    name: "Apple Watch SE",
    price: 29999,
    image: "https://m.media-amazon.com/images/I/71mFtM8fTFL._SX679_.jpg"
  },
  {
    id: 7,
    name: "Samsung Galaxy Buds2 Pro",
    price: 16999,
    image: "https://m.media-amazon.com/images/I/51Y5NI-Ix5L._SX679_.jpg"
  },
  {
    id: 8,
    name: "OnePlus Buds Pro 2",
    price: 11999,
    image: "https://m.media-amazon.com/images/I/61nbO9UlD-L._SX679_.jpg"
  },
  {
    id: 9,
    name: "boAt Airdopes 141",
    price: 1299,
    image: "https://m.media-amazon.com/images/I/61KNJav3S9L._SX679_.jpg"
  },
  {
    id: 10,
    name: "Sony WH-1000XM4 Headphones",
    price: 24999,
    image: "https://m.media-amazon.com/images/I/71o8Q5XJS5L._SX679_.jpg"
  },
  {
    id: 11,
    name: "Logitech MX Master 3S Mouse",
    price: 7999,
    image: "https://m.media-amazon.com/images/I/61LtuGzXeaL._SX679_.jpg"
  },
  {
    id: 12,
    name: "HP Victus Gaming Laptop",
    price: 74999,
    image: "https://m.media-amazon.com/images/I/71D5fGUVw-L._SX679_.jpg"
  },
  {
    id: 13,
    name: "ASUS ROG Strix G17",
    price: 139999,
    image: "https://m.media-amazon.com/images/I/81c+9BOQNWL._SX679_.jpg"
  },
  {
    id: 14,
    name: "MacBook Air M2",
    price: 104999,
    image: "https://m.media-amazon.com/images/I/71f5Eu5lJSL._SX679_.jpg"
  },
  {
    id: 15,
    name: "Acer Aspire Lite",
    price: 34999,
    image: "https://m.media-amazon.com/images/I/71oZ5fiHfNL._SX679_.jpg"
  },
  {
    id: 16,
    name: "Lenovo Ideapad Slim 3",
    price: 42999,
    image: "https://m.media-amazon.com/images/I/71PYFA1R4lL._SX679_.jpg"
  },
  {
    id: 17,
    name: "Canon EOS 1500D DSLR",
    price: 37999,
    image: "https://m.media-amazon.com/images/I/914hFeTU2-L._SX679_.jpg"
  },
  {
    id: 18,
    name: "Samsung 4K Smart TV 43”",
    price: 34999,
    image: "https://m.media-amazon.com/images/I/71I-tOeG3oL._SX679_.jpg"
  },
  {
    id: 19,
    name: "Fire-Boltt Smartwatch",
    price: 1999,
    image: "https://m.media-amazon.com/images/I/71XnX+5g0iL._SX679_.jpg"
  },
  {
    id: 20,
    name: "Echo Dot (5th Gen)",
    price: 4499,
    image: "https://m.media-amazon.com/images/I/71gZ8aLrwwL._SX679_.jpg"
  },
  

];



let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayProducts() {
  const productList = document.getElementById('product-list');
  productList.innerHTML = '';
  products.forEach(product => {
    const div = document.createElement('div');
    div.classList.add('product');
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Price: ₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

function addToCart(productId) {
  const existing = cart.find(p => p.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    const product = products.find(p => p.id === productId);
    cart.push({ ...product, quantity: 1 });
  }
  saveAndDisplayCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveAndDisplayCart();
}

function saveAndDisplayCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

function displayCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('cart-item');
    li.innerHTML = `
      <span>${item.name} x${item.quantity}</span>
      <span>₹${item.price * item.quantity}</span>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cartItems.appendChild(li);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = total;
}

displayProducts();
displayCart();
