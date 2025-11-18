import { state } from "../core/state.js";

export function addNotification(type, message) {
  const id = Date.now();
  state.notifications.push({ id, type, message });
}
