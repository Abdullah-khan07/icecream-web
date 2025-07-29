function addToCart(name, price) {
  const index = cart.findIndex(item => item.name === name);
  if (index > -1) {
    cart[index].qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  updateCartUI();
}

function updateCartUI() {
  document.getElementById("cartCount").innerText = cart.reduce((a, b) => a + b.qty, 0);
}

function openCart() {
  let html = "";
  let total = 0;
  cart.forEach((item, i) => {
    total += item.qty * item.price;
    html += `
      <div>
        <strong>${item.name}</strong> - Rs. ${item.price} x 
        <input type="number" value="${item.qty}" min="1" onchange="updateQty(${i}, this.value)" />
        <button onclick="removeItem(${i})">❌</button>
      </div>`;
  });
  document.getElementById("cartItems").innerHTML = html;
  document.getElementById("cartTotal").innerText = `Total: Rs. ${total}`;
  document.getElementById("cartModal").style.display = "flex";
}

function updateQty(index, val) {
  cart[index].qty = parseInt(val);
  openCart();
  updateCartUI();
}

function removeItem(index) {
  cart.splice(index, 1);
  openCart();
  updateCartUI();
}

function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}
