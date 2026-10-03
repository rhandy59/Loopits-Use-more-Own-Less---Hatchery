/* =========================================================
   LOOPIT - EQUIPMENT RENTAL WEBSITE
   HTML + CSS + JavaScript
========================================================= */


/* =========================================================
   PRODUCT DATA
========================================================= */

const products = [
    {
        id: 1,
        name: "Canon EOS R50",
        category: "Cameras",
        price: 50000,
        location: "BINUS Senayan",
        image: "Images/Canon.jpg",
        rating: 4.9
    },

    {
        id: 2,
        name: "Epson EB-X06 Projector",
        category: "Projectors",
        price: 85000,
        location: "BINUS Anggrek",
        image: "Images/Projector.jpg",
        rating: 4.8
    },

    {
        id: 3,
        name: "Rimowa Cabin Luggage",
        category: "Travel",
        price: 100000,
        location: "BINUS Anggrek",
        image: "Images/Luggage.jpg",
        rating: 4.9
    },

    {
        id: 4,
        name: "Naturehike 4P Tent",
        category: "Camping",
        price: 75000,
        location: "BINUS Senayan",
        image: "Images/Tent.jpg",
        rating: 4.7
    },

    {
        id: 5,
        name: "Sony Alpha Camera Kit",
        category: "Cameras",
        price: 125000,
        location: "BINUS Senayan",
        image: "Images/Polaroid.jpg",
        rating: 4.8
    },

    {
        id: 6,
        name: "Portable Mini Projector",
        category: "Projectors",
        price: 60000,
        location: "BINUS Kemanggisan",
        image: "Images/Projector.jpg",
        rating: 4.6
    },

    {
        id: 7,
        name: "Party Decor Set",
        category: "Events",
        price: 75000,
        location: "BINUS Kemanggisan",
        image: "Images/Party.jpg",
        rating: 4.9
    },

    {
        id: 8,
        name: "Tennis Racket",
        category: "Sports",
        price: 60000,
        location: "BINUS Alam Sutera",
        image: "Images/Tennis.jpg",
        rating: 4.7
    },

    {
        id: 9,
        name: "DJ Speaker",
        category: "Audio",
        price: 130000,
        location: "BINUS Alam Sutera",
        image: "Images/Speaker.jpg",
        rating: 4.8
    },

    {
        id: 10,
        name: "Mountain Bike",
        category: "Sports",
        price: 110000,
        location: "BINUS Kemanggisan",
        image: "Images/Bike.jpg",
        rating: 4.9
    },

    {
        id: 11,
        name: "Folding Chair Set",
        category: "Events",
        price: 45000,
        location: "BINUS Anggrek",
        image: "Images/Chair.jpg",
        rating: 4.6
    },

    {
        id: 12,
        name: "GoPro Action Camera",
        category: "Cameras",
        price: 100000,
        location: "Images/GoPro.jpg",
        rating: 4.8
    }
];


/* =========================================================
   ORDERS
========================================================= */

const orders = [
    {
        id: "LP-10482",
        product: "Canon EOS R50",
        date: "Sep 28, 2026",
        status: "Completed",
        total: 100000,
        days: 2,
        image: "Images/Canon.Jpg"
    },

    {
        id: "LP-10391",
        product: "Epson EB-X06 Projector",
        date: "Sep 21, 2026",
        status: "Completed",
        total: 85000,
        days: 1,
        image: "Images/Projector.Jpg"
    },

    {
        id: "LP-10274",
        product: "Naturehike 4P Tent",
        date: "Sep 12, 2026",
        status: "Cancelled",
        total: 75000,
        days: 1,
        image: "Images/Tent.jpg"
    }
];


/* =========================================================
   LOCAL STORAGE
========================================================= */

let cart = JSON.parse(
    localStorage.getItem("loopitCart") || "[]"
);

let favorites = new Set(
    JSON.parse(
        localStorage.getItem("loopitFavorites") || "[]"
    )
);


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

const app = document.getElementById("app");
const toast = document.getElementById("toast");


/* =========================================================
   HELPER FUNCTIONS
========================================================= */

function money(number) {
    return "Rp " + Number(number).toLocaleString("id-ID");
}


function save() {
    localStorage.setItem(
        "loopitCart",
        JSON.stringify(cart)
    );

    localStorage.setItem(
        "loopitFavorites",
        JSON.stringify([...favorites])
    );
}


function showToast(message) {
    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}


function product(id) {
    return products.find(
        item => item.id === Number(id)
    );
}


function navigate(path) {
    location.hash = path;
}


/* =========================================================
   LOCAL DATE HELPERS
========================================================= */

function getToday() {
    const today = new Date();

    const year = today.getFullYear();

    const month = String(
        today.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        today.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


function getTomorrow() {
    const tomorrow = new Date();

    tomorrow.setDate(
        tomorrow.getDate() + 1
    );

    const year = tomorrow.getFullYear();

    const month = String(
        tomorrow.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        tomorrow.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


function addDaysToDate(dateString, days) {
    const date = new Date(
        dateString + "T00:00:00"
    );

    date.setDate(
        date.getDate() + Number(days)
    );

    const year = date.getFullYear();

    const month = String(
        date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


function formatDate(dateString) {
    if (!dateString) return "";

    const date = new Date(
        dateString + "T00:00:00"
    );

    return date.toLocaleDateString(
        "en-US",
        {
            month: "short",
            day: "numeric",
            year: "numeric"
        }
    );
}


function calculateDays(
    startDate,
    endDate
) {
    const start = new Date(
        startDate + "T00:00:00"
    );

    const end = new Date(
        endDate + "T00:00:00"
    );

    const difference = end - start;

    return Math.max(
        1,
        Math.ceil(
            difference /
            (1000 * 60 * 60 * 24)
        )
    );
}


/* =========================================================
   NAVBAR
========================================================= */

function navbar(active = "home") {

    return `
        <header class="navbar">

            <div class="navbar-inner">

                <div
                    class="brand"
                    onclick="navigate('#/home')"
                >

                    <img
                        src="Images/Loopits.Jpeg"
                        alt="Loopit Logo"
                        class="loopit-logo"
                    >

                </div>


                <nav class="nav-links">

                    <a
                        href="#/home"
                        class="nav-link ${
                            active === "home"
                                ? "active"
                                : ""
                        }"
                    >
                        Homepage
                    </a>


                    <a
                        href="#/products"
                        class="nav-link ${
                            active === "products"
                                ? "active"
                                : ""
                        }"
                    >
                        Products
                    </a>


                    <a
                        href="#/orders"
                        class="nav-link ${
                            active === "orders"
                                ? "active"
                                : ""
                        }"
                    >
                        Orders

                        <span class="nav-number">
                            ${orders.length}
                        </span>

                    </a>

                </nav>


                <div class="nav-right">

                    <button
                        class="nav-icon"
                        onclick="navigate('#/search')"
                        aria-label="Search"
                    >
                        ⌕
                    </button>


                    <button
                        class="nav-icon cart-button"
                        onclick="navigate('#/cart')"
                        aria-label="Cart"
                    >

                        🛒

                        ${
                            cart.length
                                ? `
                                    <span class="cart-number">
                                        ${cart.length}
                                    </span>
                                `
                                : ""
                        }

                    </button>


                    <button
                        class="profile-button"
                        onclick="navigate('#/profile')"
                    >

                        <div class="profile-avatar">
                            AT
                        </div>

                        <div class="profile-text">

                            <strong>
                                Attasya
                            </strong>

                            <span>
                                Verified student
                            </span>

                        </div>

                        <span class="profile-arrow">
                            ⌄
                        </span>

                    </button>

                </div>

            </div>

        </header>
    `;
}


/* =========================================================
   FOOTER
========================================================= */

function footer() {

    return `
        <footer class="footer">

            <div class="footer-inner">

                <div>
                    © 2026 Loopit
                </div>

                <div>
                    Rent more. Own less.
                </div>

            </div>

        </footer>
    `;
}


/* =========================================================
   PAGE LAYOUT
========================================================= */

function layout(
    content,
    active = ""
) {

    return `
        <div class="app-shell">

            ${navbar(active)}

            <main>
                ${content}
            </main>

            ${footer()}

        </div>
    `;
}


/* =========================================================
   PRODUCT CARD
========================================================= */

function productCard(p) {

    return `
        <article
            class="product-card"
            onclick="navigate('#/product/${p.id}')"
        >

            <div class="product-image">

                <span class="verified-badge">
                    ✓ Verified owner
                </span>


                <button
                    class="favorite-button"
                    onclick="
                        event.stopPropagation();
                        toggleFav(${p.id})
                    "
                >
                    ${
                        favorites.has(p.id)
                            ? "♥"
                            : "♡"
                    }
                </button>


                <img
                    src="${p.image}"
                    alt="${p.name}"
                    onerror="this.style.display='none'"
                >


                <span class="rating-badge">
                    ★ ${p.rating}
                </span>

            </div>


            <div class="product-info">

                <div class="product-category">
                    ${p.category}
                </div>


                <h3>
                    ${p.name}
                </h3>


                <div class="product-bottom">

                    <div class="product-price">

                        <strong>
                            ${money(p.price)}
                        </strong>

                        <span>
                            /day
                        </span>

                    </div>


                    <button
                        class="rent-button"
                        onclick="
                            event.stopPropagation();
                            navigate('#/booking/${p.id}')
                        "
                    >
                        Rent Now
                    </button>

                </div>

            </div>

        </article>
    `;
}


/* =========================================================
   PRODUCT GRID
========================================================= */

function productGrid(list) {

    if (!list.length) {

        return `
            <div class="empty-state">

                <div class="empty-icon">
                    🔍
                </div>

                <h3>
                    No products found
                </h3>

                <p>
                    Try another search or category.
                </p>

            </div>
        `;
    }


    return `
        <div class="product-grid">

            ${list
                .map(productCard)
                .join("")}

        </div>
    `;
}


/* =========================================================
   FAVORITES
========================================================= */

function toggleFav(id) {

    if (favorites.has(id)) {

        favorites.delete(id);

        showToast(
            "Removed from favorites"
        );

    } else {

        favorites.add(id);

        showToast(
            "Added to favorites"
        );
    }

    save();

    render();
}


/* =========================================================
   HOMEPAGE
========================================================= */

function home() {

    const popular =
        products.slice(0, 6);


    return layout(`

        <section class="hero">

            <div class="hero-content">

                <div class="hero-badge">

                    <span></span>

                    Built for your campus community

                </div>


                <h1>

                    Rent everyday items from

                    <span>
                        people near you.
                    </span>

                </h1>


                <p>

                    Affordable, sustainable, and within
                    your community. Find what you need
                    without buying it.

                </p>


                <form
                    class="hero-search"
                    onsubmit="
                        event.preventDefault();

                        navigate(
                            '#/search?q=' +
                            encodeURIComponent(
                                this.q.value
                            )
                        )
                    "
                >

                    <span class="search-symbol">
                        ⌕
                    </span>

                    <input
                        type="text"
                        name="q"
                        placeholder="What do you need today?"
                    >

                    <button type="submit">
                        Search
                    </button>

                </form>


                <div class="hero-categories">

                    <button
                        onclick="
                            navigate(
                                '#/search?category=Cameras'
                            )
                        "
                    >
                        Cameras
                    </button>


                    <button
                        onclick="
                            navigate(
                                '#/search?category=Projectors'
                            )
                        "
                    >
                        Projectors
                    </button>


                    <button
                        onclick="
                            navigate(
                                '#/search?category=Travel'
                            )
                        "
                    >
                        Luggage
                    </button>


                    <button
                        onclick="
                            navigate(
                                '#/search?category=Camping'
                            )
                        "
                    >
                        Camping
                    </button>


                    <button
                        onclick="
                            navigate(
                                '#/search?category=Sports'
                            )
                        "
                    >
                        Sports
                    </button>

                </div>

            </div>

        </section>


        <section class="trust-bar">

            <div class="trust-item">

                <div class="trust-icon">
                    ✓
                </div>

                <div>

                    <strong>
                        Verified Students
                    </strong>

                    <span>
                        University ID checked
                    </span>

                </div>

            </div>


            <div class="trust-divider"></div>


            <div class="trust-item">

                <div class="trust-icon">
                    ♧
                </div>

                <div>

                    <strong>
                        Refundable Escrow Deposit
                    </strong>

                    <span>
                        Your money stays protected
                    </span>

                </div>

            </div>


            <div class="trust-divider"></div>


            <div class="trust-item">

                <div class="trust-icon">
                    ▣
                </div>

                <div>

                    <strong>
                        Condition Photo Check
                    </strong>

                    <span>
                        Proof before every rental
                    </span>

                </div>

            </div>


            <div class="trust-divider"></div>


            <div class="trust-item">

                <div class="trust-icon">
                    ◉
                </div>

                <div>

                    <strong>
                        Campus Handover
                    </strong>

                    <span>
                        Meet safely on campus
                    </span>

                </div>

            </div>

        </section>


        <section class="home-products">

            <div class="section-heading">

                <div>

                    <span class="section-label">
                        EXPLORE YOUR CAMPUS
                    </span>

                    <h2>
                        Popular Near You
                    </h2>

                </div>


                <button
                    class="view-all"
                    onclick="
                        navigate('#/products')
                    "
                >
                    View all items →
                </button>

            </div>


            ${productGrid(popular)}

        </section>

    `, "home");
}


/* =========================================================
   PRODUCTS PAGE
========================================================= */

function productsPage() {

    const categories = [
        "All gear",
        "Cameras",
        "Audio",
        "Camping",
        "Travel",
        "Projectors",
        "Sports",
        "Events"
    ];


    return layout(`

        <section class="products-page">

            <aside class="filter-sidebar">

                <div class="filter-title">

                    <span class="filter-icon">
                        ☷
                    </span>

                    <strong>
                        Filters
                    </strong>

                </div>


                <div class="filter-line"></div>


                <div class="filter-section">

                    <span class="filter-label">
                        CATEGORIES
                    </span>


                    <div class="category-filters">

                        ${categories
                            .map(
                                (category, index) => `

                                <button
                                    class="
                                        category-filter
                                        ${
                                            index === 0
                                                ? "selected"
                                                : ""
                                        }
                                    "
                                    data-category="${category}"
                                    onclick="
                                        selectCategory(
                                            '${category}'
                                        )
                                    "
                                >

                                    <span>
                                        ${category}
                                    </span>

                                    <small>
                                        ${
                                            index === 0
                                                ? products.length
                                                : products.filter(
                                                    p =>
                                                        p.category ===
                                                        category
                                                ).length
                                        }
                                    </small>

                                </button>

                            `
                            )
                            .join("")}

                    </div>

                </div>


                <div class="filter-line"></div>


                <div class="filter-section">

                    <span class="filter-label">
                        PRICE PER DAY
                    </span>


                    <input
                        type="range"
                        min="20000"
                        max="500000"
                        value="120000"
                        class="price-slider"
                        id="priceSlider"
                        oninput="
                            updatePrice(this.value)
                        "
                    >


                    <div class="price-range">

                        <span>
                            Rp 20,000
                        </span>

                        <span>
                            Rp 500,000
                        </span>

                    </div>

                </div>


                <div class="filter-line"></div>


                <div class="filter-section">

                    <span class="filter-label">
                        HANDOVER CAMPUS
                    </span>


                    <select
                        class="campus-select"
                        onchange="
                            filterCampus(this.value)
                        "
                    >

                        <option value="">
                            All campuses
                        </option>

                        <option>
                            BINUS Anggrek
                        </option>

                        <option>
                            BINUS Kemanggisan
                        </option>

                        <option>
                            BINUS Senayan
                        </option>

                        <option>
                            BINUS Alam Sutera
                        </option>

                    </select>

                </div>


                <div class="filter-line"></div>


                <div class="filter-section">

                    <span class="filter-label">
                        ITEM CONDITION
                    </span>


                    <label class="check-option">

                        <input
                            type="checkbox"
                            checked
                        >

                        <span>
                            Like New
                        </span>

                    </label>


                    <label class="check-option">

                        <input
                            type="checkbox"
                        >

                        <span>
                            Good
                        </span>

                    </label>

                </div>

            </aside>


            <section class="products-content">

                <div class="products-toolbar">

                    <div>

                        <strong id="items-count">
                            ${products.length}
                        </strong>

                        items available near you

                    </div>


                    <select
                        class="sort-select"
                        id="sortSelect"
                        onchange="
                            sortProducts(this.value)
                        "
                    >

                        <option value="popular">
                            Most Popular
                        </option>

                        <option value="low">
                            Price: Low to High
                        </option>

                        <option value="high">
                            Price: High to Low
                        </option>

                    </select>

                </div>


                <div id="productsResult">

                    ${productGrid(products)}

                </div>

            </section>

        </section>

    `, "products");
}


/* =========================================================
   PRODUCT FILTER
========================================================= */

let activeCategory = "All gear";


function selectCategory(category) {

    activeCategory = category;

    document
        .querySelectorAll(".category-filter")
        .forEach(button => {

            button.classList.toggle(
                "selected",
                button.dataset.category === category
            );

        });

    updateProducts();
}


function updatePrice(value) {

    updateProducts(
        Number(value)
    );
}


function filterCampus(value) {

    updateProducts(
        null,
        value
    );
}


function sortProducts(type) {

    let list = getFilteredProducts();


    if (type === "low") {

        list.sort(
            (a, b) =>
                a.price - b.price
        );

    }


    if (type === "high") {

        list.sort(
            (a, b) =>
                b.price - a.price
        );

    }


    document.getElementById(
        "productsResult"
    ).innerHTML =
        productGrid(list);


    document.getElementById(
        "items-count"
    ).textContent =
        list.length;
}


function getFilteredProducts(
    maxPrice = null,
    campus = null
) {

    let list = [...products];


    if (activeCategory !== "All gear") {

        list = list.filter(
            item =>
                item.category ===
                activeCategory
        );

    }


    if (maxPrice) {

        list = list.filter(
            item =>
                item.price <= maxPrice
        );

    }


    if (campus) {

        list = list.filter(
            item =>
                item.location === campus
        );

    }


    return list;
}


function updateProducts(
    maxPrice = null,
    campus = null
) {

    const result =
        document.getElementById(
            "productsResult"
        );


    if (!result) return;


    const list =
        getFilteredProducts(
            maxPrice,
            campus
        );


    result.innerHTML =
        productGrid(list);


    const count =
        document.getElementById(
            "items-count"
        );


    if (count) {

        count.textContent =
            list.length;

    }
}


/* =========================================================
   PRODUCT DETAIL
========================================================= */

function detailPage(id) {

    const p = product(id);


    if (!p) {

        return layout(
            `
                <div class="empty-state">

                    Product not found.

                </div>
            `,
            "products"
        );

    }


    return layout(`

        <section class="detail-page">

            <button
                class="back-button"
                onclick="
                    navigate('#/products')
                "
            >
                ← Back to Products
            </button>


            <div class="detail-grid">


                <div class="detail-image">

                    <img
                        src="${p.image}"
                        alt="${p.name}"
                    >

                </div>


                <div class="detail-card">

                    <span class="detail-category">
                        ${p.category}
                    </span>


                    <h1>
                        ${p.name}
                    </h1>


                    <div class="detail-rating">

                        ★ ${p.rating}

                        <span>
                            · 24 reviews
                        </span>

                    </div>


                    <div class="detail-price">

                        ${money(p.price)}

                        <span>
                            / day
                        </span>

                    </div>


                    <p class="detail-description">

                        High-quality
                        ${p.name.toLowerCase()}
                        available for short-term rental.
                        Clean, tested, and ready to use.

                    </p>


                    <div class="detail-meta">

                        <div>

                            <span>
                                LOCATION
                            </span>

                            <strong>
                                ◉ ${p.location}
                            </strong>

                        </div>


                        <div>

                            <span>
                                AVAILABILITY
                            </span>

                            <strong>
                                Available today
                            </strong>

                        </div>

                    </div>


                    <div class="owner-box">

                        <div class="owner-avatar">
                            R
                        </div>

                        <div>

                            <strong>
                                Rhandy's Rentals
                            </strong>

                            <span>
                                ★ 4.9 · Verified owner
                            </span>

                        </div>

                    </div>


                    <button
                        class="secondary-button full-button"
                        onclick="
                            addToCart(${p.id})
                        "
                    >
                        Add to cart
                    </button>


                    <button
                        class="primary-button full-button"
                        onclick="
                            navigate(
                                '#/booking/${p.id}'
                            )
                        "
                    >
                        Rent Now →
                    </button>

                </div>

            </div>


            <div class="about-card">

                <h2>
                    About this item
                </h2>

                <p>

                    This item is offered by a local
                    community member. Rental includes
                    basic accessories and a quick
                    handover guide. Please return the
                    item in the same condition.

                </p>

            </div>

        </section>

    `, "products");
}


/* =========================================================
   BOOKING PAGE
========================================================= */

function bookingPage(id) {

    const p = product(id);


    if (!p) {

        return layout(
            `
                <div class="empty-state">

                    <h3>
                        Product not found
                    </h3>

                    <button
                        class="primary-button"
                        onclick="
                            navigate('#/products')
                        "
                    >
                        Back to Products
                    </button>

                </div>
            `
        );

    }


    const today = getToday();
    const tomorrow = getTomorrow();


    return layout(`

        <section class="booking-page">

            <div class="booking-header">

                <button
                    class="back-button"
                    onclick="
                        navigate(
                            '#/product/${p.id}'
                        )
                    "
                >
                    ← Back to ${p.name}
                </button>


                <h1>
                    Complete your booking
                </h1>


                <p>
                    Confirm your details and secure your rental.
                </p>

            </div>


            <div class="booking-layout">


                <!-- LEFT SIDE -->

                <div class="booking-left">


                    <!-- RENTAL CART -->

                    <section class="booking-card">

                        <div class="booking-section-title">

                            <div class="section-number cart-symbol">
                                🛒
                            </div>

                            <h2>
                                Rental cart
                            </h2>

                        </div>


                        <div class="booking-product">

                            <div class="booking-product-image">

                                <img
                                    src="${p.image}"
                                    alt="${p.name}"
                                >

                            </div>


                            <div class="booking-product-info">

                                <span class="booking-category">
                                    ${p.category} · VERIFIED OWNER
                                </span>


                                <h3>
                                    ${p.name}
                                </h3>


                                <div class="booking-product-controls">

                                    <div class="booking-date-preview">

                                        <span id="datePreview">
                                            ${formatDate(tomorrow)}
                                            →
                                            ${formatDate(
                                                addDaysToDate(
                                                    tomorrow,
                                                    1
                                                )
                                            )}
                                        </span>

                                    </div>


                                    <select
                                        id="bookingDays"
                                        onchange="
                                            updateBookingSummary(
                                                ${p.id}
                                            );
                                            updateBookingDate(
                                                ${p.id}
                                            )
                                        "
                                    >

                                        <option value="1">
                                            Qty 1 · 1 Day
                                        </option>

                                        <option value="2">
                                            Qty 1 · 2 Days
                                        </option>

                                        <option value="3">
                                            Qty 1 · 3 Days
                                        </option>

                                        <option value="4">
                                            Qty 1 · 4 Days
                                        </option>

                                        <option value="5">
                                            Qty 1 · 5 Days
                                        </option>

                                    </select>

                                </div>

                            </div>


                            <div class="booking-product-price">

                                <strong>
                                    ${money(p.price)}
                                </strong>

                                <span>
                                    / day
                                </span>

                            </div>

                        </div>

                    </section>


                    <!-- RENTER DETAILS -->

                    <section class="booking-card">

                        <div class="booking-section-title">

                            <div class="section-number">
                                1
                            </div>

                            <h2>
                                Renter details
                            </h2>

                        </div>


                        <div class="form-grid booking-form-grid">

                            <div class="form-field">

                                <label>
                                    FULL NAME
                                </label>

                                <input
                                    id="renterName"
                                    value="Attasya"
                                    type="text"
                                >

                            </div>


                            <div class="form-field">

                                <label>
                                    WHATSAPP NUMBER
                                </label>

                                <input
                                    id="renterPhone"
                                    value="+62 812-3456-7890"
                                    type="text"
                                >

                            </div>


                            <div class="form-field">

                                <label>
                                    CAMPUS ID
                                </label>

                                <input
                                    id="campusId"
                                    value="BN-2540198"
                                    type="text"
                                >

                            </div>

                        </div>

                    </section>


                    <!-- HANDOVER DETAILS -->

                    <section class="booking-card">

                        <div class="booking-section-title">

                            <div class="section-number">
                                2
                            </div>

                            <h2>
                                Handover details
                            </h2>

                        </div>


                        <div class="form-field">

                            <label>
                                CAMPUS MEETING POINT
                            </label>

                            <select
                                id="meetingPoint"
                            >

                                <option>
                                    ${p.location} - Lobby Main Gate
                                </option>

                                <option>
                                    ${p.location} - Student Lounge
                                </option>

                                <option>
                                    ${p.location} - Library
                                </option>

                            </select>

                        </div>


                        <div class="handover-grid">

                            <div class="form-field">

                                <label>
                                    MEETUP DATE
                                </label>

                                <input
                                    type="date"
                                    id="startDate"
                                    min="${today}"
                                    value="${tomorrow}"
                                    onchange="
                                        updateBookingDate(
                                            ${p.id}
                                        )
                                    "
                                >

                            </div>


                            <div class="form-field">

                                <label>
                                    MEETUP TIME
                                </label>

                                <select
                                    id="meetingTime"
                                >

                                    <option>
                                        10:00 AM
                                    </option>

                                    <option>
                                        11:00 AM
                                    </option>

                                    <option>
                                        01:00 PM
                                    </option>

                                    <option>
                                        02:00 PM
                                    </option>

                                    <option>
                                        03:00 PM
                                    </option>

                                    <option>
                                        04:00 PM
                                    </option>

                                    <option>
                                        05:00 PM
                                    </option>

                                </select>

                            </div>

                        </div>

                    </section>


                    <!-- PAYMENT -->

                    <section class="booking-card">

                        <div class="booking-section-title">

                            <div class="section-number">
                                3
                            </div>

                            <h2>
                                Payment method
                            </h2>

                        </div>


                        <label class="payment-option selected">

                            <input
                                type="radio"
                                name="paymentMethod"
                                value="CampusPay"
                                checked
                            >

                            <div class="payment-icon">
                                💳
                            </div>

                            <div>

                                <strong>
                                    CampusPay
                                </strong>

                                <span>
                                    Secure student payment
                                </span>

                            </div>

                            <span class="payment-check">
                                ✓
                            </span>

                        </label>


                        <label class="payment-option">

                            <input
                                type="radio"
                                name="paymentMethod"
                                value="Bank Transfer"
                            >

                            <div class="payment-icon">
                                🏦
                            </div>

                            <div>

                                <strong>
                                    Bank Transfer
                                </strong>

                                <span>
                                    Manual payment confirmation
                                </span>

                            </div>

                            <span class="payment-check">
                                ✓
                            </span>

                        </label>

                    </section>

                </div>


                <!-- RIGHT SIDE -->

                <aside class="booking-summary-card">

                    <h2>
                        Order summary
                    </h2>


                    <div class="summary-product">

                        <div class="summary-product-image">

                            <img
                                src="${p.image}"
                                alt="${p.name}"
                            >

                        </div>


                        <div>

                            <span class="day-badge">
                                1 DAY RENTAL
                            </span>

                            <h3>
                                ${p.name}
                            </h3>

                            <p>
                                Owned by
                                <strong>
                                    Rhandy's Rentals
                                </strong>
                            </p>

                        </div>

                    </div>


                    <div class="summary-divider"></div>


                    <div class="summary-row">

                        <span>
                            Rental + platform fee
                        </span>

                        <strong id="summaryRentalFee">
                            ${money(
                                p.price +
                                Math.round(
                                    p.price * 0.05
                                )
                            )}
                        </strong>

                    </div>


                    <div class="summary-row">

                        <span>
                            Refundable deposit
                        </span>

                        <strong>
                            ${money(1000000)}
                        </strong>

                    </div>


                    <div class="escrow-box">

                        <span>
                            🔒
                        </span>

                        <p>
                            Your deposit is held safely in escrow
                            and automatically returned after a
                            successful handover.
                        </p>

                    </div>


                    <div class="summary-divider"></div>


                    <div class="total-payment">

                        <span>
                            Total Payment
                        </span>

                        <strong id="bookingTotal">
                            ${money(
                                p.price +
                                Math.round(
                                    p.price * 0.05
                                ) +
                                1000000
                            )}
                        </strong>

                    </div>


                    <button
                        class="pay-button"
                        onclick="
                            confirmBooking(
                                ${p.id}
                            )
                        "
                    >

                        Pay & Confirm Booking

                    </button>


                    <div class="secure-payment">

                        🔒 Secure payment protected by Loopit

                    </div>

                </aside>

            </div>

        </section>

    `);
}


/* =========================================================
   BOOKING CALCULATIONS
========================================================= */

function getBookingDays() {

    const select =
        document.getElementById(
            "bookingDays"
        );

    if (!select) return 1;

    return Number(select.value);
}


function updateBookingSummary(id) {

    const p = product(id);

    if (!p) return;


    const days =
        getBookingDays();


    const rentalFee =
        p.price * days;


    const platformFee =
        Math.round(
            rentalFee * 0.05
        );


    const deposit =
        1000000;


    const total =
        rentalFee +
        platformFee +
        deposit;


    const rentalElement =
        document.getElementById(
            "summaryRentalFee"
        );


    const totalElement =
        document.getElementById(
            "bookingTotal"
        );


    if (rentalElement) {

        rentalElement.textContent =
            money(
                rentalFee +
                platformFee
            );

    }


    if (totalElement) {

        totalElement.textContent =
            money(total);

    }


    const badge =
        document.querySelector(
            ".day-badge"
        );


    if (badge) {

        badge.textContent =
            `${days} DAY${days > 1 ? "S" : ""} RENTAL`;

    }
}


function updateBookingDate(id) {

    const startInput =
        document.getElementById(
            "startDate"
        );


    const preview =
        document.getElementById(
            "datePreview"
        );


    if (!startInput || !preview) return;


    const start =
        startInput.value;


    if (!start) return;


    const days =
        getBookingDays();


    const endString =
        addDaysToDate(
            start,
            days
        );


    preview.textContent =
        `${formatDate(start)} → ${formatDate(endString)}`;
}


/* =========================================================
   CONFIRM BOOKING
========================================================= */

function confirmBooking(id) {

    const p = product(id);

    if (!p) return;


    const renterName =
        document.getElementById(
            "renterName"
        ).value.trim();


    const renterPhone =
        document.getElementById(
            "renterPhone"
        ).value.trim();


    const campusId =
        document.getElementById(
            "campusId"
        ).value.trim();


    const start =
        document.getElementById(
            "startDate"
        ).value;


    const meetingPoint =
        document.getElementById(
            "meetingPoint"
        ).value;


    const meetingTime =
        document.getElementById(
            "meetingTime"
        ).value;


    const paymentMethod =
        document.querySelector(
            'input[name="paymentMethod"]:checked'
        )?.value || "CampusPay";


    const days =
        getBookingDays();


    if (
        !renterName ||
        !renterPhone ||
        !campusId ||
        !start
    ) {

        alert(
            "Please complete all required booking details."
        );

        return;
    }


    const rentalFee =
        p.price * days;


    const platformFee =
        Math.round(
            rentalFee * 0.05
        );


    const deposit =
        1000000;


    const total =
        rentalFee +
        platformFee +
        deposit;


    const orderId =
        "LP-" +
        Math.floor(
            10000 +
            Math.random() * 90000
        );


    const order = {

        id: orderId,

        product: p.name,

        date: formatDate(start),

        status: "Confirmed",

        total: total,

        days: days,

        image: p.image,

        startDate: start,

        meetingPoint: meetingPoint,

        meetingTime: meetingTime,

        renterName: renterName,

        renterPhone: renterPhone,

        campusId: campusId,

        paymentMethod: paymentMethod

    };


    orders.unshift(order);


    showToast(
        "Booking confirmed successfully!"
    );


    setTimeout(() => {

        navigate(
            "#/order/" +
            orderId
        );

    }, 700);
}


/* =========================================================
   CART
========================================================= */

function addToCart(id) {

    id = Number(id);


    if (!cart.includes(id)) {

        cart.push(id);

        save();

        showToast(
            "Added to cart"
        );

        render();

    } else {

        showToast(
            "This item is already in your cart"
        );

    }
}


function removeCart(id) {

    id = Number(id);


    cart =
        cart.filter(
            item =>
                Number(item) !== id
        );


    save();

    render();

    showToast(
        "Removed from cart"
    );
}


function checkout() {

    if (!cart.length) return;


    showToast(
        "Order placed successfully!"
    );


    cart = [];

    save();


    setTimeout(() => {

        navigate(
            "#/orders"
        );

    }, 700);
}


/* =========================================================
   CART PAGE
========================================================= */

function cartPage() {

    const items =
        cart
            .map(product)
            .filter(Boolean);


    const subtotal =
        items.reduce(
            (sum, p) =>
                sum + p.price,
            0
        );


    const service =
        Math.round(
            subtotal * 0.05
        );


    return layout(`

        <section class="standard-page">

            <h1 class="page-title">
                Cart
            </h1>


            <p class="page-subtitle">
                Review your rental items before checkout.
            </p>


            ${
                items.length

                    ? `

                        <div class="cart-layout">

                            <div class="cart-items">

                                ${items
                                    .map(
                                        p => `

                                        <div class="cart-item">

                                            <div class="cart-image">

                                                <img
                                                    src="${p.image}"
                                                    alt="${p.name}"
                                                >

                                            </div>


                                            <div class="cart-main">

                                                <h3>
                                                    ${p.name}
                                                </h3>

                                                <p>
                                                    ${p.location}
                                                    ·
                                                    ${money(p.price)}
                                                    / day
                                                </p>

                                            </div>


                                            <button
                                                class="remove-button"
                                                onclick="
                                                    removeCart(${p.id})
                                                "
                                            >
                                                Remove
                                            </button>

                                        </div>

                                    `
                                    )
                                    .join("")}

                            </div>


                            <aside class="summary-card">

                                <h3>
                                    Rental Summary
                                </h3>


                                <div class="summary-row">

                                    <span>
                                        Subtotal
                                    </span>

                                    <span>
                                        ${money(subtotal)}
                                    </span>

                                </div>


                                <div class="summary-row">

                                    <span>
                                        Service fee
                                    </span>

                                    <span>
                                        ${money(service)}
                                    </span>

                                </div>


                                <div class="summary-row">

                                    <span>
                                        Delivery
                                    </span>

                                    <span>
                                        Free
                                    </span>

                                </div>


                                <div class="summary-total">

                                    <span>
                                        Total
                                    </span>

                                    <strong>
                                        ${money(
                                            subtotal +
                                            service
                                        )}
                                    </strong>

                                </div>


                                <button
                                    class="primary-button full-button"
                                    onclick="
                                        checkout()
                                    "
                                >
                                    Checkout
                                </button>

                            </aside>

                        </div>

                    `

                    : `

                        <div class="empty-state">

                            <div class="empty-icon">
                                🛒
                            </div>

                            <h3>
                                Your cart is empty
                            </h3>

                            <p>
                                Find something useful to rent.
                            </p>

                            <button
                                class="primary-button"
                                onclick="
                                    navigate('#/products')
                                "
                            >
                                Browse Products
                            </button>

                        </div>

                    `
            }

        </section>

    `);
}


/* =========================================================
   ORDERS PAGE
========================================================= */

function ordersPage() {

    return layout(`

        <section class="standard-page">

            <h1 class="page-title">
                Orders
            </h1>


            <p class="page-subtitle">
                Track your current and previous rentals.
            </p>


            <div class="orders-list">

                ${
                    orders.length

                        ? orders
                            .map(
                                order => `

                                <div class="order-card">

                                    <div class="order-Image">

                                        <img
                                            src="${order.image}"
                                            alt="${order.product}"
                                        >

                                    </div>


                                    <div class="order-info">

                                        <h3>
                                            ${order.product}
                                        </h3>

                                        <p>
                                            Order ${order.id}
                                        </p>

                                        <p>
                                            ${order.date}
                                            ·
                                            ${order.days}
                                            day${order.days > 1 ? "s" : ""}
                                        </p>

                                    </div>


                                    <span
                                        class="
                                            order-status
                                            ${
                                                order.status ===
                                                "Cancelled"
                                                    ? "cancelled"
                                                    : ""
                                            }
                                        "
                                    >
                                        ${order.status}
                                    </span>


                                    <div class="order-total">

                                        <strong>
                                            ${money(order.total)}
                                        </strong>


                                        <button
                                            class="secondary-button"
                                            onclick="
                                                navigate(
                                                    '#/order/${order.id}'
                                                )
                                            "
                                        >
                                            View detail
                                        </button>

                                    </div>

                                </div>

                            `
                            )
                            .join("")

                        : `
                            <div class="empty-state">

                                <div class="empty-icon">
                                    📦
                                </div>

                                <h3>
                                    No orders yet
                                </h3>

                                <p>
                                    Your rental orders will appear here.
                                </p>

                                <button
                                    class="primary-button"
                                    onclick="
                                        navigate('#/products')
                                    "
                                >
                                    Browse Products
                                </button>

                            </div>
                        `
                }

            </div>

        </section>

    `, "orders");
}


/* =========================================================
   ORDER DETAIL
========================================================= */

function orderDetailPage(id) {

    const order =
        orders.find(
            item =>
                item.id === id
        );


    if (!order) {

        return layout(`

            <section class="standard-page">

                <div class="empty-state">

                    <h3>
                        Order not found
                    </h3>

                    <button
                        class="primary-button"
                        onclick="
                            navigate('#/orders')
                        "
                    >
                        Back to Orders
                    </button>

                </div>

            </section>

        `, "orders");

    }


    const p =
        products.find(
            item =>
                item.name ===
                order.product
        );


    return layout(`

        <section class="standard-page">

            <button
                class="back-button"
                onclick="
                    navigate('#/orders')
                "
            >
                ← Back to Orders
            </button>


            <h1 class="page-title">
                Order Detail
            </h1>


            <p class="page-subtitle">
                Order ${order.id}
            </p>


            <div class="order-detail-card">

                <div class="order-detail-header">

                    <div>

                        <h2>
                            ${order.product}
                        </h2>

                        <p>
                            Placed on ${order.date}
                        </p>

                    </div>


                    <span
                        class="
                            order-status
                            ${
                                order.status === "Cancelled"
                                    ? "cancelled"
                                    : ""
                            }
                        "
                    >
                        ${order.status}
                    </span>

                </div>


                <div class="order-detail-product">

                    <div class="cart-Image">

                        <img
                            src="${order.image}"
                            alt="${order.product}"
                        >

                    </div>


                    <div>

                        <h3>
                            ${order.product}
                        </h3>

                        <p>
                            ${order.days}
                            day${order.days > 1 ? "s" : ""}
                            ·
                            ${p ? money(p.price) : "—"}
                            / day
                        </p>

                    </div>


                    <strong>
                        ${money(order.total)}
                    </strong>

                </div>


                <div class="timeline">

                    <h3>
                        Order Timeline
                    </h3>


                    <div>
                        ✓ Order placed
                        <span>
                            — ${order.date}
                        </span>
                    </div>


                    <div>
                        ✓ Payment confirmed
                    </div>


                    <div>
                        ✓ Owner confirmed
                    </div>


                    <div>
                        ✓ Ready for pickup
                    </div>


                    ${
                        order.meetingPoint
                            ? `
                                <div>
                                    📍 Meeting point:
                                    ${order.meetingPoint}
                                </div>
                            `
                            : ""
                    }


                    ${
                        order.meetingTime
                            ? `
                                <div>
                                    🕐 Meeting time:
                                    ${order.meetingTime}
                                </div>
                            `
                            : ""
                    }

                </div>

            </div>

        </section>

    `, "orders");
}


/* =========================================================
   PROFILE
========================================================= */

function profilePage() {

    return layout(`

        <section class="standard-page">

            <h1 class="page-title">
                Profile
            </h1>


            <p class="page-subtitle">
                Manage your account and rental preferences.
            </p>


            <div class="profile-layout">


                <aside class="profile-sidebar">

                    <div class="profile-large">
                        AT
                    </div>


                    <h2>
                        Attasya
                    </h2>


                    <p>
                        attasya@email.com
                    </p>


                    <div class="profile-menu">

                        <button class="active">
                            Personal information
                        </button>


                        <button
                            onclick="
                                showToast(
                                    'Notifications settings opened'
                                )
                            "
                        >
                            Notifications
                        </button>


                        <button
                            onclick="
                                showToast(
                                    'Payment settings opened'
                                )
                            "
                        >
                            Payment methods
                        </button>


                        <button
                            onclick="
                                showToast(
                                    'Security settings opened'
                                )
                            "
                        >
                            Security
                        </button>


                        <button
                            onclick="
                                showToast(
                                    'Settings saved'
                                )
                            "
                        >
                            Settings
                        </button>

                    </div>

                </aside>


                <section class="profile-form">

                    <h2>
                        Personal Information
                    </h2>


                    <div class="form-grid">

                        <div class="form-field">

                            <label>
                                FULL NAME
                            </label>

                            <input
                                value="Attasya"
                            >

                        </div>


                        <div class="form-field">

                            <label>
                                EMAIL
                            </label>

                            <input
                                value="attasya@email.com"
                            >

                        </div>


                        <div class="form-field">

                            <label>
                                PHONE NUMBER
                            </label>

                            <input
                                value="+62 812 3456 7890"
                            >

                        </div>


                        <div class="form-field">

                            <label>
                                LOCATION
                            </label>

                            <input
                                value="Jakarta Selatan"
                            >

                        </div>

                    </div>


                    <button
                        class="primary-button"
                        onclick="
                            showToast(
                                'Profile updated'
                            )
                        "
                    >
                        Save changes
                    </button>

                </section>

            </div>

        </section>

    `);
}


/* =========================================================
   SEARCH PAGE
========================================================= */

function searchPage() {

    const queryString =
        location.hash.split("?")[1] || "";


    const params =
        new URLSearchParams(
            queryString
        );


    const query =
        params.get("q") || "";


    const category =
        params.get("category") || "";


    const list =
        products.filter(
            p => {

                const matchesQuery =
                    !query ||
                    p.name
                        .toLowerCase()
                        .includes(
                            query.toLowerCase()
                        ) ||
                    p.category
                        .toLowerCase()
                        .includes(
                            query.toLowerCase()
                        );


                const matchesCategory =
                    !category ||
                    p.category === category;


                return (
                    matchesQuery &&
                    matchesCategory
                );
            }
        );


    return layout(`

        <section class="standard-page">

            <div class="search-page-header">

                <span class="section-label">
                    LOOPIT SEARCH
                </span>


                <h1>
                    Find what you need.
                </h1>


                <p>
                    Search rental items available
                    around your campus.
                </p>


                <form
                    class="large-search"
                    onsubmit="
                        event.preventDefault();

                        navigate(
                            '#/search?q=' +
                            encodeURIComponent(
                                this.q.value
                            )
                        )
                    "
                >

                    <span>
                        ⌕
                    </span>


                    <input
                        name="q"
                        value="${query}"
                        placeholder="Search cameras, projectors, tents..."
                    >


                    <button>
                        Search
                    </button>

                </form>

            </div>


            <div class="search-results-heading">

                <h2>

                    ${
                        query || category
                            ? `Results for "${
                                query ||
                                category
                            }"`
                            : "All rental items"
                    }

                </h2>


                <span>
                    ${list.length} items
                </span>

            </div>


            ${productGrid(list)}

        </section>

    `, "products");
}


/* =========================================================
   ROUTER
========================================================= */

function render() {

    const hash =
        location.hash ||
        "#/home";


    const parts =
        hash.split("/");


    let view;


    if (
        hash === "#/home" ||
        hash === "#"
    ) {

        view = home();

    }


    else if (
        hash === "#/products"
    ) {

        view =
            productsPage();

    }


    else if (
        hash === "#/orders"
    ) {

        view =
            ordersPage();

    }


    else if (
        hash === "#/cart"
    ) {

        view =
            cartPage();

    }


    else if (
        hash === "#/profile"
    ) {

        view =
            profilePage();

    }


    else if (
        hash.startsWith("#/product/")
    ) {

        view =
            detailPage(
                parts[2]
            );

    }


    else if (
        hash.startsWith("#/booking/")
    ) {

        view =
            bookingPage(
                parts[2]
            );

    }


    else if (
        hash.startsWith("#/order/")
    ) {

        view =
            orderDetailPage(
                parts[2]
            );

    }


    else if (
        hash.startsWith("#/search")
    ) {

        view =
            searchPage();

    }


    else {

        view =
            home();

    }


    app.innerHTML =
        view;


    window.scrollTo(
        0,
        0
    );
}


/* =========================================================
   START APP
========================================================= */

window.addEventListener(
    "hashchange",
    render
);


render();