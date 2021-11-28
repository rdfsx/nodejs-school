import {caesarEncode, caesarDecode, caesar} from "../src/cipher/caesar";

describe("Testing caesar module", () => {
    it("Testing caesar cipher", () => {
        expect(caesar(1, "abC-")).toBe("bcD-");
    });
    it("Testing caesar Encoder & Decoder", () =>{
        expect(caesarEncode("tesT-")).toBe("uftU-");
        expect(caesarDecode("uftU-")).toBe("tesT-");
    });
});