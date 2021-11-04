function processThis(input) {
    console.log(input);  //your code goes here
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
let _input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.pipe(process.stdout);

process.stdin.on("end", function () {
    processThis(_input);
});