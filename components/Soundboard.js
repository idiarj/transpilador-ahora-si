
    class soundboard extends HTMLElement {
        constructor(){
            super();
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.appendChild(this.#getStyles());
            this.shadowRoot.appendChild(this.#getTemplate().content.cloneNode(true));
        }
        
        #getTemplate(){
            const template = document.createElement('template');
            template.innerHTML = `<div>
    <audio></audio>
</div>`;
            return template;
        }
    
        #getStyles(){
            const style = document.createElement('style');
            style.textContent = `
                div {
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
}
            `;
            return style;
        }
        
        connectedCallback(){
            console.log(`soundboard agregado al DOM`);
        }
    
        disconnectedCallback(){
            console.log(`soundboard removido del DOM`);
        }
    
        
    
        
    }
    
    customElements.define('soundboard', soundboard);
        