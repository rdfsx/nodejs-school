import {ConfigError} from "../src/errors/config";
import {OpenFileError} from "../src/errors/files";
import {InputError} from "../src/errors/input";
import {OutputError} from "../src/errors/output";

describe("Testing errors", () => {
    it("Testing config error", done => {
        try {
            throw new ConfigError("Testing config error");
        } catch (e) {
            expect(e.message).toBe("Testing config error");
            done();
        }
    });

    it("Testing file error", done => {
        try {
            throw new OpenFileError("Testing file error");
        } catch (e) {
            expect(e.message).toBe("Testing file error");
            done();
        }
    });

    it("Testing input error", done => {
        try {
            throw new InputError("Testing input error");
        } catch (e) {
            expect(e.message).toBe("Testing input error");
            done();
        }
    });

    it("Testing output error", done => {
        try {
            throw new OutputError("Testing output error");
        } catch (e) {
            expect(e.message).toBe("Testing output error");
            done();
        }
    });
});