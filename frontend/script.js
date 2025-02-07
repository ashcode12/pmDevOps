const API_BASE = "http://localhost";

async function login(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${API_BASE}:4000/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "vault.html";
    } else {
        alert("Login failed");
    }
}

async function fetchVault() {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE}:4001/vault`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
    });

    const data = await response.json();
    document.getElementById("vaultData").innerText = JSON.stringify(data, null, 2);
}

async function generatePassword() {
    const response = await fetch(`${API_BASE}:4002/generate`);
    const data = await response.json();
    document.getElementById("generatedPassword").innerText = data.password;
}

document.getElementById("loginForm")?.addEventListener("submit", login);

