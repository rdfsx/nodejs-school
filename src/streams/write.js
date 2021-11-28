import {Writable} from "stream";
import fs from "fs";
import {OpenFileError} from "../errors/files.js";


export class MyWritable extends Writable {
    constructor(filename) {
        if (!fs.existsSync(filename)) {
            throw new OpenFileError(`Error open file for write: ${filename}\n`);
        }
        super();
        this.filename = filename;
    }
    _construct(callback) {
        fs.open(this.filename, "a", (err, fd) => {
            if (err) {
                callback(err);
            } else {
                this.fd = fd;
                callback();
            }
        });
    }
    _write(chunk, encoding, callback) {
        fs.write(this.fd, chunk, callback);
    }
    _destroy(err, callback) {
        if (this.fd) {
            fs.close(this.fd, (er) => callback(er || err));
        } else {
            callback(err);
        }
    }
}