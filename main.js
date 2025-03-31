import fs from 'fs';
import readline from 'readline/promises';
import { Trans } from './trans.js';


const wcTrans = new Trans({ output: './components/' });


const readFile = async (filePath) => {
    try {
        console.log(filePath)
        const fileStream = fs.createReadStream(filePath);
        const rl = readline.createInterface({ input: fileStream, output: process.stdout, crlfDelay: Infinity });
        for await (const line of rl) {
            const {command, args} = wcTrans.parseLine(line);
            wcTrans.execCommand({command, args});
        }
        rl.close();
        fileStream.close();
        console.log('File reading completed.');
    } catch (error) {
        console.error(`Error reading file: ${error.message}`);
    }
}

await readFile('./test.js');



