const STORAGE_KEY = "items";

// Items laden
function loadItems() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

let items = loadItems();

// Items opslaan
function saveItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// Nieuw item toevoegen
function addItem(date, category, description, amount) {
  const newItem = {
    id: crypto.randomUUID(),
    date,
    category,
    description,
    amount
  };

  items.push(newItem);
  saveItems(items);
}

// Items tonen
function renderItems(list = items) {
  const container = document.getElementById("itemsContainer");
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = "<p>Geen items gevonden.</p>";
    return;
  }

  list.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${item.date}</strong> - ${item.category} - 
      ${item.description} - €${item.amount}
      <button onclick="deleteItem('${item.id}')">Verwijder</button>
    `;
    container.appendChild(div);
  });
}

// Item verwijderen
function deleteItem(id) {
  items = items.filter(item => item.id !== id);
  saveItems(items);
  renderItems();
}

// Formulier koppelen aan addItem()
const form = document.getElementById("itemForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const date = document.getElementById("date").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const amount = Number(document.getElementById("amount").value);

  addItem(date, category, description, amount);
  renderItems();
  form.reset();
});

// Bij het laden van de pagina
renderItems();



console.log("app is gestart")
