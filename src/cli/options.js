export function searchOption(full, alias){
    let indexFull;
    let indexAlias;
    if ((indexFull = process.argv.indexOf(full)) > 0) {
        if (!process.argv[indexFull + 1]) {
            return null;
        }
        return process.argv[indexFull + 1].toString();
    } else if ((indexAlias = process.argv.indexOf(alias)) > 0) {
        return process.argv[indexAlias + 1];
    }
    return null;
}
