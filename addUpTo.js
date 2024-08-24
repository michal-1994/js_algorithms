/**
 * @format
 * This script measures and compares the performance of two methods for calculating the sum of numbers from 1 to n: an iterative approach and a mathematical formula. It reports execution times and checks result consistency.
 */

/**
 * Array of tested values for performance comparison.
 *
 * @const {number[]}
 */
const TESTED_VALUES = [
  1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000,
  9000000000,
];

/**
 * Measures the execution time of a function and returns the time and result.
 *
 * @param {Function} func - The function to measure.
 * @param {...*} args - The arguments to pass to the function.
 * @returns {{time: number, result: *}} - An object containing the execution time in seconds and the result of the function.
 */
const measureExecTime = (func, ...args) => {
  const start = performance.now();
  const result = func(...args);
  const end = performance.now();

  return {
    time: (end - start) / 1000,
    result,
  };
};

/**
 * Computes the sum of numbers from 1 to n using an iterative approach.
 *
 * @param {number} n - The upper bound of the summation.
 * @returns {number} - The sum of numbers from 1 to n.
 */
const sumIterative = (n) => {
  let total = 0;
  for (let i = 1; i <= n; i++) {
    total += i;
  }
  return total;
};

/**
 * Computes the sum of numbers from 1 to n using a mathematical formula.
 *
 * @param {number} n - The upper bound of the summation.
 * @returns {number} - The sum of numbers from 1 to n, calculated using the formula n * (n + 1) / 2.
 */
const sumFormula = (n) => {
  return (n * (n + 1)) / 2;
};

// Test each value in the TESTED_VALUES array.
TESTED_VALUES.forEach((N) => {
  console.log(`\n\x1b[36mTESTED VALUE: ${N}\x1b[0m`);

  const iterativeResult = measureExecTime(sumIterative, N);
  const formulaResult = measureExecTime(sumFormula, N);

  const timeDifference = (iterativeResult.time - formulaResult.time).toFixed(6);
  const fasterMethod = timeDifference > 0 ? "Formula" : "Iterative";

  console.log(
    `Time Difference: ${Math.abs(
      timeDifference
    )} seconds (${fasterMethod} is faster)`
  );

  if (iterativeResult.result !== formulaResult.result) {
    console.log(
      `\x1b[31mWARNING: Results different! Iterative: ${iterativeResult.result}, Formula: ${formulaResult.result}\x1b[0m`
    );
  } else {
    console.log(
      `\x1b[32mResults are consistent: ${iterativeResult.result}\x1b[0m`
    );
  }
});
