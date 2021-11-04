import atbash from "./atbash.js";
import {caesarDecode, caesarEncode} from "./caesar.js";
import {rot8Decode, rot8Encode} from "./rot8.js";

export function encoder(cipher, data) {
    switch (cipher) {
        case "C1":
            data = caesarEncode(data);
            break;
        case "C0":
            data = caesarDecode(data);
            break;
        case "R1":
            data = rot8Encode(data);
            break;
        case "R0":
            data = rot8Decode(data);
            break;
        case "A":
            data = atbash(data);
            break;
    }
    return data;
}
