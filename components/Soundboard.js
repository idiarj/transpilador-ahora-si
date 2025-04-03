
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
    
        
            static get observedAttributes() { return ['favorite']; }
            attributeChangedCallback(name, oldValue, newValue) {
                if (oldValue !== newValue) {
                    this[name] = newValue;
                }
            }

            get favorite() {
                return this.getAttribute('favorite');
            }

            set favorite(value) {
                this.setAttribute('favorite', value);
            }
        

            static get observedAttributes() { return ['volume']; }
            attributeChangedCallback(name, oldValue, newValue) {
                if (oldValue !== newValue) {
                    this[name] = newValue;
                }
            }

            get volume() {
                return this.getAttribute('volume');
            }

            set volume(value) {
                this.setAttribute('volume', value);
            }
        

            static get observedAttributes() { return ['pitch']; }
            attributeChangedCallback(name, oldValue, newValue) {
                if (oldValue !== newValue) {
                    this[name] = newValue;
                }
            }

            get pitch() {
                return this.getAttribute('pitch');
            }

            set pitch(value) {
                this.setAttribute('pitch', value);
            }
        

            static get observedAttributes() { return ['speed']; }
            attributeChangedCallback(name, oldValue, newValue) {
                if (oldValue !== newValue) {
                    this[name] = newValue;
                }
            }

            get speed() {
                return this.getAttribute('speed');
            }

            set speed(value) {
                this.setAttribute('speed', value);
            }
        
    
        playSound(soundId) {
    const sound = this.querySelector('[data-sound="\${soundId}"]');
     if (sound) {sound.play();
    }}

playSound(soundId) {
    const sound = this.querySelector('[data-sound="\${soundId}"]');
     if (sound) {sound.play();
    }}

playSound(soundId) {
    const sound = this.querySelector('[data-sound="\${soundId}"]');
     if (sound) {sound.play();
    }}

playSound(soundId) {
    const sound = this.querySelector('[data-sound="\${soundId}"]');
     if (sound) {sound.play();
    }}
    }
    
    customElements.define('soundboard', soundboard);
        