import fs from 'fs';
import path from 'path';

export class Trans {

    constructor({output}) {
        this.output = output;
    }   


    generateWebComponent({name, tagName, template, styles}) {
        try {
            const webComponentTemplate = `
class ${name} extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const templateContent = document.createElement('template');
        templateContent.innerHTML = \`${template}\`;
        shadow.appendChild(templateContent.content.cloneNode(true));
    }
    connectedCallback() {
        const style = document.createElement('style');
        style.textContent = \`${styles}\`;
        this.shadowRoot.appendChild(style);
    }

    disconnectedCallback() {
        // Cleanup if needed
    }
}

customElements.define('${tagName}', ${name});
`;
            const filePath = path.join(this.output, `${name}.js`);
            fs.writeFileSync(filePath, webComponentTemplate, 'utf8');
            console.log(`Web component ${name} generated successfully at ${filePath}`);
            return;
        } catch (error) {
            console.error(`Error generating web component: ${error.message}`);
        }
    }


    parseLine(line) {
        const parts = line.split(' ');
        const command = parts[0];
        const args = parts.slice(1);
        console.log('El comando es:', command);
        console.log('Los argumentos son:', args);
        return { command, args };
    }


    execCommand({command, args}) {
        let template = '';
        let styles = '';
        let tagName = ''
        switch (command) {
            case '@generate':


                const [name, templatePath, stylesPath] = args;
                console.log(templatePath);
                console.log(stylesPath);
                if(templatePath){
                    template = fs.readFileSync(templatePath, 'utf8');
                    
                    console.log(template);
                }
                if(stylesPath){
                    styles = fs.readFileSync(stylesPath, 'utf8');
                    console.log(styles);
                }

                if(!tagName) {
                    tagName = name;
                }
                this.generateWebComponent({ name, tagName, template, styles });
                break;
            case '@template':
                // Handle template command
                break;
            case '@styles':
                // Handle styles command
                break;
            default:
                console.error(`Unknown command: ${command}`);
        }
    }




}