import {caesar} from "./caesar.js";

export function rot8Encode(message) {
    return caesar(8, message)
}

export function rot8Decode(message) {
    return caesar((26 - 8) % 26, message)
}
