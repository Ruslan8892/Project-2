const cartItems = document.getElementById("cart-items");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Кошик пустий 🛒</p>";
    return;
  }

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} — ${item.price}
      <button onclick="removeFromCart(${index})">🗑 Видалити</button>
    `;
    cartItems.appendChild(li);
  });
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
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

    renderCart();
    document.getElementById("clear-cart").addEventListener("click", () => {
        cart = [];
        localStorage.removeItem("cart");
        renderCart();
      });