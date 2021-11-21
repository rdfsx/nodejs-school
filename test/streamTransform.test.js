import fs from "fs";
import {MyReadable} from "../src/streams/read";
import {OpenFileError} from "../src/errors/files";
import {MyTransform, transformText} from "../src/streams/transform";
import {MyWritable} from "../src/streams/write";

describe('Testing MyTransform stream', () => {

    const OUTPUT_FILE = "./output.txt";
    const INPUT_FILE = "./input.txt";

    function clearOutput() {
        fs.open(OUTPUT_FILE, "w", () => {});
    }

    function writeFile() {
        fs.writeFileSync(INPUT_FILE, "This is secret. Message about \"_\" symbol!");
    }

    it('Should return Transform stream', () => {
        clearOutput();
        const stream = new MyTransform("C1");
        expect(stream).toBeInstanceOf(MyTransform);
    })

    it('Should transform text', done => {
        clearOutput();
        writeFile();
        const readStream = new MyReadable("./input.txt");
        const writeStream = new MyWritable("./output.txt");
        transformText(["C1", "C1", "R0", "A"], readStream).pipe(writeStream);
        writeStream.on("finish", () => {
            const data = fs.readFileSync(OUTPUT_FILE, "utf8");
            expect(data).toBe("Myxn xn nbdobm. Tbnnfzb ferlm \"_\" nhteru!");
            done();
        });
    });
});