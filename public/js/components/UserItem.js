export function UserItem(user) {
  return `
    <div class="user">
      <a href="#/edit/${user.id}">${user.name}</a>
      <button onclick="deleteUser(${user.id})">Delete</button>
    </div>
  `;
}
