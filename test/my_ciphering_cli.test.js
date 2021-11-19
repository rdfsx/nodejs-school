const { spawn } = require('child_process');

const CONFIG = "C1-C1-R0-A";

describe("Error Scenarios", () => {
  it("User passes the same cli argument twice;", (done) => {
    const cp = spawn('node', ['my_ciphering_cli', '-c', CONFIG, '-c', 'C0']);
    let res = '';
    cp.stderr.on('data', (chunk) => {
      res += chunk.toString();
    });
    cp.stderr.on('end', () => {
      res = res.trim();
      try {
        expect(res).toContain("Too many arguments:");
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it("User doesn't pass -c or --config argument;", (done) => {
    const cp = spawn('node', ['my_ciphering_cli']);
    let res = '';
    cp.stderr.on('data', (chunk) => {
      res += chunk.toString();
    });
    cp.stderr.on('end', () => {
      res = res.trim();
      try {
        expect(res).toBe("Empty config!");
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it("User passes -i argument with path that doesn't exist or with no read access;", (done) => {
    const cp = spawn('node', ['my_ciphering_cli', '-c', 'C0', '-i']);
    let res = '';
    cp.stderr.on('data', (chunk) => {
      res += chunk.toString();
    });
    cp.stderr.on('end', () => {
      res = res.trim();
      try {
        expect(res).toBe("Invalid input!");
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it("User passes -o argument with path to directory that doesn't exist or with no read access;",
      (done) => {
    const cp = spawn('node', ['my_ciphering_cli', '-c', 'C0', '-o']);
    let res = '';
    cp.stderr.on('data', (chunk) => {
      res += chunk.toString();
    });
    cp.stderr.on('end', () => {
      res = res.trim();
      try {
        expect(res).toBe("Invalid output!");
        done();
      } catch (e) {
        done(e);
      }
    });
  });
  it("User passes incorrent symbols in argument for --config;",
      (done) => {
        const cp = spawn('node', ['my_ciphering_cli', '-c', 'R6']);
        let res = '';
        cp.stderr.on('data', (chunk) => {
          res += chunk.toString();
        });
        cp.stderr.on('end', () => {
          res = res.trim();
          try {
            expect(res).toBe("Invalid config!");
            done();
          } catch (e) {
            done(e);
          }
        });
      });
});

describe("Success scenarios", () =>{

  function searchConfig(args){
    let indexFull;
    let indexAlias;
    if ((indexFull = args.indexOf("--config")) > 0) {
      if (!args[indexFull + 1]) {
        return null;
      }
      return args[indexFull + 1].toString();
    } else if ((indexAlias = args.indexOf("-c")) > 0) {
      return args[indexAlias + 1];
    }
    return null;
  }

  it("User passes correct sequence of symbols as argument for --config that matches regular expression;",
      (done) => {
    const ARGS = ['my_ciphering_cli', '-c', 'C0-R1-A', './input.txt'];
    const regex = /^((?:(?:C|R)(?:0|1)|(?:A)))+([\-](?:(?:C|R)(?:0|1)|(?:A)))*$/;
    let config = searchConfig(ARGS);
    expect(config).toMatch(regex);
    done();
  });
});
