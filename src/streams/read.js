import {Readable} from "stream";
import fs from "fs";
import {OpenFileError} from "../errors/files.js";


export class MyReadable extends Readable {
    constructor(filename) {
        if (!fs.existsSync(filename)) {
            throw new OpenFileError(`Error open file for read: ${filename}\n`);
        }
        super();
        this.filename = filename;
        this.fd = null;
    }
    _construct(callback) {
        fs.open(this.filename, "r", (err, fd) => {
            this.fd = fd;
            callback();
        });
    }
    _read(n) {
        const buf = Buffer.alloc(n);
        fs.read(this.fd, buf, 0, n, null, (err, bytesRead) => {
            if (err) {
                this.destroy(err);
            } else {
                this.push(bytesRead > 0 ? buf.slice(0, bytesRead) : null);
            }
        });
    }
    _destroy(err, callback) {
        if (this.fd) {
            fs.close(this.fd, (er) => callback(er || err));
        } else {
            callback(err);
        }
    }
}