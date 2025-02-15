document.addEventListener('DOMContentLoaded', () => {
    const API_URL = "https://del-food-2.onrender.com/api";  // Replace with actual backend URL

    const foodForm = document.querySelector('#food-form');
    const foodList = document.querySelector('#food-list');
    const orderList = document.querySelector('#order-list');

    // Add Food Item
    foodForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.querySelector('#food-name').value;
        const price = document.querySelector('#food-price').value;

        const response = await fetch(`${API_URL}/food`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price })
        });

        if (response.ok) {
            alert('Food Added!');
            loadFoodItems();
        } else {
            alert('Failed to add food item.');
        }
    });

    // Load Food Items
    async function loadFoodItems() {
        try {
            const response = await fetch(`${API_URL}/food`);
            const foodItems = await response.json();
            foodList.innerHTML = '';

            foodItems.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.name} - ₹${item.price}`;
                foodList.appendChild(li);
            });
        } catch (error) {
            console.error("Error fetching food items:", error);
        }
    }

    // Load Orders
    async function loadOrders() {
        try {
            const response = await fetch(`${API_URL}/order`);
            const orders = await response.json();
            orderList.innerHTML = '';

            orders.forEach(order => {
                const li = document.createElement('li');
                li.textContent = `Order #${order._id} - ${order.status}`;
                const updateBtn = document.createElement('button');
                updateBtn.textContent = 'Update Status';
                updateBtn.addEventListener('click', async () => {
                    await fetch(`${API_URL}/order/${order._id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ status: 'Delivered' })
                    });
                    loadOrders();
                });
                li.appendChild(updateBtn);
                orderList.appendChild(li);
            });
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

    loadFoodItems();
    loadOrders();
});
