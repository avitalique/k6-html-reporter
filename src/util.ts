export function calculatePassRate(passes: number, fails: number) {
  let passRate = (passes - fails) / passes * 100;
  if (!isFinite(passRate)) {
    passRate = 0;
  }
  return roundTwoDecimalPlaces(passRate);
}

export const compareNameAscending = (a, b): number => {
  if (a.name < b.name) {
    return -1;
  } else if (a.name > b.name) {
    return 1;
  } else {
    return 0;
  }
};

export function roundTwoDecimalPlaces(val: number) {
  return Math.round((val + Number.EPSILON) * 100) / 100;
}
