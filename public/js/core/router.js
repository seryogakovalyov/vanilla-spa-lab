import { showUsersPage } from "../pages/users.js";
import { showCreatePage } from "../pages/create.js";
import { showEditPage } from "../pages/edit.js";
import { state } from "./state.js";

export const routes = {
    "users": showUsersPage,
    "create": showCreatePage,
    "edit": showEditPage,
};

export function router() {
    let hash = window.location.hash.slice(2);
    let [route, param] = hash.split("/");

    if (route !== "edit") {
        state.editingId = null;
        state.formErrors.editName = "";
    }

    if (!route) route = "users";

    const page = routes[route];
    if (page) {
        page(param);
    } else {
        const app = document.getElementById("app");
        app.innerHTML = "<h2>Page not found</h2>";
    }
}
