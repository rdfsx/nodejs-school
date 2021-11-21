export class OutputError extends Error {
    constructor(message) {
        super(message);
        this.name = "OutputError";
    }
}