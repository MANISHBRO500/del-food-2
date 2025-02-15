document.addEventListener('DOMContentLoaded', () => {
    const foodForm = document.querySelector('#food-form');
    const foodList = document.querySelector('#food-list');
    const orderList = document.querySelector('#order-list');

    foodForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.querySelector('#food-name').value;
        const price = document.querySelector('#food-price').value;

        const response = await fetch('/api/food', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price })
        });

        if (response.ok) {
            alert('Food Added!');
            loadFoodItems();
        }
    });

    async function loadFoodItems() {
        const response = await fetch('/api/food');
        const foodItems = await response.json();
        foodList.innerHTML = '';

        foodItems.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ₹${item.price}`;
            foodList.appendChild(li);
        });
    }

    async function loadOrders() {
        const response = await fetch('/api/order');
        const orders = await response.json();
        orderList.innerHTML = '';

        orders.forEach(order => {
            const li = document.createElement('li');
            li.textContent = `Order #${order._id} - ${order.status}`;
            const updateBtn = document.createElement('button');
            updateBtn.textContent = 'Update Status';
            updateBtn.addEventListener('click', async () => {
                await fetch(`/api/order/${order._id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: 'Delivered' })
                });
                loadOrders();
            });
            li.appendChild(updateBtn);
            orderList.appendChild(li);
        });
    }

    loadFoodItems();
    loadOrders();
});
