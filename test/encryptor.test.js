import atbash from "../src/cipher/atbash";
import {encoder} from "../src/cipher/encryptor";
import * as caesar from "../src/cipher/caesar";
import * as rot8 from "../src/cipher/rot8";


jest.mock('../src/cipher/atbash', () => jest.fn());
jest.mock("../src/cipher/rot8");
jest.mock("../src/cipher/caesar");

it("Testing the encoder function", () => {
    atbash.mockImplementation((data) => data + " atbash");
    caesar.caesarEncode.mockImplementation((data) => data + " caesar 1");
    caesar.caesarDecode.mockImplementation((data) => data + " caesar 0");
    rot8.rot8Encode.mockImplementation((data) => data + " rot8 1");
    rot8.rot8Decode.mockImplementation((data) => data + " rot8 0");

    expect(encoder("A", "test")).toBe('test atbash');
    expect(encoder("C1", "test")).toBe('test caesar 1');
    expect(encoder("C0", "test")).toBe('test caesar 0');
    expect(encoder("R1", "test")).toBe('test rot8 1');
    expect(encoder("R0", "test")).toBe('test rot8 0');
});
