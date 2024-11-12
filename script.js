// Sample products data with categories
let products = [
    {
        id: 1,
        name: "Premium Smartphone XYZ",
        price: 3999000,
        image: "hpkeren.jpeg",
        category: "electronics"
    },
    {
        id: 2,
        name: "Wireless Headphones Pro",
        price: 899000,
        image: "hensetkeren.jpeg",
        category: "electronics"
    },
    {
        id: 3,
        name: "Smart Watch Elite",
        price: 1499000,
        image: "/api/placeholder/280/250",
        category: "electronics"
    },
    {
        id: 4,
        name: "Laptop UltraBook",
        price: 12999000,
        image: "/api/placeholder/280/250",
        category: "electronics"
    },
    {
        id: 5,
        name: "Running Shoes Pro",
        price: 1299000,
        image: "/api/placeholder/280/250",
        category: "sports"
    },
    {
        id: 6,
        name: "Yoga Mat Premium",
        price: 299000,
        image: "/api/placeholder/280/250",
        category: "sports"
    },
    {
        id: 7,
        name: "Designer T-Shirt",
        price: 299000,
        image: "/api/placeholder/280/250",
        category: "fashion"
    },
    {
        id: 8,
        name: "Leather Wallet",
        price: 499000,
        image: "/api/placeholder/280/250",
        category: "fashion"
    },
    {
        id: 9,
        name: "Smart Coffee Maker",
        price: 899000,
        image: "/api/placeholder/280/250",
        category: "home"
    },
    {
        id: 10,
        name: "Robot Vacuum Cleaner",
        price: 2999000,
        image: "",
        category: "home"
    }
];

let cart = [];
let currentCategory = 'all';

// search bar
function searchProducts() {
const searchInput = document.getElementById('searchInput').value.toLowerCase();
const filteredProducts = products.filter(product =>
product.name.toLowerCase().includes(searchInput)
);

const productsGrid = document.getElementById('productsGrid');
productsGrid.innerHTML = '';

filteredProducts.forEach(product => {
const productCard = `
    <div class="product-card">
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <div class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price">Rp ${product.price.toLocaleString()}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    </div>
`;
productsGrid.innerHTML += productCard;
});
}

// Toggle mobile menu
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}


// Filter products by category
function filterProducts(category) {
    currentCategory = category;
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    displayProducts();
}

// Display products based on current category
function displayProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    const filteredProducts = currentCategory === 'all' 
        ? products 
        : products.filter(product => product.category === currentCategory);

    filteredProducts.forEach(product => {
        const productCard = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <div class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">
                        <i class="fas fa-tag"></i>
                        Rp ${product.price.toLocaleString()}
                    </div>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i>
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        productsGrid.innerHTML += productCard;
    });
}

// Previous functions remain the same
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCartCount();
    showToast('Item added to cart!');
    if (document.getElementById('cartSection').style.display === 'block') {
        displayCart();
    }
}

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.
    quantity, 0);
    document.getElementById('cartCount').textContent = cartCount;
}

// Show toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 2000);
}

// Display cart items
function displayCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    cartItems.innerHTML = '';

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const cartItem = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>Rp ${item.price.toLocaleString()} x ${item.quantity}</p>
                </div>
                <div class="cart-item-controls">
                    <button onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `;
        cartItems.innerHTML += cartItem;
    });

    cartTotal.textContent = total.toLocaleString();
}

// Remove item from cart
function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        cart.splice(itemIndex, 1);
        updateCartCount();
        displayCart();
        showToast('Item removed from cart');
    }
}

// Show cart section
function showCart() {
    document.getElementById('productsSection').style.display = 'none';
    document.getElementById('cartSection').style.display = 'block';
    displayCart();
}

// Show products section
function showProducts() {
    document.getElementById('cartSection').style.display = 'none';
    document.getElementById('productsSection').style.display = 'block';
}

// Checkout via WhatsApp
function checkoutToWhatsApp() {
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const address = document.getElementById('customerAddress').value;

    if (name && phone && address) {
        let message = `Hello, I would like to place an order:\n\n`;
        cart.forEach(item => {
            message += `${item.name} - Rp ${item.price.toLocaleString()} x ${item.quantity}\n`;
        });
        message += `\nTotal: Rp ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()}`;
        message += `\n\nName: ${name}\nPhone: ${phone}\nAddress: ${address}`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/6288291045579?text=${encodedMessage}`);
    } else {
        showToast('Please fill in all shipping information.');
    }
}

// Initialize products display
displayProducts();