export default function atbash(message) {
    let output = '';
    for (let i = 0; i < message.length; i++) {
        let c = message.charCodeAt(i);
        if (c >= 65 && c <=  90) {
            let pos = c - 65;
            pos = 25 - pos;
            let ascii = pos + 65;
            output += String.fromCharCode(ascii)
        }
        else if (c >= 97 && c <= 122) {
            let pos = c - 97;
            pos = 25 - pos;
            let ascii = pos + 97;
            output += String.fromCharCode(ascii)
        }
        else {
            output += message.charAt(i)
        }
    }
    return output
}
