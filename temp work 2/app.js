let expenses = JSON.parse(sessionStorage.getItem("expenses") || "[]");
let selectedCategory = "";

/* ---------- SAFE DOM READY ---------- */
document.addEventListener("DOMContentLoaded", () => {

  const addBtn = document.getElementById("addExpenseBtn");
  if (addBtn) {
    addBtn.addEventListener("click", openExpenseModal);
  }

  document.querySelectorAll(".category-btn").forEach(btn => {
    btn.addEventListener("click", () => selectCategory(btn));
  });

  renderExpenses();
});

/* ---------- MODAL ---------- */
function openExpenseModal() {
  const modal = document.getElementById("expenseModal");
  if (!modal) {
    console.error("❌ expenseModal not found");
    return;
  }
  modal.style.display = "flex";
}

function closeExpenseModal() {
  document.getElementById("expenseModal").style.display = "none";
  selectedCategory = "";
  clearCategorySelection();
}

/* ---------- CATEGORY SELECTION ---------- */
function selectCategory(btn) {
  clearCategorySelection();
  btn.classList.add("active");
  selectedCategory = btn.dataset.cat;
}

function clearCategorySelection() {
  document.querySelectorAll(".category-btn").forEach(b =>
    b.classList.remove("active")
  );
}

/* ---------- SAVE ---------- */
function saveModalExpense() {
  const custom = document.getElementById("customCategory").value.trim();
  const desc = document.getElementById("description").value.trim();
  const amount = Number(document.getElementById("amount").value);

  const category = custom || selectedCategory;

  if (!category || !amount) {
    alert("Please select category and enter amount");
    return;
  }

  expenses.unshift({
    category,
    description: desc,
    amount,
    date: new Date().toISOString().slice(0, 10)
  });

  sessionStorage.setItem("expenses", JSON.stringify(expenses));

  closeExpenseModal();
  renderExpenses();
}

/* ---------- RENDER ---------- */
function renderExpenses() {
  const list = document.getElementById("expenseList");
  const search = document.getElementById("searchInput")?.value.toLowerCase() || "";
  const filter = document.getElementById("filterCategory")?.value || "";

  if (!list) return;

  list.innerHTML = "";

  expenses
    .filter(e =>
      (!filter || e.category === filter) &&
      (e.category.toLowerCase().includes(search) ||
        (e.description || "").toLowerCase().includes(search))
    )
    .forEach(e => {
      list.innerHTML += `
        <div class="expense-item">
          <div>
            <b>${e.category}</b>
            <div class="expense-meta">${e.description || "—"} • ${e.date}</div>
          </div>
          <h3>₹${e.amount}</h3>
        </div>
      `;
    });

  updateStats();
  populateFilters();
}

/* ---------- FILTER ---------- */
function populateFilters() {
  const select = document.getElementById("filterCategory");
  if (!select) return;

  const current = select.value;
  const categories = [...new Set(expenses.map(e => e.category))];

  select.innerHTML = `<option value="">All Categories</option>`;
  categories.forEach(c =>
    select.innerHTML += `<option value="${c}">${c}</option>`
  );

  select.value = current;
}

/* ---------- STATS ---------- */
function updateStats() {
  document.getElementById("txnCount").innerText = expenses.length;

  let total = 0;
  const map = {};

  expenses.forEach(e => {
    total += e.amount;
    map[e.category] = (map[e.category] || 0) + e.amount;
  });

  document.getElementById("totalMonth").innerText = `₹${total}`;

  let top = "—", max = 0;
  for (let c in map) {
    if (map[c] > max) {
      max = map[c];
      top = c;
    }
  }

  document.getElementById("topCategory").innerText = top;
}
