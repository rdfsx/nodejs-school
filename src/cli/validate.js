import {ConfigError} from "../errors/config.js";

export function validateCountOfArgs(args) {
    for (let i = 0;i < args.length; i++) {
        switch (args[i]) {
            case "--config":
                args[i] = "-c";
                break;
            case "--input":
                args[i] = "-i";
                break;
            case "--output":
                args[i] = "-o";
                break;
        }
    }
    for (let arg of ["-c", "-i", "-o", "--config", "--input", "--output"]){
        if (args.filter(v => v === arg).length > 1) {
            throw new ConfigError(`Too many arguments: ${arg}\n`);
        }
    }
}