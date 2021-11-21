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

    it('Should return Readable stream', () => {
        clearOutput();
        const stream = new MyReadable(OUTPUT_FILE);
        expect(stream).toBeInstanceOf(MyReadable);
    })

    it('Should return OpenFileError error', done => {
        try{
            new MyReadable("./file.txt");
        } catch (e) {
            expect(e).toBeInstanceOf(OpenFileError);
            done();
        }
    });

    it("Should read from file", done =>{
        writeFile();
        clearOutput();
        let result = "";
        const readStream = new MyReadable("./input.txt");
        readStream.on("data", data => {
            result += data;
        });
        readStream.on("end", () => {
            expect(result).toBe("This is secret. Message about \"_\" symbol!");
            done();
        });
    });

    it("Should return OpenFileError exception", done => {
        try {
            new MyReadable("./file.txt");
        } catch (e) {
            expect(e).toBeInstanceOf(OpenFileError);
            done();
        }
    });
});