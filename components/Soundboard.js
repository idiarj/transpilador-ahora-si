
class Soundboard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const templateContent = document.createElement('template');
        templateContent.innerHTML = `<div>
    <audio></audio>
</div>`;
        shadow.appendChild(templateContent.content.cloneNode(true));
    }
    connectedCallback() {
        const style = document.createElement('style');
        style.textContent = `div {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 200px;
                width: 300px;
                border: 2px solid #ccc;
                border-radius: 10px;
                background-color: #f9f9f9;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }

            audio {
                width: 90%;
                outline: none;
            }`;
        this.shadowRoot.appendChild(style);
    }

    disconnectedCallback() {
        // Cleanup if needed
    }
}

customElements.define('Soundboard', Soundboard);
