import {Transform} from "stream";
import {encoder} from "../cipher/encryptor.js";
import {parseConfig} from "../cli/parse.js";

export class MyTransform extends Transform {
    constructor(config) {
        super();
        this.config = config;
    }

    _transform(chunk, encoding, callback) {
        try {
            const resultString = encoder(this.config, chunk.toString());

            callback(null, resultString);
        } catch (err) {
            callback(err);
        }
    }
}

const config = parseConfig("C1-C1-R0-A");

function trans(input) {
    return new MyTransform(input);
}

process.stdin.resume();
let str = process.stdin;

function lol(wtf) {
    for (let c of config) {
        wtf = wtf.pipe(trans(c));
    }
    return wtf;
}

lol(str).pipe(process.stdout);
