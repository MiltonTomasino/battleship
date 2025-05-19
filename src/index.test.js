import { sum } from "./index.js"


test("sum of a and b", () => {
    expect(sum(1, 3)).toBe(4);
})