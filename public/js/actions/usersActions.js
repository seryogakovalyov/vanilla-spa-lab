import { state } from "../core/state.js";
import { validateName } from "../services/validators.js";
import { postJSON } from "../services/api.js";
import { addNotification } from "../services/notifications.js";
import { showUsersPage } from "../pages/users.js";
import { showCreatePage } from "../pages/create.js";
import { loadUsers as loadUsersService } from "../services/usersService.js";

export async function createUser() {
    const input = document.getElementById("newUserName");
    if (!input) return;

    const name = input.value.trim();
    const error = validateName(name);

    if (error) {
        state.formErrors.createName = error;
        showCreatePage();
        return;
    }

    try {
        state.loading = true;
        showCreatePage();

        const newUser = await postJSON("/api/users/create.php", {
            _method: "POST",
            name
        });

        state.loading = false;
        state.users.push(newUser.user);
        state.formErrors.createName = "";
        addNotification("success", `User "${newUser.user.name}" created`);

        window.location.hash = "#/users";
        showUsersPage();
    } catch (e) {
        state.loading = false;
        addNotification("error", `Create failed: ${e.message}`);
        showCreatePage();
    }
}

export async function deleteUser(id) {
    try {
        state.loading = true;
        showUsersPage();

        await postJSON("/api/users/delete.php", {
            _method: "DELETE",
            id
        });

        state.loading = false;
        state.users = state.users.filter(u => u.id !== id);
        addNotification("info", `User #${id} deleted`);

        showUsersPage();
    } catch (e) {
        state.loading = false;
        addNotification("error", `Delete failed: ${e.message}`);
        showUsersPage();
    }
}

export function cancelEdit() {
    state.editingId = null;
    state.formErrors.editName = "";
    window.location.hash = "#/users";
    showUsersPage();
}

export async function saveEdit(id) {
    const input = document.getElementById("editInput");
    if (!input) return;

    const newName = input.value.trim();
    if (!newName) return;

    const error = validateName(newName);
    if (error) {
        state.formErrors.editName = error;
        showUsersPage();
        return;
    }

    try {
        state.loading = true;
        showUsersPage();

        await postJSON("/api/users/update.php", {
            _method: "PUT",
            id,
            name: newName
        });

        state.loading = false;

        state.users = state.users.map(u =>
            u.id === id ? { ...u, name: newName } : u
        );

        state.editingId = null;
        state.formErrors.editName = "";
        addNotification("success", `User renamed to "${newName}"`);

        window.location.hash = "#/users";
        showUsersPage();
    } catch (e) {
        state.loading = false;
        addNotification("error", `Update failed: ${e.message}`);
        showUsersPage();
    }
}

export function setFilter(letter) {
    state.filterLetter = letter;
    showUsersPage();
}

export function setSort(mode) {
    state.sort = mode;
    showUsersPage();
}

export async function nextPage() {
    if (state.page < state.pages) {
        state.page++;
        await loadUsersService();
        showUsersPage();
    }
}

export async function prevPage() {
    if (state.page > 1) {
        state.page--;
        await loadUsersService();
        showUsersPage();
    }
}
