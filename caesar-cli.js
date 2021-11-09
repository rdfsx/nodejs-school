import {searchOption} from "./src/cli/options.js";
import {parseConfig} from "./src/cli/parse.js";
import {ConfigError} from "./src/errors/config.js";
import {MyReadable} from "./src/streams/read.js";
import {transformText} from "./src/streams/transform.js";
import {MyWritable} from "./src/streams/write.js";
import {InputError} from "./src/errors/input.js";
import {OutputError} from "./src/errors/output.js";
import {validateCountOfArgs} from "./src/cli/validate.js";


function main() {
    const config = searchOption("--config", "-c");
    const input = searchOption("--input", "-i");
    const output = searchOption("--output", "-o");

    let readStream;
    let writeStream;
    let configArray;

    try {
        validateCountOfArgs();
        if (!config.match(/^((?:(?:C|R)(?:0|1)|(?:A)))+([\-](?:(?:C|R)(?:0|1)|(?:A)))*$/)) {
            throw new ConfigError("Invalid config!\n");
        } else {
            configArray = parseConfig(config);
        }
        if (input) {
            readStream = new MyReadable(input);
        } else if (input === null) {
            readStream = process.stdin;
        } else {
            throw new InputError("Invalid input!\n");
        }
        if (output) {
            writeStream = new MyWritable(output);
        } else if (output === null) {
            writeStream = process.stdout;
        } else {
            throw new OutputError("Invalid output!\n");
        }
    } catch (e) {
        process.stderr.write(e.message);
        process.exit(1);
    }

    transformText(configArray, readStream).pipe(writeStream);
}

main();
