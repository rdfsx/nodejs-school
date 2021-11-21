import atbash from "../src/cipher/atbash";


it("Testing atbash", () => {
   expect(atbash("aBC-")).toBe("zYX-");
});