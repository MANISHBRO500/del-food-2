document.addEventListener('DOMContentLoaded', () => {
    const foodContainer = document.querySelector('.food-container');
    const cartContainer = document.querySelector('#cart-items');
    const cartTotal = document.querySelector('#cart-total');
    const checkoutButton = document.querySelector('#checkout');

    let cart = [];

    const foodItems = [
        { id: 1, name: 'Burger', price: 100 },
        { id: 2, name: 'Pizza', price: 250 },
        { id: 3, name: 'Pasta', price: 150 }
    ];

    foodItems.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('food-item');
        div.textContent = `${item.name} - ₹${item.price}`;
        div.addEventListener('click', () => addToCart(item));
        foodContainer.appendChild(div);
    });

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

    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Cart is empty!');
        } else {
            alert(`Order placed successfully! Total: ₹${cart.reduce((sum, item) => sum + item.price, 0)}`);
            cart = [];
            updateCart();
        }
    });
});
