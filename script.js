const state = {
    users: []
}

function render() {
    const app = document.getElementById("app");

    app.innerHTML = `
       <div>
           <h2>Users</h2>
           <div id="usersList"></div>

           <h3>Create user</h3>
           <input id="newUserName" placeholder="Name" />
           <button onclick="createUser()">Create</button>
       </div>
    `;
    renderUserList();
}

render();
loadUsers();

function renderUserList() {
    const container = document.getElementById("usersList");

    container.innerHTML = state.users
        .map(user => `
            <div class="user">
                <span>${user.name}</span>
                <button onclick="deleteUser(${user.id})">Delete</button>
            </div>
        `).join('');
}

async function loadUsers() {
    const data = await fetchJSON("/api/users.php");
    state.users = data;
    render();
}

async function fetchJSON(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("HTTP " + response.status);
    }

    return await response.json();
}

async function postJSON(url, data) {
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error("HTTP " + response.status);
    }

    return await response.json();
}

async function createUser() {
    const name = document.getElementById("newUserName").value;

    if (!name.trim()) {
        console.log("Empty name");
        return;
    }

    const newUser = await postJSON("/api/users/create.php", {
        _method: "POST",
        name: name
    });

    state.users.push(newUser.user);
    render();

    document.getElementById("newUserName").value = "";
}

async function deleteUser(id) {
    try {
        const result = await postJSON("/api/users/delete.php", {
            _method: "DELETE",
            id: id
        });

        state.users = state.users.filter(u => u.id !== id);

        render();

    } catch (e) {
        console.log("Error: ", e.message);
    }

}