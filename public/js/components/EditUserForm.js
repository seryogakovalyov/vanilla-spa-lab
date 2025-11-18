export function EditUserForm(user, error) {
  return `
    <div class="user">
      <input id="editInput" value="${user.name}">
      <div id="editError">
        ${error ? `<div class="error">${error}</div>` : ""}
      </div>
      <div class="buttons">
        <button id="saveBtn" onclick="saveEdit(${user.id})" ${error ? "disabled" : ""}>
          Save
        </button>
        <button onclick="cancelEdit()">Cancel</button>
      </div>
    </div>
  `;
}
