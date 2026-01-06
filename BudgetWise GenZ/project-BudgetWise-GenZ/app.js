let expenses = [];

function addExpense() {
  const amount = document.getElementById("amount").value;
  if (!amount) return alert("Enter amount");

  expenses.push({ amount: Number(amount) });
  renderSummary();
}

function renderSummary() {
  const ul = document.getElementById("summary");
  if (!ul) return;
  ul.innerHTML = "";
  expenses.forEach(e => {
    ul.innerHTML += `<li>₹${e.amount}</li>`;
  });
}
