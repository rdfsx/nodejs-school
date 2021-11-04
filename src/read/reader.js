import {Readable} from "stream";
import fs from "fs";


export class ReadStream extends Readable {
    constructor(filename) {
        super();
        this.filename = filename;
        this.fd = null;
    }
    _construct(callback) {
        fs.open(this.filename, (err, fd) => {
            if (err) {
                callback(err);
            } else {
                this.fd = fd;
                callback();
            }
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


let myStream = new ReadStream("test.txt");
myStream.on('data', chunk => {
    console.log(chunk.toString());
});

