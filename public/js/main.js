import { state } from "./core/state.js";
import { router } from "./core/router.js";
import { loadUsers } from "./services/usersService.js";
import { showUsersPage } from "./pages/users.js";
import * as userActions from "./actions/usersActions.js";

window.createUser = userActions.createUser;
window.deleteUser = userActions.deleteUser;
window.saveEdit   = userActions.saveEdit;
window.cancelEdit = userActions.cancelEdit;
window.setSort    = userActions.setSort;
window.setFilter  = userActions.setFilter;
window.nextPage   = userActions.nextPage;
window.prevPage   = userActions.prevPage;

async function init() {
  await loadUsers();

  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", (e) => {
    state.search = e.target.value.toLowerCase();
    showUsersPage();
  });

  window.addEventListener("hashchange", router);
  router();
}

init();
