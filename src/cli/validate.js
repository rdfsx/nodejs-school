import {ConfigError} from "../errors/config.js";

export function validateCountOfArgs() {
    for (let arg of ["-c", "-i", "-o", "--config", "--input", "--output"]){
        if (process.argv.filter(v => v === arg).length > 1) {
            throw new ConfigError(`Too many arguments: ${arg}\n`);
        }
    }
}