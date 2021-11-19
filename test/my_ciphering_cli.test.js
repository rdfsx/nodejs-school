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
