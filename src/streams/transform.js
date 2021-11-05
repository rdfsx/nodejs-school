import {Transform} from "stream";
import {encoder} from "../cipher/encryptor.js";

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

export function transformText(config, stream) {
    for (let c of config) {
        stream = stream.pipe(new MyTransform(c));
    }
    return stream;
}