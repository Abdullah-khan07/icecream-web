document.getElementById('orderForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const quantity = parseInt(document.getElementById('quantity').value);
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;
  const instructions = document.getElementById('instructions').value;
  const iceCream = selectedIceCream.name;
  const price = selectedIceCream.price;
  const total = price * quantity;

  // 🟢 WhatsApp message text
  const message = `🍨 New Order from Website!\n\nCustomer: ${name}\nPhone: ${phone}\nAddress: ${address}\n\nItem: ${iceCream}\nQuantity: ${quantity}\nTotal: Rs. ${total}\n\nInstructions: ${instructions}`;

  // 🟢 WhatsApp API URL (client's number)
  const whatsappURL = `https://wa.me/923700242090?text=${encodeURIComponent(message)}`;

  // ✅ Save to Firebase
  db.collection("orders").add({
    name,
    phone,
    address,
    instructions,
    iceCream,
    quantity,
    price,
    total,
    timestamp: new Date()
  }).then(() => {
    alert("Order placed successfully!");

    // 🟢 Open WhatsApp chat
    window.open(whatsappURL, '_blank');

    document.getElementById('orderForm').reset();
    document.getElementById('orderModal').style.display = 'none';
  }).catch(error => {
    alert("Error placing order: " + error);
  });
  function addToCart(name, price) {
  cart.push({ name, price, quantity: 1 });
  updateCartUI();
  Swal.fire("Added!", `${name} added to cart.`, "success");
}

function openOrderModal(name, price) {
  currentIceCream = name;
  currentPrice = price;
  quantity = 1;
  updateOrderModal(); // update price
  document.getElementById('orderModal').style.display = 'flex';
}

});
// To use jsPDF and invoice.js, include the following <script> tags in your HTML file instead:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
// <script src="invoice.js"></script> <!-- New file to be created -->
