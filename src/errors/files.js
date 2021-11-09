export class OpenFileError extends Error {
    constructor(message) {
        super(message);
        this.name = "OpenFileError";
    }
}
