import { EditUserForm } from "./EditUserForm.js";
import { UserItem } from "./UserItem.js";

export function UsersList(state) {
  const { users, editingId, search, filterLetter, sort } = state;

  if (!Array.isArray(users)) return "";

  let list = [...users];

  if (search) {
    list = list.filter(u =>
      u.name.toLowerCase().includes(search)
    );
  }

  if (filterLetter) {
    list = list.filter(u =>
      u.name.toLowerCase().startsWith(filterLetter.toLowerCase())
    );
  }

  list.sort((a, b) => {
    if (sort === "asc") return a.name.localeCompare(b.name);
    if (sort === "desc") return b.name.localeCompare(a.name);
    return 0;
  });

  return list.map(user => {
    if (user.id === editingId) {
      return EditUserForm(user, state.formErrors.editName);
    }
    return UserItem(user);
  }).join("");
}