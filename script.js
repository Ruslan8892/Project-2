const products = [
  { id: 1, name: "Футболка", price: 599, image: "img/Без названия.jpg" },
  { id: 2, name: "Кросівки", price: 2999, image: "img/196968173709_20.webp" },
  { id: 3, name: "Рюкзак", price: 1999, image: "img/Без названия (1).jpg" },
  { id: 4, name: "Гітара", price: 899, image: "img/Без названия (2).jpg" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");

function renderProducts(filteredProducts = products) {
  productList.innerHTML = "";
  filteredProducts.forEach(p => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="product-image">
      <h3>${p.name}</h3>
      <p>${p.price} ₴</p>
      <button onclick="addToCart(${p.id})">Додати</button>
    `;
    productList.appendChild(div);
  });
}

function renderCart() {
  cartCount.textContent = cart.length;
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  renderCart();
}

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}

const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.body.classList.contains("dark") ? "dark" : "light";
    const newTheme = current === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  });
}

function filterAndSort() {
  const keyword = searchInput.value.toLowerCase();
  let filtered = products.filter(p =>
    p.name.toLowerCase().includes(keyword)
  );

  const sortValue = sortSelect.value;
  if (sortValue === "asc") filtered.sort((a, b) => a.price - b.price);
  if (sortValue === "desc") filtered.sort((a, b) => b.price - a.price);

  renderProducts(filtered);
}

searchInput.addEventListener("input", filterAndSort);
sortSelect.addEventListener("change", filterAndSort);

renderProducts();
renderCart();
