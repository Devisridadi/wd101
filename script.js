const form = document.getElementById('registrationForm');
const entriesTableBody = document.getElementById('entriesTableBody');

function getEntries() {
  let entries = localStorage.getItem('user-entries');
  return entries ? JSON.parse(entries) : [];
}

function saveEntry(entry) {
  const entries = getEntries();
  entries.push(entry);
  localStorage.setItem('user-entries', JSON.stringify(entries));
}

function displayEntries() {
  const entries = getEntries();
  entriesTableBody.innerHTML = '';
  entries.forEach(entry => {
    const row = `<tr>
      <td>${entry.name}</td>
      <td>${entry.email}</td>
      <td>${entry.password}</td>
      <td>${entry.dob}</td>
      <td>${entry.acceptedTerms}</td>
    </tr>`;
    entriesTableBody.innerHTML += row;
  });
}

function isValidDob(dob) {
  const dobDate = new Date(dob);
  const today = new Date();
  const age = today.getFullYear() - dobDate.getFullYear();
  const m = today.getMonth() - dobDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
    return age - 1 >= 18 && age - 1 <= 55;
  }
  return age >= 18 && age <= 55;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const dob = document.getElementById('dob').value;
  const acceptedTerms = document.getElementById('acceptTerms').checked;

  if (!isValidDob(dob)) {
    alert('Age must be between 18 and 55.');
    return;
  }

  const entry = {
    name,
    email,
    password,
    dob,
    acceptedTerms
  };

  saveEntry(entry);
  displayEntries();
  form.reset();
});

window.onload = displayEntries;
