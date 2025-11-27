document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('.contact-form').addEventListener('submit', function (e) {
        e.preventDefault();
    
        // Show the message
        const contactMessage = document.querySelector('.contact-message');
        contactMessage.style.display = 'block';
    
        // Hide the message after 5 seconds
        setTimeout(function () {
            contactMessage.style.display = 'none';
        }, 1000);
        e.target.reset();
    });
});
    document.addEventListener('DOMContentLoaded', () => {
    const addToOrderButtons = document.querySelectorAll('.menu-item button');
    addToOrderButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const menuItem = event.target.closest('.menu-item');
            const itemName = menuItem.querySelector('h2').innerText;
            const itemPrice = parseFloat(menuItem.querySelector('p strong').innerText);
            addToOrder(itemName, itemPrice);
        });
    });

    // Handle order form submission
    document.querySelector('.order-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const orderDetails = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value,
            deliveryMethod: document.getElementById('delivery-method').value,
            paymentMethod: document.getElementById('payment-method').value,
            instructions: document.getElementById('instructions').value,
            orderItems: getOrderItems()
        };
        showConfirmation(orderDetails);
        e.target.reset();
    });

    // Check if there's an order to be added from the menu page
    const params = new URLSearchParams(window.location.search);
    if (params.has('itemName') && params.has('itemPrice')) {
        const itemName = params.get('itemName');
        const itemPrice = params.get('itemPrice');
        addToOrder(itemName, itemPrice);
    }
});

function addToOrder(itemName, itemPrice) {
    const quantity = prompt(`Enter quantity for ${itemName}:`);
    if (quantity !== null && quantity.trim() !== '') {
        const totalPrice = parseFloat(itemPrice) * parseInt(quantity);
        const orderItem = {
            name: itemName,
            price: itemPrice,
            quantity: parseInt(quantity),
            totalPrice: totalPrice.toFixed(2)
        };
        sessionStorage.setItem('orderItem', JSON.stringify(orderItem));
        window.location.href = 'order.html';
    }
}

function getOrderItems() {
    const orderItem = sessionStorage.getItem('orderItem');
    if (orderItem) {
        return [JSON.parse(orderItem)];
    }
    return [];
}

function showConfirmation(orderDetails) {
    const confirmationDetails = document.getElementById('confirmation-details');
    confirmationDetails.innerHTML = `
        <p>Name: ${orderDetails.name}</p>
        <p>Phone: ${orderDetails.phone}</p>
        <p>Email: ${orderDetails.email}</p>
        <p>Address: ${orderDetails.address}</p>
        <p>Delivery Method: ${orderDetails.deliveryMethod}</p>
        <p>Payment Method: ${orderDetails.paymentMethod}</p>
        <p>Special Instructions: ${orderDetails.instructions}</p>
        <h3>Order Items:</h3>
        ${orderDetails.orderItems.map(item => `
        <p>${item.name}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Price: ₹${(item.price * item.quantity).toFixed(2)}</p>`).join('')}
    `;

    const estimatedDeliveryTime = new Date();
    estimatedDeliveryTime.setMinutes(estimatedDeliveryTime.getMinutes() + 45);
    document.getElementById('delivery-time').innerText = estimatedDeliveryTime.toLocaleTimeString();

    document.getElementById('order-confirmation').style.display = 'block';
}


function closeConfirmation() {
    document.getElementById('order-confirmation').style.display = 'none';
}

function printConfirmation() {
    const printContents = document.querySelector('.order-confirmation-content').innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}

document.querySelector('.review-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const reviewDetails = {
        rating: document.getElementById('rating').value,
        reviewText: document.getElementById('review-text').value,
        name: document.getElementById('name').value,
    };
    console.log('Review submitted:', reviewDetails);
    alert('Review submitted successfully!');
    e.target.reset(); // This line will reset the form
});


function searchMenu() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        const itemName = item.querySelector('h2').innerText.toLowerCase();
        if (itemName.includes(searchTerm)) {
            item.scrollIntoView({ behavior: 'smooth', block: 'center' });
            item.classList.add('highlight');
            setTimeout(() => {
                item.classList.remove('highlight');
            }, 3000);
        }
    });
}

function scrollToCategory(categoryId) {
    const categoryElement = document.getElementById(categoryId);
    categoryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
