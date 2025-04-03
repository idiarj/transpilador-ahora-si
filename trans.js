import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Obtener el nombre del archivo actual
const __filename = fileURLToPath(import.meta.url);

// Obtener el directorio actual
const __dirname = path.dirname(__filename);

console.log(__dirname); // Imprime el directorio actual

export class TralaleroTralala {
    constructor({outputDir}) {
        this.outputDir = outputDir;
    }

    parseCommands(filePath) {
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');
        const components = [];
    
        let currentComponent = null;
    
        lines.forEach(line => {
            line = line.trim(); // Trim whitespace and carriage return characters
            if (line.startsWith('@generate')) {
                if (currentComponent) {
                    components.push(currentComponent);
                }
                currentComponent = { name: line.split(' ')[1], properties: [], methods: [] };
            } else if (line.startsWith('@template')) {
                currentComponent.templatePath = line.split(' ')[1].trim();
            } else if (line.startsWith('@styles')) {
                currentComponent.stylesPath = line.split(' ')[1].trim();
            } else if (line.startsWith('@property')) {
                currentComponent.properties.push(line.split(' ')[1].trim());
            } else if (line.startsWith('@method')) {
                console.log('Method found:', line);
                const method = line.split(' ').slice(1).join(' ').trim();
                console.log('Method name:', method);
                currentComponent.methods.push(method);
            }
        });
    
        if (currentComponent) {
            components.push(currentComponent);
        }
    
        return components;
    }

    getProperties({properties}) {
        return properties.map(prop => `
            static get observedAttributes() { return ['${prop}']; }
            attributeChangedCallback(name, oldValue, newValue) {
                if (oldValue !== newValue) {
                    this[name] = newValue;
                }
            }

            get ${prop}() {
                return this.getAttribute('${prop}');
            }

            set ${prop}(value) {
                this.setAttribute('${prop}', value);
            }
        `).join('\n');
    }

    getMethods({methods}){
        return methods.map(method => {
            console.log('El método es:', method);
        
            // Expresión regular para capturar la cabecera y el cuerpo del método
            const match = method.match(/([^{]+)\{([\s\S]*)/);
        
            if (match) {
                const signature = match[1].trim(); // La parte antes de la primera '{'
                const body = match[2].trim(); // Todo lo que viene después
        
                console.log('La cabecera del método es:', signature);
                console.log('El cuerpo del método es:', body);
        
                return `${signature} {\n    ${body.replace(/;/g, ';\n    ').replace(/\n}/, '\n}')}`;
            }
        
            return method; // Si no se encuentra la estructura esperada, devolver como está
        }).join('\n\n');
    }

    generateWebComponent({ name, templatePath, stylesPath, properties, methods }) {
        const html = fs.readFileSync(templatePath, 'utf8')
        const css = fs.readFileSync(stylesPath, 'utf8')
        
        const propertiesCode = this.getProperties({properties});
    
        const methodsCode = this.getMethods({methods});
        
        console.log(methodsCode);
    
        return `
    class ${name} extends HTMLElement {
        constructor(){
            super();
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.appendChild(this.#getStyles());
            this.shadowRoot.appendChild(this.#getTemplate().content.cloneNode(true));
        }
        
        #getTemplate(){
            const template = document.createElement('template');
            template.innerHTML = \`${html}\`;
            return template;
        }
    
        #getStyles(){
            const style = document.createElement('style');
            style.textContent = \`
                ${css}
            \`;
            return style;
        }
        
        connectedCallback(){
            console.log(\`${name} agregado al DOM\`);
        }
    
        disconnectedCallback(){
            console.log(\`${name} removido del DOM\`);
        }
    
        ${propertiesCode}
    
        ${methodsCode}
    }
    
    customElements.define('${name.toLowerCase()}', ${name});
        `;
    }

    generateComponents(inputFile) {
        const components = this.parseCommands(inputFile);
        components.forEach(component => {
            console.log('outputDir', this.outputDir);
            const outputPath = path.join(__dirname, this.outputDir,`${component.name}.js`);
            const componentCode = this.generateWebComponent(component);
            fs.writeFileSync(outputPath, componentCode);
            console.log(`Generated: ${outputPath}`);
        });
    }
}