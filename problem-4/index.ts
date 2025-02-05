// Time Complexity: O(n) - Linear time as we need to iterate through all numbers from 1 to n
function sum_to_n_a(n: number): number {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
      sum += i;
  }
  return sum;
}

// Time Complexity: O(1) - Constant time as it uses a direct formula
function sum_to_n_b(n: number): number {
  return (n * (n + 1)) / 2;
}

// Time Complexity: O(n) - Linear time as we make n recursive calls
function sum_to_n_c(n: number): number {
  if (n <= 1) return n;
  return n + sum_to_n_c(n - 1);
}

function main() {
  console.log(sum_to_n_a(100));
  console.log(sum_to_n_b(100));
  console.log(sum_to_n_c(100));
}

main();