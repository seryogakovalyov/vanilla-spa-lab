export function Pagination(state) {
  const { page, pages } = state;

  return `
    <div class="pagination">
      <button onclick="prevPage()" ${page === 1 ? "disabled" : ""}>Prev</button>
      <span>Page ${page} / ${pages || 1}</span>
      <button onclick="nextPage()" ${page === pages ? "disabled" : ""}>Next</button>
    </div>
  `;
}
