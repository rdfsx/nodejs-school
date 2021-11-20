const { parseConfig } = require("../src/cli/parse");

describe("Functions from the cli folder work correctly", () => {
    it("Parse config works correctly", (done) => {
        const config = parseConfig("C1-C0-A-R1-R0-A-R0-R0-C1-A");
        expect(config).toBe(["C1", "C0", "A", "R1", "R0", "A", "R0", "R0", "C1", "A"]);
    });
});