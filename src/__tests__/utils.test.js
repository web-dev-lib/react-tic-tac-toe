import { calculateWinner } from "utils";

it("null test", () => {
  expect(calculateWinner(Array(9).fill(null))).toEqual(null);
});

it("Winner test", () => {
  expect(
    calculateWinner(["x", "x", "x", "o", "o", null, null, null, null])
  ).toEqual("x");
});

it("Draw test", () => {
  expect(
    calculateWinner(["x", "0", "x", "o", "o", "x", "x", "x", "o"])
  ).toEqual("It's a draw!");
});
