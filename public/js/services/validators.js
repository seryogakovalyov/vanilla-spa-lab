export function validateName(name) {
  if (!name.trim()) return "Name is required";
  if (name.length < 3) return "Name must be at least 3 characters";
  if (name.length > 30) return "Name too long (max 30)";
  return "";
}
