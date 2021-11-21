const {MyWritable} = require("../src/streams/write");
const fs = require("fs");
const {OpenFileError} = require("../src/errors/files");
const {MyReadable} = require("../src/streams/read");


describe('Testing MyWritable stream', () => {

    const OUTPUT_FILE = "./output.txt";
    const INPUT_FILE = "./input.txt";

    function clearOutput() {
        fs.open(OUTPUT_FILE, "w", () => {});
    }

    function writeFile() {
        fs.writeFileSync(INPUT_FILE, "This is secret. Message about \"_\" symbol!");
    }

    it('should return writable stream', () => {
        clearOutput();
        const stream = new MyWritable(OUTPUT_FILE);
        expect(stream).toBeInstanceOf(MyWritable);
    })

    it('should return OpenFileError error', done => {
        try{
            new MyWritable("./file.txt");
        } catch (e) {
            expect(e).toBeInstanceOf(OpenFileError);
            done();
        }
    });

    it("Should write to file", done =>{
        writeFile();
        clearOutput();
        let readStream = new MyReadable("./input.txt");
        let writeStream = new MyWritable("./output.txt");
        readStream.pipe(writeStream);
        writeStream.on("finish", () => {
            let data = fs.readFileSync("./output.txt", "utf8");
            expect(data).toBe("This is secret. Message about \"_\" symbol!");
            done();
        });
    });

    it("Testing OpenFileError exception", done => {
        try {
            new MyWritable("./file.txt");
        } catch (e) {
            expect(e).toBeInstanceOf(OpenFileError);
            done();
        }
    });

    it("Testing another exceptions", done => {
        const stream = new MyWritable("test");
        stream.write("test");
        stream.on("error", (err) => {
            expect(err.message).toContain('EISDIR');
            done();
        });
    });
});