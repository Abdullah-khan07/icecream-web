let cart = [];

function addToCart(item) {
  cart.push(item);
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById('cartItems');
  cartList.innerHTML = "";
  cart.forEach((item, index) => {
    cartList.innerHTML += `<li>${item} <button onclick="removeFromCart(${index})">Remove</button></li>`;
  });
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function sendToWhatsApp() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }
  const message = encodeURIComponent(`Hi! I want to order:\n\n${cart.join('\n')}`);
  const phoneNumber = "923703197769"; // Your WhatsApp number
  const url = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(url, "_blank");
}
