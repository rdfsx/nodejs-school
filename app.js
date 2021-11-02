import {searchOption} from "./src/cli/parseOptions.js";

const config = searchOption("--config", "-c");
const input = searchOption("--input", "-i");
const output = searchOption("--output", "-o");
if (config) {
    console.log(config);
} else {
    process.stderr.write('Нету конфига!!!!');
}
if (input) {

} else if (!input) {

}
if (output) {

} else if (!output) {

}
