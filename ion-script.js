// ========== POPULAR MEALS DATA ==========
const mealsData = [
  {
    id: 1,
    name: "Classic Smash Burger",
    price: "$10.99",
    rating: 4.8,
    orders: "2.1k",
    image: "https://mgx-backend-cdn.metadl.com/generate/images/1010489/2026-03-08/0bf82c6d-d4e9-42ab-ada8-20b1b020b57b.png",
    category: "Burgers"
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    price: "$13.50",
    rating: 4.7,
    orders: "1.8k",
    image: "https://mgx-backend-cdn.metadl.com/generate/images/1010489/2026-03-08/a89ca1f8-929b-4093-b2e8-41a1c425de95.png",
    category: "Pizza"
  },
  {
    id: 3,
    name: "Salmon Poke Bowl",
    price: "$15.00",
    rating: 4.9,
    orders: "1.5k",
    image: "https://mgx-backend-cdn.metadl.com/generate/images/1010489/2026-03-08/24ba585a-f3e6-4421-8b43-322c1123efdd.png",
    category: "Bowls"
  },
  {
    id: 4,
    name: "Dragon Roll Set",
    price: "$18.99",
    rating: 4.8,
    orders: "1.2k",
    image: "https://mgx-backend-cdn.metadl.com/generate/images/1010489/2026-03-08/60a0afe3-c451-4a57-b152-6f15f92232f6.png",
    category: "Sushi"
  },
  {
    id: 5,
    name: "BBQ Bacon Burger",
    price: "$12.50",
    rating: 4.6,
    orders: "980",
    image: "https://mgx-backend-cdn.metadl.com/generate/images/1010489/2026-03-08/0bf82c6d-d4e9-42ab-ada8-20b1b020b57b.png",
    category: "Burgers"
  },
  {
    id: 6,
    name: "Veggie Power Bowl",
    price: "$11.00",
    rating: 4.7,
    orders: "870",
    image: "https://mgx-backend-cdn.metadl.com/generate/images/1010489/2026-03-08/24ba585a-f3e6-4421-8b43-322c1123efdd.png",
    category: "Bowls"
  }
];

// ========== RENDER MEAL CARDS ==========
function createMealCard(meal) {
  return `
    <div class="meal-card" data-category="${meal.category}">
      <div class="meal-card__image-wrap">
        <img src="${meal.image}" alt="${meal.name}" class="meal-card__image" />
      </div>
      <div class="meal-card__content">
        <h3 class="meal-card__name">${meal.name}</h3>
        <div class="meal-card__meta">
          <div class="meal-card__rating">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFB800" stroke="#FFB800" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>${meal.rating}</span>
          </div>
          <span class="meal-card__dot">•</span>
          <span class="meal-card__orders">${meal.orders} orders</span>
        </div>
        <span class="meal-card__price">${meal.price}</span>
      </div>
      <button class="btn-add" aria-label="Add ${meal.name}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </button>
    </div>
  `;
}

function renderMeals(category) {
  const grid = document.getElementById("mealsGrid");
  if (!grid) return;

  const filtered = category === "All"
    ? mealsData
    : mealsData.filter(m => m.category === category);

  grid.innerHTML = filtered.map(createMealCard).join("");
}

// ========== CATEGORY FILTER ==========
function initCategoryFilters() {
  const container = document.getElementById("categoryFilters");
  if (!container) return;

  container.addEventListener("click", function (e) {
    const btn = e.target.closest(".category-btn");
    if (!btn) return;

    container.querySelectorAll(".category-btn").forEach(b => b.classList.remove("category-btn--active"));
    btn.classList.add("category-btn--active");

    const category = btn.getAttribute("data-category");
    renderMeals(category);
  });
}

// ========== LIVE TIMESTAMP ==========
function updateTimestamp() {
  const el = document.getElementById("liveTimestamp");
  if (!el) return;

  function update() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const h = hours % 12 || 12;
    el.textContent = `${h}:${minutes}:${seconds} ${ampm}`;
  }

  update();
  setInterval(update, 1000);
}

// ========== INIT ==========
document.addEventListener("DOMContentLoaded", function () {
  renderMeals("All");
  initCategoryFilters();
  updateTimestamp();
});