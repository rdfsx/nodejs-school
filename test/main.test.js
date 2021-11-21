import {main} from "../index";
import fs from "fs";
import {searchOption} from "../src/cli/options";
import {ConfigError} from "../src/errors/config";


describe('Testing main function', () => {
    const INPUT_FILE = "./input.txt";
    const OUTPUT_FILE = "./output.txt";

    function writeInput() {
        fs.writeFileSync(INPUT_FILE, "This is secret. Message about \"_\" symbol!");
    }

    function clearOutput() {
        fs.open(OUTPUT_FILE, "w", () => {});
    }
    it('Should return the correct value', done => {
        writeInput();
        clearOutput();
        main(['node', 'my_ciphering_cli', '-c', 'C1-C1-R0-A', '-i', INPUT_FILE, '-o', OUTPUT_FILE], "", "", () => {
            const output = fs.readFileSync(OUTPUT_FILE, "utf8");
            expect(output).toBe("Myxn xn nbdobm. Tbnnfzb ferlm \"_\" nhteru!");
            done();
        });
    });

    it("Testing config error", done => {
        writeInput();
        clearOutput();
        try {
            main(['node', 'my_ciphering_cli', '-c', 'C1-C1-R0-A', '-c'], "", "", () => {});
        } catch (e) {
            expect(e).toBeInstanceOf(ConfigError);
            done();
        }
    });

    it("Testing Empty config error", done => {
        writeInput();
        clearOutput();
        try {
            main(['node', 'my_ciphering_cli', '-c'], "", "", () => {});
        } catch (e) {
            expect(e.message).toBe("Empty config!\n");
            done();
        }
    });

    it("Testing Invalid config error", done => {
        writeInput();
        clearOutput();
        try {
            main(['node', 'my_ciphering_cli', '-c', 'test'], "", "", () => {});
        } catch (e) {
            expect(e.message).toBe("Invalid config!\n");
            done();
        }
    });

    it("Testing Invalid input error", done => {
        writeInput();
        clearOutput();
        try {
            main(['node', 'my_ciphering_cli', '-c', 'A', '-i'], "", "", () => {});
        } catch (e) {
            expect(e.message).toBe("Invalid input!\n");
            done();
        }
    });

    it("Testing Invalid output error", done => {
        writeInput();
        clearOutput();
        try {
            main(['node', 'my_ciphering_cli', '-c', 'A', '-o'], "", "", () => {});
        } catch (e) {
            expect(e.message).toBe("Invalid output!\n");
            done();
        }
    });

    it("Testing Too many arguments error", done => {
        writeInput();
        clearOutput();
        try {
            main(['node', 'my_ciphering_cli', '-c', 'A', '-i', './input.txt', '-o', './output.txt', '-c'], "", "", () => {});
        } catch (e) {
            expect(e.message).toContain("Too many arguments");
            done();
        }
    });
});
