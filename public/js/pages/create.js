import { state } from "../core/state.js";
import { render } from "../core/render.js";
import { Notifications } from "../components/Notifications.js";
import { Loader } from "../components/Loader.js";
import { validateName } from "../services/validators.js";

export function showCreatePage() {
  const error = state.formErrors.createName;

  const html = `
    ${Notifications(state.notifications)}

    <h2>Create User</h2>

    ${Loader(state.loading)}

    <input id="newUserName" placeholder="Name" />
    <div id="createError">
      ${error ? `<div class="error">${error}</div>` : ""}
    </div>

    <button id="createBtn" onclick="createUser()" ${error ? "disabled" : ""}>
      Create
    </button>

    <p><a href="#/users">Back</a></p>
  `;

  render(html);

  const input = document.getElementById("newUserName");
  const errorBlock = document.getElementById("createError");
  const btn = document.getElementById("createBtn");

  input.oninput = (e) => {
    const name = e.target.value;
    state.formErrors.editName = validateName(name);

    errorBlock.innerHTML = state.formErrors.editName
      ? `<div class="error">${state.formErrors.editName}</div>`
      : "";

    btn.disabled = !!state.formErrors.editName;
  };
}
