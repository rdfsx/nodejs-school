export function searchOption(full, alias, args){
    let indexFull;
    let indexAlias;
    if ((indexFull = args.indexOf(full)) > 0) {
        if (!args[indexFull + 1]) {
            return null;
        }
        return args[indexFull + 1].toString();
    } else if ((indexAlias = args.indexOf(alias)) > 0) {
        return args[indexAlias + 1];
    }
    return null;
}
