export const state = {
  users: [],
  editingId: null,
  loading: false,
  notifications: [],
  search: "",
  sort: "asc",
  filterLetter: "",
  page: 1,
  limit: 10,
  pages: 1,
  formErrors: {
    createName: "",
    editName: ""
  }
};
