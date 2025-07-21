const firebaseConfig = {
  apiKey: "AIzaSyA_XXj6aWydKx-eJlRztEzxo7u0NwuwD2E",
  authDomain: "ice-crem-website.firebaseapp.com",
  projectId: "ice-crem-website",
  storageBucket: "ice-crem-website.appspot.com",
  messagingSenderId: "414571498319",
  appId: "1:414571498319:web:5f53cb873c5275a3da133a",
  databaseURL: "https://ice-crem-website-default-rtdb.firebaseio.com"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let currentIceCream = '';
let currentPrice = 0;

function openModal(name, price) {
  currentIceCream = name;
  currentPrice = price;
  document.getElementById('modalTitle').innerText = name;
  document.getElementById('modalPrice').innerText = price;
  document.getElementById('totalAmount').innerText = price;
  document.getElementById('quantity').value = 1;
  document.getElementById('iceModal').style.display = 'flex';
}

function updateTotal() {
  const quantity = parseInt(document.getElementById('quantity').value);
  const total = quantity * currentPrice;
  document.getElementById('totalAmount').innerText = total;
}

function closeModal() {
  document.getElementById('iceModal').style.display = 'none';
}

function submitOrder() {
  const name = document.getElementById('custName').value;
  const phone = document.getElementById('custPhone').value;
  const address = document.getElementById('custAddress').value;
  const note = document.getElementById('custNote').value;
  const quantity = parseInt(document.getElementById('quantity').value);
  const total = quantity * currentPrice;

  const order = {
    iceCream: currentIceCream,
    quantity,
    name,
    phone,
    address,
    note,
    total,
    time: new Date().toISOString()
  };

  db.ref("orders").push(order).then(() => {
    Swal.fire("Success", "Your order has been placed!", "success");
    closeModal();
    const msg = `🍨 *New Order* 🍨\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Address:* ${address}\n*Item:* ${currentIceCream}\n*Qty:* ${quantity}\n*Note:* ${note}\n*Total:* Rs. ${total}`;
    const url = `https://wa.me/923700242090?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  }).catch(() => {
    Swal.fire("Error", "Could not place order", "error");
  });
}
