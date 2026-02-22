import { translations, getCurrentLang } from "./settings.js";


function createModal(options) {
  const lang=getCurrentLang();
const t=translations[lang];
  const {
    title = "",
    body = "",
    size = "" // "modal-lg", "modal-sm", ecc.
  } = options;

  const modal = document.createElement("div");
  modal.className = "modal fade";
  modal.tabIndex = -1;

  modal.innerHTML = `
    <div class="modal-dialog ${size}">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${title}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">${body}</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${t.closeButton}</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.addEventListener('hidden.bs.modal', () => {
    modal.remove();
  });
  const bsModal = new bootstrap.Modal(modal);
  bsModal.show();

}

export {createModal};

