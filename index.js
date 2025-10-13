//OPen stock 
    document.getElementById('open-stock').onclick = function() {
        alert('Available Stock:\n\nCookies:\n- Chocolate Chip Cookie: 50 packs\n- Oatmeal Raisin Cookie: 40 packs\n- Butter Shortbread: 60 packs\n- Double Chocolate Cookie: 30 packs\n\nCakes:\n- Classic Chocolate Cake: 20 kg\n- Vanilla Dream Cake: 25 kg\n- Red Velvet Cake: 15 kg\n- Black Forest Cake: 10 kg\n- Strawberry Delight Cake: 18 kg\n- Rainbow Funfetti Cake: 22 kg\n\nNote: Stock levels are updated daily. Please place your order soon to ensure availability!');
    };
//send the design 
    document.getElementById('send').addEventListener('click', function() {
  const phone = '919289282269'; // WhatsApp number from your code
  const message = encodeURIComponent(" Can you make a cake like this?");
  const url = `https://wa.me/${phone}?text=${message}`;
  window.open(url, '_blank');
});
            // Simple price list for demonstration
            const priceList = {
                "Chocolate Chip Cookie": 300,
                "Oatmeal Raisin Cookie": 400,
                "Butter Shortbread": 280,
                "Double Chocolate Cookie": 300,
                "Almond Biscotti": 500,
                "Classic Chocolate Cake": 500,
                "Vanilla Dream Cake": 480,
                "Red Velvet Cake": 520,
                "Black Forest Cake": 550,
                "Strawberry Delight Cake": 530,
                "Rainbow Funfetti Cake": 510
            };

            // Discount logic
            let discountValue = 0;
            let discountCode = '';
            document.getElementById('apply-discount').onclick = function() {
                const code = document.getElementById('discount-code').value.trim().toUpperCase();
                const msgDiv = document.getElementById('discount-msg');
                if (code === 'CAKE10') {
                    discountValue = 0.10;
                    discountCode = code;
                    msgDiv.textContent = 'Success! 10% discount applied.';
                    msgDiv.style.color = '#388e3c';
                } else if (code) {
                    discountValue = 0;
                    discountCode = '';
                    msgDiv.textContent = 'Invalid code. Try CAKE10 for 10% off.';
                    msgDiv.style.color = '#b33030';
                } else {
                    discountValue = 0;
                    discountCode = '';
                    msgDiv.textContent = '';
                }
            };
//order form
            document.querySelector('.order-form').addEventListener('submit', function (e) {
                e.preventDefault();
                const name = document.getElementById('name').value;
                const item = document.getElementById('item').value;
                const quantity = parseInt(document.getElementById('quantity').value);
                const weight = parseFloat(document.getElementById('weight').value);
                const number = document.getElementById('number').value;
                const date = document.getElementById('date').value;
                const location = document.getElementById('location').value;
                const message = document.getElementById('message').value;

                // Calculate price
                let unitPrice = priceList[item] || 0;
                let total = 0;
                if (item.toLowerCase().includes('cake')) {
                    total = unitPrice * weight;
                } else {
                    total = unitPrice * quantity;
                }

                let discountAmount = 0;
                if (discountValue > 0) {
                    discountAmount = total * discountValue;
                }
                let finalTotal = total - discountAmount;

                // Store order in localStorage (for demo)
                const order = { name, item, quantity, weight, message, total: finalTotal, date: new Date().toLocaleString(), discount: discountAmount, discountCode };
                let orders = JSON.parse(localStorage.getItem('cakehouse_orders') || '[]');
                orders.push(order);
                localStorage.setItem('cakehouse_orders', JSON.stringify(orders));

                // Show bill with WhatsApp button
                const billDiv = document.getElementById('bill');
                billDiv.innerHTML = `
            <h3 style=\"color:#b33030; margin-top:0;\">Order Bill</h3>
            <b>Name:</b> ${name}<br>
            <b>Number:</b> ${number}<br>
            <b>Location:</b> ${location}<br>
            <b>Date & Time:</b> ${date}<br>
            <b>Item:</b> ${item}<br>
            <b>Quantity:</b> ${quantity}<br>
            <b>Weight (kg):</b> ${weight}<br>
            <b>Message:</b> ${message ? message : '-'}<br>
            <hr>
            <b>Total Amount:</b> ₹${total.toFixed(2)}<br>
            ${discountAmount > 0 ? `<b>Discount (${discountCode}):</b> -₹${discountAmount.toFixed(2)}<br>` : ''}
            <b>Final Amount:</b> ₹${finalTotal.toFixed(2)}<br>
            <div style=\"margin:14px 0 8px 0;\"><b>Payment Options:</b></div>
            <ul style=\"padding-left:18px; margin:0 0 10px 0;\">
                <li>Cash on Delivery</li>
                <li>QR code 
                    <img src="assets/Qr code.jpg" alt="Qr"></img>  &  </li>
                <li>UPI Payment:<br>
                    <a href='upi://pay?pa=7042178046@ibl&pn=Cake%20House&am=${finalTotal.toFixed(2)}&cu=INR' style='color:#25D366; font-weight:bold;' target='_blank'>
                        Pay ₹${finalTotal.toFixed(2)} via UPI (9310249651@ibl)
                    </a>
                    <div style='font-size:0.95em; color:#b33030;'>Tap to pay by UPI app</div>
                </li>
            </ul>
            <button id='send-whatsapp' style='background:#25D366; color:#fff; border:none; padding:10px 18px; border-radius:6px; font-size:1rem; margin-top:10px; cursor:pointer;'>Send to WhatsApp</button>
            <span style=\"color:#4caf50; display:block; margin-top:10px;\">Thank you for your order!
             <br>   please send the screenshot of your order bill and payment screenshot to whatsapp</span>
        `;
                billDiv.style.display = 'block';
                this.reset();

                // Add WhatsApp button event
                document.getElementById('send-whatsapp').onclick = function() {
                    const phone = '919289282269'; // Change to your WhatsApp number
                    const waMsg = encodeURIComponent(
                        `New Cake House Order!\n\nName: ${name}\nNumber: ${number}\nLocation: ${location}\ndate:${date}\nItem: ${item}\nQuantity: ${quantity}\nWeight (kg): ${weight}\nMessage: ${message ? message : '-'}\nTotal: ₹${total.toFixed(2)}${discountAmount > 0 ? `\nDiscount (${discountCode}): -₹${discountAmount.toFixed(2)}` : ''}\nFinal Amount: ₹${finalTotal.toFixed(2)}`
                    );
                    window.open(`https://wa.me/${phone}?text=${waMsg}`, '_blank');
                };
            });
            let cart = [];

            function updateCartDisplay() {
                let cartDiv = document.getElementById('cart');
                if (!cartDiv) {
                    cartDiv = document.createElement('div');
                    cartDiv.id = 'cart';
                    cartDiv.style = 'background:#fffbe7; border-radius:10px; box-shadow:0 2px 8px #fcd4ce; padding:16px 12px; max-width:350px; margin:20px auto;';
                    document.getElementById('order').appendChild(cartDiv);
                }
                if (cart.length === 0) {
                    cartDiv.innerHTML = '<b>Your cart is empty.</b>';
                    return;
                }
                let html = '<h3 style="color:#b33030; margin-top:0;">Cart</h3><ul style="padding-left:18px;">';
                let grandTotal = 0;
                cart.forEach((item, idx) => {
                    html += `<li>
                        <b>${item.item}</b> - Qty: ${item.quantity}, Wt: ${item.weight}kg<br>
                        <span>₹${item.total.toFixed(2)}</span>
                        <button style="margin-left:10px; color:#b33030; background:none; border:none; cursor:pointer;" onclick="removeCartItem(${idx})">Remove</button>
                    </li>`;
                    grandTotal += item.total;
                });
                html += `</ul><hr><b>Grand Total: ₹${grandTotal.toFixed(2)}</b>
                <br><button id="checkout-btn" style="background:#25D366; color:#fff; border:none; padding:10px 18px; border-radius:6px; font-size:1rem; margin-top:10px; cursor:pointer;">Checkout</button>`;
                cartDiv.innerHTML = html;

                document.getElementById('checkout-btn').onclick = function() {
                    let orderSummary = cart.map((item, i) =>
                        `${i+1}. ${item.item} - Qty: ${item.quantity}, Wt: ${item.weight}kg, ₹${item.total.toFixed(2)}`
                    ).join('\n');
                    const phone = '919289282269';
                    const waMsg = encodeURIComponent(
                        `Cake House Cart Order:\n\n${orderSummary}\n\nGrand Total: ₹${grandTotal.toFixed(2)}`
                    );
                    window.open(`https://wa.me/${phone}?text=${waMsg}`, '_blank');
                };
            }

            window.removeCartItem = function(idx) {
                cart.splice(idx, 1);
                updateCartDisplay();
            };

            function addToCart(order) {
                cart.push(order);
                updateCartDisplay();
            }

            // Add "Add to Cart" button after bill is generated
            const billDiv = document.getElementById('bill');
            const observer = new MutationObserver(function() {
                if (billDiv.style.display === 'block' && !document.getElementById('add-to-cart')) {
                    const btn = document.createElement('button');
                    btn.id = 'add-to-cart';
                    btn.textContent = 'Add to Cart';
                    btn.style = 'background:#b33030; color:#fff; border:none; padding:10px 18px; border-radius:6px; font-size:1rem; margin-top:10px; cursor:pointer;';
                    billDiv.appendChild(btn);

                    btn.onclick = function() {
                        // Get last order from localStorage
                        let orders = JSON.parse(localStorage.getItem('cakehouse_orders') || '[]');
                        if (orders.length > 0) {
                            addToCart(orders[orders.length - 1]);
                            billDiv.style.display = 'none';
                        }
                    };
                }
            });
            observer.observe(billDiv, { attributes: true, childList: true, subtree: false });
            


//open galary
            document.getElementById('open-gallery').onclick = function() {
    document.getElementById('gallery-modal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
};
//close galary
document.getElementById('close-gallery').onclick = function() {
    document.getElementById('gallery-modal').style.display = 'none';
    document.body.style.overflow = '';
};
document.getElementById('gallery-modal').onclick = function(e) {
    if (e.target === this) {
        this.style.display = 'none';
        document.body.style.overflow = '';
    }
};
