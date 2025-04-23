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
  
  const totalCheckout = document.getElementById("total-checkout");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  let total = cart.reduce((sum, item) => sum + item.price, 0);
  totalCheckout.textContent = total;
  document.getElementById("checkout-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const inputs = document.querySelectorAll("#checkout-form input");
    const phone = inputs[2].value.trim();
  
    const phoneRegex = /^\+?380\d{9}$/;
  
    if (!inputs || !phoneRegex.test(phone)) {
      alert("Введіть правильні дані (наприклад, +380991234567)");
      return;
    }
    alert("✅ Замовлення оформлено! Очікуйте доставку 🚚");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
  });
  