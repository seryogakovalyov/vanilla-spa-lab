import { state } from "../core/state.js";
import { render } from "../core/render.js";
import { Notifications } from "../components/Notifications.js";
import { Loader } from "../components/Loader.js";
import { UsersList } from "../components/UsersList.js";
import { Pagination } from "../components/Pagination.js";

export function showUsersPage() {
    const html = `
    ${Notifications(state.notifications)}

    <h2>Users</h2>

    ${Loader(state.loading)}
    <div class="buttons">
      <button onclick="setSort('asc')">A → Z</button>
      <button onclick="setSort('desc')">Z → A</button>
    </div>

    <div class="letters">
      ${"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(letter => `
        <button onclick="setFilter('${letter}')">${letter}</button>
      `).join("")}
      <button onclick="setFilter('')">All</button>
    </div>

    <div id="usersList">
      ${UsersList(state)}
    </div>

    ${Pagination(state)}

    <p><a href="#/create">Create new user</a></p>
  `;

    render(html);
}
