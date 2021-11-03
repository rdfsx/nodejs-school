import {searchOption} from "./src/cli/options.js";
import {readFile, readStd} from "./src/read/reader.js";
import {writeFile, writeStd} from "./src/write/writer.js";
import {parseConfig} from "./src/cli/parse.js";
import {ConfigError} from "./src/errors/validation.js";

const config = searchOption("--config", "-c");
const input = searchOption("--input", "-i");
const output = searchOption("--output", "-o");
if (config && config.match(/^((?:(?:C|R)(?:0|1)|(?:A)))+([\-](?:(?:C|R)(?:0|1)|(?:A)))*$/)) {
    const configArray = parseConfig(config);

} else {
    throw new ConfigError("Не указан конфиг.");
}
if (input) {
    readFile();
} else if (!input) {
    readStd();
}
if (output) {
    writeFile();
} else if (!output) {
    writeStd();
}
