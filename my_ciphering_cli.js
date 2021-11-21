import {main} from "./index.js";

try {
    main(process.argv, process.stdin, process.stdout, () => {});
} catch (e) {
    process.stderr.write(e.message);
    process.exit(1);
}
