document.addEventListener('DOMContentLoaded', async () => {
    const API_URL = "https://del-food-2.onrender.com/api"; // Replace with your actual backend URL

    const foodContainer = document.querySelector('.food-container');
    const cartContainer = document.querySelector('#cart-items');
    const cartTotal = document.querySelector('#cart-total');
    const checkoutButton = document.querySelector('#checkout');

    let cart = [];

    // Fetch food items from backend instead of hardcoded ones
    async function fetchFoodItems() {
        try {
            const response = await fetch(`${API_URL}/food`);
            const foodItems = await response.json();

            foodItems.forEach(item => {
                const div = document.createElement('div');
                div.classList.add('food-item');
                div.textContent = `${item.name} - ₹${item.price}`;
                div.addEventListener('click', () => addToCart(item));
                foodContainer.appendChild(div);
            });
        } catch (error) {
            console.error("Error fetching food items:", error);
        }
    }

    function addToCart(item) {
        cart.push(item);
        updateCart();
    }

    function updateCart() {
        cartContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;
            const li = document.createElement('li');
            li.textContent = `${item.name} - ₹${item.price}`;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.addEventListener('click', () => removeFromCart(index));
            li.appendChild(removeBtn);
            cartContainer.appendChild(li);
        });

        cartTotal.textContent = `Total: ₹${total}`;
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

    checkoutButton.addEventListener('click', async () => {
        if (cart.length === 0) {
            alert('Cart is empty!');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items: cart, status: "Pending" })
            });

            if (response.ok) {
                alert('Order placed successfully!');
                cart = [];
                updateCart();
            } else {
                alert('Failed to place order. Please try again.');
            }
        } catch (error) {
            console.error("Error placing order:", error);
        }
    });

    // Fetch food items on page load
    fetchFoodItems();
});
