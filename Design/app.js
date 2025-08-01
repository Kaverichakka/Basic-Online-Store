(() => {
    const app = document.getElementById("app");
    const cartCountE1 = document.getElementById("cart-count");

    let products = [];
    let filteredProducts = [];
    let cart = {};
    let currentPage = "home";
    let currentCategory = "all";

    const categoryMap = {
        "men's clothing": "mens clothing",
        "women's clothing": "womens clothing",
        jewelery: "jewelery",
        electronics: "electronics",
    };

    async function fetchProducts() {
        try {
            const res = await fetch("https://fakestoreapi.com/products");
            const data = await res.json();
            products = data;
            filteredProducts = products;
        } catch {
            products = [];
            filteredProducts = [];
        }
    }

    function formatPrice(price) {
        return "$ " + price.toFixed(2);
    }

    function truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + "..."; 
    }

    function renderHome() {
      app.innerHTML = `
        <div class="banner">
          <img src="https://static.vecteezy.com/system/resources/thumbnails/007/068/199/small/summer-sale-banner-with-beach-vibes-decorate-and-product-display-cylindrical-shape-vector.jpg" alt="img1" />
          <div class="banner-text">
            <h2>New Season Arrivals</h2>
            <p>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          </div>
        </div>
        <h3 class="section-title">Latest Products</h3>
        <hr class="divider" />
        <div class="category-filters" id="category-filters">
          <button class="category-btn active" data-category="all">All</button>
          <button class="category-btn" data-category="mens clothing">Men's Clothing</button>
          <button class="category-btn" data-category="womens clothing">Women's Clothing</button>
          <button class="category-btn" data-category="jewelery">Jewelery</button>
          <button class="category-btn" data-category="electronics">Electronics</button>
        </div>
        <div class="products-grid" id="products-list"></div>
      `;
      renderProductsList(filteredProducts);
      attachCategoryFilterListeners();
    }

    function renderProductsList(list) {
        const container = document.getElementById("products-list");
        if (!container) return;
        if (list.length == 0) {
            container.innerHTML = `<p style="text-align:center; color:rgb(106, 118, 130);">No products found.</p>`;
            return;
        }
        container.innerHTML = list.map(p => `
            <div class="product-card">
              <img src="${p.image}" alt="${p.title}" class="product-img" />
              <h6 class="product-title" title="${p.title}">${truncateText(p.title, 12)}</h6>
              <p class="product-desc" title="${p.description}">${truncateText(p.description, 90)}</p>
              <hr class="dividers" />
              <div class="product-price">${formatPrice(p.price)}</div>
              <hr class="dividers" />
              <div class="product-actions">
                <button class="btn-details" data-id="${p.id}">Details</button>
                <button class="btn-add-cart" data-id="${p.id}">Add to Cart</button>
              </div>
            </div>
        `).join("");
        attachProductButtonsListeners();
    }

    function attachCategoryFilterListeners(){
        const buttons = document.querySelectorAll(".category-btn");
        buttons.forEach(btn => {
            btn.onclick = () => {
                buttons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                currentCategory = btn.dataset.category;
                filterProductsByCategory(currentCategory);
            };
        });
    }

    function filterProductsByCategory(category) {
        if (category === "all") {
            filteredProducts = products;
        } else {
            filteredProducts = products.filter(p => {
                const cat = categoryMap[p.category] || p.category;
                return cat.toLowerCase() === category.toLowerCase();
            });
        }
        renderProductsList(filteredProducts);
    }

    function attachProductButtonsListeners() {
        const addCartBtns = document.querySelectorAll(".btn-add-cart");
        addCartBtns.forEach(btn => {
            btn.onclick = () => {
                const id = btn.dataset.id;
                addToCart(id);
            };
        });
    }

    function renderProducts() {
        app.innerHTML = `
          <h3 class="section-title">Latest Products</h3>
          <hr class="divider" />
          <div class="category-filters" id="category-filters">
            <button class="category-btn active" data-category="all">All</button>
            <button class="category-btn" data-category="mens clothing">Men's Clothing</button>
            <button class="category-btn" data-category="womens clothing">Women's Clothing</button>
            <button class="category-btn" data-category="jewelery">Jewelery</button>
            <button class="category-btn" data-category="electronics">Electronics</button>
          </div>
          <div class="products-grid" id="products-list"></div>
        `;
        renderProductsList(filteredProducts);
        attachCategoryFilterListeners();
    }
    
    function renderAbout() {
        app.innerHTML = `
          <div>
            <h2 style="text-align:center;">About Us</h2>
            <hr>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum facere doloremque veritatis odit similique sequi. Odit amet fuga nam quam quasi facilis sed doloremque saepe sint perspiciatis explicabo totam vero quas provident ipsam, veritatis nostrum velit quos recusandae est mollitia esse fugit dolore laudantium. Ex vel explicabo earum unde eligendi autem praesentium, doloremque distinctio nesciunt porro tempore quis eaque labore voluptatibus ea necessitatibus exercitationem tempora molestias. Ad consequuntur veniam sequi ullam tempore vel tenetur soluta dolore sunt maxime aliquam corporis est, quo saepe dolorem optio minus sint nemo totam dolorum! Reprehenderit delectus expedita a alias nam recusandae illo debitis repellat libero, quasi explicabo molestiae saepe, dolorem tempore itaque eveniet quam dignissimos blanditiis excepturi harum numquam vel nihil? Ipsum</p>
            <br>
            <h2 style="text-align:center;">Our Products</h2>
            <div style="display:grid; grid-template-columns: repeat(auto-fit,minmax(180px,1fr)); gap:1rem; margin-top:1rem;">
              <div style="border:1px solid #dee2e6; border-radius:4px; padding:16px; text-align:center;">
                <img src="https://media.istockphoto.com/id/504742864/photo/stylish-business-clothing-for-businessman.jpg?s=612x612&w=0&k=20&c=AsGrhEMNkmpwqaJPBSACPthMuBsmsDIecRkdFXKSnl0=" style="height:150px; object-fit:contain; margin-bottom:8px;" />
                <h5>Men's Clothing</h5>
              </div>
              <div style="border:1px solid #dee2e6; border-radius:4px; padding:16px; text-align:center;">
                <img src="https://img.tatacliq.com/images/i16//437Wx649H/MP000000021635720_437Wx649H_202403211908471.jpeg"img"3 style="height:150px; object-fit:contain; margin-bottom:8px;" />
                <h5>Women's Clothing</h5>
              </div>
              <div style="border:1px solid #dee2e6; border-radius:4px; padding:16px; text-align:center;">
                <img src="https://www.shutterstock.com/image-photo/gold-jewellery-260nw-2547373303.jpg" alt="img4" style="height:150px; object-fit:contain; margin-bottom:8px;" />
                <h5>Jewelery</h5>            
              </div>
              <div style="border:1px solid #dee2e6; border-radius:4px; padding:16px; text-align:center;">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRth4FHgoxD8tpLsEIoE4wqq_hUaSa40dnqwg&s" alt="img5" style="height:150px; object-fit:contain; margin-bottom:8px;" />
                <h5>Electronics</h5>
              </div>
            </div>
          </div>
        `;
    }

    function renderContact() {
        app.innerHTML = `
          <div class="centered-form-container">
            <h2 style="text-align:center;">Contact Us</h2>
            <hr>
            <br>
            <form id="contact-form" novalidate>
              <label for="contact-name">Name</label>
              <input type="text" id="contact-name" placeholder="Enter your name" required/>
              <label for="contact-email">Email address</label>
              <input type="email" id="contact-email" placeholder="name@example.com" required/>
              <label for="contact-message">Message</label>
              <textarea id="contact-message" rows="4" placeholder="Enter your message" required></textarea>
              <button type="submit">Send</button>
            </form>
          </div>
        `;
        document.getElementById("contact-form").onsubmit = e => {
            e.preventDefault();
            alert("Message sent!");
            e.target.reset();
        };
    }

    function renderLogin() {
        app.innerHTML = `
          <div class="centered-form-container">
            <h2 style="text-align:center;">Login</h2>
            <hr>
            <form id="login-form" novalidate>
              <label for="login-email">Email address</label>
              <input type="email" id="login-email" placeholder="name@example.com" required/>
              <label for="login-password">Password</label>
              <input type="password" id="login-password" placeholder="Password" required/>
              <p style="font-size:13px;">New here? <a href="#" id="link-register">Register</a></p>
              <button type="submit">Login</button>
            </form>
          </div>
        `;
        document.getElementById("link-register").onclick = e => {
            e.preventDefault();
            currentPage = "register";
            renderRegister();
        };
        document.getElementById("login-form").onsubmit = e => {
            e.preventDefault();
            alert("Login submitted!");
            e.target.reset();
        };
    }

    function renderRegister() {
        app.innerHTML = `
          <div class="centered-form-container">
            <h2 style="text-align:center;">Register</h2>
            <hr>
            <form id="register-form" novalidate>
              <label for="register-fullname">Full Name</label>
              <input type="text" id="register-email" placeholder="Enter Your Name">
              <label for="register-email">Email address</label>
              <input type="email" id="register-email" placeholder="name@example.com" required/>
              <label for="register-password">Password</label>
              <input type="password" id="required-password" placeholder="Password" required/>
              <p style="font-size:13px;">Already have an account? <a href="#" id="link-login">Login</a></p>
              <button type="submit">Register</button>
            </form>
          </div>
        `;
        document.getElementById("link-login").onclick = e => {
            e.preventDefault();
            currentPage = "login"
            renderLogin();
        };
        document.getElementById("register-form").onsubmit = e => {
            e.preventDefault();
            alert("Registration submitted!");
            e.target.reset();
        };
    }

    function renderCart() {
        const cartItems = Object.values(cart);
        if (cartItems.length === 0) {
            app.innerHTML = `
              <center>
                <h2 style="text-align:center;">Cart</h2>
                <hr>
                <br><br>
                <p style="color: black; font-size: 30px">YOUR CART IS EMPTY</p>
                <button class="btn-continue-shopping"><i class="fa-solid fa-arrow-left"></i>Continue Shopping</button>
              </center
            `;
            return;
        }
        let total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        total += 5;
        app.innerHTML = `
          <h2 style="text-align:center">Cart</h2>
          <hr>
          <br><br>
          <div style="display:flex; gap:16px; flex-wrap:wrap">
            <div style="flex:1; min-width:280px;border: 1px solid rgb(232, 232, 237);border-radius: 4px; padding: 16px;">
             <h4>Item List</h4>
             <hr>
              <ul style="list-style:none; padding:0; margin:0;">
                ${cartItems.map(item => `
                    <li style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap;">
                      <div style:"display:flex; align-items:center; gap:8px; flex:1; min-width:150px;">
                        <img src="${item.image}" alt="${item.title}" style="height:60px"; width:60px; object-fit:contain;"/>
                        <div>
                          <div title="${item.title}" style="font-weight:600; font-size:15px;">${item.title}</div>
                          <div style="font-size:13px; color: rgb(108, 117, 125);">${formatPrice(item.price)}</div>
                        </div>
                      </div>
                      <div style="display:flex; align-items:center; gap:8px; margin-left:auto;">
                        <button style="padding:4px 8px; font-size:8px; cursor:pointer;" data-id="${item.id}" data-action="decrease">-</button>
                        <span>${item.quantity}</span>
                        <button style="padding:4px 8px; font-size:16px; cursor:pointer;" data-id="${item.id}" data-action="increase">+</button>
                      </div>
                    </li>
                    <hr>
                `).join('')}
              </ul>
            </div>
            <div class="order-summary">
              <h3>Order Summary</h3>
              ${cartItems.map(item => `
                <div class="summary-item">
                  <span>${item.title} (${item.quantity})</span>
                  <span>${formatPrice(item.price * item.quantity)}</span>
                </div>
                `).join('')}
                <div class="summary-item">
                  <strong>Shipping</strong>
                  <strong>$ 5.00</strong>
                </div>
                <div class="summary-total">
                  <span>Total amount</span>
                  <span>${formatPrice(total)}</span>
                </div>
                <button class="checkout-btn">Go to Checkout</button>
            </div>
          </div>
        `;
        const qtyButtons = app.querySelectorAll('button[data-id]');
        qtyButtons.forEach(btn => {
            btn.onclick = () => {
                const id = btn.dataset.id;
                const action = btn.dataset.action;
                if (action == "increase") {
                    cart[id].quantity++;
                } else if (action == "decrease") {
                    cart[id].quantity--;
                    if (cart[id].quantity <= 0) {
                        delete cart[id];
                    }
                }
                updateCartCount();
                renderCart();
            };
        }); 
    }

    function addToCart(id){
        const product = products.find(p => p.id == id);
        if (!product) return;
        if (cart[id]) {
            cart[id].quantity++;
        } else{
            cart[id] = {...product, quantity: 1};
        }
        updateCartCount();
    }

    function updateCartCount() {
        const count = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);
        cartCountE1.textContent = count;
    }

    function setupNavigation() {
        document.getElementById("nav-home").onclick = () => { currentPage = "home"; renderHome(); };
        document.getElementById("nav-home-link").onclick = () => { currentPage = "home"; renderHome(); };
        document.getElementById("nav-products-link").onclick = () => { currentPage = "products"; renderProducts(); };
        document.getElementById("nav-about-link").onclick = () => { currentPage = "about"; renderAbout(); };
        document.getElementById("nav-contact-link").onclick = () => { currentPage = "contact"; renderContact(); };
        document.getElementById("nav-login").onclick = () => { currentPage = "login"; renderLogin(); };
        document.getElementById("nav-register").onclick = () => { currentPage = "register"; renderRegister(); };
        document.getElementById("nav-cart").onclick = () => { currentPage = "cart"; renderCart(); };
    }

    async function init() {
        await fetchProducts();
        setupNavigation();
        renderHome();
        updateCartCount();
        
    }

    init();
})();