class CruwiModal {
  constructor(apiKey) {
    this.validateApiKey(apiKey);
    this.apiKey = apiKey;
    this.init();
  }

  validateApiKey(apiKey) {
    if (!apiKey || typeof apiKey !== 'string' || apiKey.length !== 32) {
      throw new Error('Invalid API key');
    }
  }

  init() {
    const { modal, modalContent } = this.createModal();
    this.modal = modal;
    this.modalContent = modalContent;
  }

  createModal() {
    // Create the modal wrapper
    const modalWrapper = document.createElement("div");
    modalWrapper.id = "cruwi-modal-wrapper";

    // Create a shadow root for modalWrapper
    const shadow = modalWrapper.attachShadow({ mode: "open" });

    // Create styles for shadow DOM
    const style = document.createElement("style");
    style.textContent = `

      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,600&display=swap');

      #cruwi-modal {
        all: initial;
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        z-index: 9999;
        justify-content: center;
        align-items: center;
      }

      #cruwi-modal-content {
        all: initial;
        margin: 10px;
        background-color: white;
        max-width: 400px;
        width: calc(100% - 40px);
        position: relative;
        border-radius: 18px;
        box-shadow: 8px 8px 0px black;
      }

      #cruwi-modal-content-text {
        padding: 20px;
      }

      h3 {
        all: initial;
        font-size: 24px;
        display: block;
        margin: 40px 0 10px 0;
        font-weight: bold;
        font-family: 'DM Sans', sans-serif;
      }

      p {
        all: initial;
        font-family: 'DM Sans', sans-serif;
      }

      #cruwi-modal-close-button {
        all: initial;
        position: absolute;
        top: 10px;
        left: 10px;
        border: none;
        cursor: pointer;
        background: #e8e8ed;
        border-radius: 50%;
        color: #6e6e73;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 36px;
        width: 36px;
      }

      #cruwi-modal-footer {
        padding: 10px;
        background-color: #f5f5f7;
        text-align: center;
        border-bottom-left-radius: 18px;
        border-bottom-right-radius: 18px;
      }

      #cruwi-modal-footer p {
        all: initial;
        font-size: 10px;
        font-family: 'DM Sans', sans-serif;
      }

      #cruwi-modal-cta-button {
        display: block;
        width: 100%;
        border: none;
        margin-top: 20px;
        background-color: black;
        padding: 10px 20px;
        color: white;
        font-family: 'DM Sans', sans-serif;
        font-size: 16px;
        border-radius: 5px;
      }

    `;

    shadow.appendChild(style);

    // Create the modal
    const modal = document.createElement("div");
    modal.id = "cruwi-modal";
    shadow.appendChild(modal);

    // Create the modal content box
    const modalContent = document.createElement("div");
    modalContent.id = "cruwi-modal-content";
    modal.appendChild(modalContent);

    // Create the close button
    const closeButton = document.createElement("button");
    closeButton.id = "cruwi-modal-close-button";
    closeButton.innerHTML = `
      <svg width="21" height="21" class="as-svgicon as-svgicon-close as-svgicon-tiny as-svgicon-closetiny" role="img" aria-hidden="true"><path fill="none" d="M0 0h21v21H0z"></path><path d="M12.12 10l4.07-4.06a1.5 1.5 0 10-2.11-2.12L10 7.88 5.94 3.81a1.5 1.5 0 10-2.12 2.12L7.88 10l-4.07 4.06a1.5 1.5 0 000 2.12 1.51 1.51 0 002.13 0L10 12.12l4.06 4.07a1.45 1.45 0 001.06.44 1.5 1.5 0 001.06-2.56z"></path></svg>
    `;
    modalContent.appendChild(closeButton);

    // Create the main text content
    const textContent = document.createElement("div");
    textContent.id = "cruwi-modal-content-text";
    modalContent.appendChild(textContent);

    // Create the title
    const title = document.createElement("h3");
    title.innerHTML = "Crea contenido para Matcha&CO y gana dinero";
    textContent.appendChild(title);

    // Create the modal content
    const content = document.createElement("p");
    content.innerHTML =
      "Este contenido del modal es de prueba aquí habrá una pequeña explicación sobre lo que se podrá hacer con CRUWI.com y cómo podrías ganar dinero haciendo retos y trends";
    textContent.appendChild(content);

    // Create the CTA Button
    const ctaButton = document.createElement("button");
    ctaButton.innerHTML = "Hacer reto";
    ctaButton.id = "cruwi-modal-cta-button";
    ctaButton.addEventListener("click", () => {
      modal.style.display = "none";
    });
    textContent.appendChild(ctaButton);

    // Create the modal footer
    const modalFooter = document.createElement("div");
    modalFooter.id = "cruwi-modal-footer";
    modalContent.appendChild(modalFooter);

    // Create the content for the footer
    const footerText = document.createElement("p");
    footerText.innerHTML = `Powered by <strong>CRUWI.com</strong>`;
    modalFooter.appendChild(footerText);

    // Append the modal wrapper to body
    document.body.appendChild(modalWrapper);

    // Add event listeners for closing the modal
    closeButton.addEventListener("click", () => {
      modal.style.display = "none";
    });

    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });

    return { modal, modalContent };
  }

  open() {
    this.modal.style.display = "flex";
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))
  }

}

window.CruwiModal = CruwiModal;
