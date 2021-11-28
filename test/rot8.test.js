import {rot8Encode, rot8Decode} from "../src/cipher/rot8";
import {caesar} from "../src/cipher/caesar";

jest.mock("../src/cipher/caesar");

describe("Testing rot8 module", () => {
    it("Testing rot8 Encoder & Decoder", () =>{
        caesar.mockImplementation((shift, message) => `${shift}${message}`);
        expect(rot8Encode("test")).toBe("8test");
        expect(rot8Decode("test")).toBe("18test");
    });
});