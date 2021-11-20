import {parseConfig} from "../src/cli/parse.js";
import {searchOption} from "../src/cli/options";


describe("Functions from the cli folder work correctly", () => {

    it("Parse config works correctly", (done) => {
        const config = parseConfig("C1-C0-A-R1-R0-A-R0-R0-C1-A");
        expect(config).toEqual(["C1", "C0", "A", "R1", "R0", "A", "R0", "R0", "C1", "A"]);
        done();
    });

    const CONFIG_CASES = [
        {args:
                ["node", "my_ciphering_cli", "-c", "A-A-A-R1-R0-R0-R0-C1-C1-A", "-i", "./input.txt", "-o", "./output.txt"],
            expected_input: "./input.txt",
            expected_output: "./output.txt",
            expected_config: "A-A-A-R1-R0-R0-R0-C1-C1-A"
        },
        {args:
                ["node", "my_ciphering_cli", "--config"],
            expected_input: null,
            expected_output: null,
            expected_config: null
        },
        {args:
                ["node", "my_ciphering_cli", "--config", "A-A-A-R1-R0-R0-R0-C1-C1-A"],
            expected_input: null,
            expected_output: null,
            expected_config: "A-A-A-R1-R0-R0-R0-C1-C1-A"
        },
    ]

    test.each(CONFIG_CASES)('Search for options works correctly', (
        {args, expected_input, expected_output, expected_config}) => {
        const config = searchOption("--config", "-c", args);
        const input = searchOption("--input", "-i", args);
        const output = searchOption("--output", "-o", args);
        expect(config).toBe(expected_config);
        expect(input).toBe(expected_input);
        expect(output).toBe(expected_output);
    });

});