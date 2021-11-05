import {searchOption} from "./cli/options.js";
import {parseConfig} from "./cli/parse.js";
import {ConfigError} from "./errors/config.js";
import {MyReadable} from "./streams/read.js";
import {transformText} from "./streams/transform.js";
import {MyWritable} from "./streams/write.js";


function main() {
    const config = searchOption("--config", "-c");
    const input = searchOption("--input", "-i");
    const output = searchOption("--output", "-o");

    let readStream;
    let writeStream;
    let configArray;

    try {
        if (!config.match(/^((?:(?:C|R)(?:0|1)|(?:A)))+([\-](?:(?:C|R)(?:0|1)|(?:A)))*$/)) {
            throw new ConfigError("Неверный конфиг!\n");
        } else {
            configArray = parseConfig(config);
        }
        if (input) {
            readStream = new MyReadable(input);
        } else if (!input) {
            readStream = process.stdin;
        }
        if (output) {
            writeStream = new MyWritable(output);
        } else if (!output) {
            writeStream = process.stdout;
        }
    } catch (e) {
        if (e.code === 'ENOENT') {
            process.stderr.write("Невозможно найти файл ввода.");
        }
        process.stderr.write(e.message);
        process.exit(1);
    }
    transformText(configArray, readStream).pipe(writeStream);
}

main();
