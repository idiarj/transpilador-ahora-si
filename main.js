import { TralaleroTralala } from "./trans.js";

const wcTrans = new TralaleroTralala({outputDir: './components'});

wcTrans.generateComponents('./test.txt')
