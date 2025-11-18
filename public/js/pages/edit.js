import { state } from "../core/state.js";
import { showUsersPage } from "./users.js";
import { validateName } from "../services/validators.js";

export function showEditPage(id) {
    state.editingId = Number(id);
    state.formErrors.editName = "";

    showUsersPage();

    const input = document.getElementById("editInput");
    const errorBlock = document.getElementById("editError");
    const saveBtn = document.getElementById("saveBtn");

    if (!input) return;

    input.oninput = (e) => {
        const name = e.target.value;
        state.formErrors.editName = validateName(name);

        errorBlock.innerHTML = state.formErrors.editName
            ? `<div class="error">${state.formErrors.editName}</div>`
            : "";

        saveBtn.disabled = !!state.formErrors.editName;
    };
}
