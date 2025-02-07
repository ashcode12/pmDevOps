const BASE_URL_AUTH = 'http://localhost:4000';
const BASE_URL_VAULT = 'http://localhost:4001';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const vaultForm = document.getElementById('vaultForm');
  const vaultContainer = document.getElementById('vaultContainer');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch(`${BASE_URL_AUTH}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('token', data.token);
          alert('Login successful!');
          window.location.href = 'vault.html';
        } else {
          alert(data.error || 'Login failed!');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred during login.');
      }
    });
  }

  if (vaultForm) {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You are not logged in!');
      window.location.href = 'index.html';
      return;
    }

    fetchVaultEntries(token);

    vaultForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const site = document.getElementById('site').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch(`${BASE_URL_VAULT}/vault`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ site, password }),
        });

        const data = await response.json();
        if (response.ok) {
          alert('Password added successfully!');
          fetchVaultEntries(token);
          vaultForm.reset();
        } else {
          alert(data.message || 'Failed to add password.');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred while adding the password.');
      }
    });
  }

  async function fetchVaultEntries(token) {
    try {
      const response = await fetch(`${BASE_URL_VAULT}/vault`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        vaultContainer.innerHTML = data.passwords.map(entry => `
          <div>
            <strong>Site:</strong> ${entry.site}<br>
            <strong>Password:</strong> ${entry.password}
          </div>
        `).join('');
      } else {
        alert(data.message || 'Failed to fetch vault entries.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching vault entries.');
    }
  }
});
