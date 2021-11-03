export function caesar(shift, message) {
    let output = '';
    for (let i = 0; i < message.length; i++) {
        let c = message.charCodeAt(i);
        if (c >= 65 && c <=  90) {
            output += String.fromCharCode((c - 65 + shift) % 26 + 65)
        }
        else if (c >= 97 && c <= 122) {
            output += String.fromCharCode((c - 97 + shift) % 26 + 97)
        }
        else {
            output += message.charAt(i)
        }
    }
    return output
}

export function caesarEncode(message) {
    return caesar(1, message)
}

export function caesarDecode(message) {
    return caesar((26 - 1) % 26, message)
}
