export function Notifications(list) {
    if (!list.length) return "";

    return `
    <div class="notifications">
      ${list.map(n => `
        <div class="notification notification--${n.type}">
          ${n.message}
        </div>
      `).join("")}
    </div>
  `;
}
