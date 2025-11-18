import { state } from "../core/state.js";
import { fetchJSON } from "./api.js";
import { addNotification } from "./notifications.js";

export async function loadUsers() {
  try {
    const data = await fetchJSON(`/api/users.php?page=${state.page}&limit=${state.limit}`);
    state.users = data.users;
    state.pages = data.pages;
    state.page = data.page;
  } catch (e) {
    addNotification("error", `Load failed: ${e.message}`);
    state.users = [];
  }
}
