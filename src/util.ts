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

export function humanizeBytes(bytes: number) {
  const units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const base = 1000;

  if (bytes < 10) {
    return bytes + ' B';
  }

  const i = Math.floor(Math.log(bytes) / Math.log(base));
  const suffix = units[i | 0];
  const val = Math.floor((bytes / Math.pow(base, i)) * 10 + 0.5) / 10;

  return val.toFixed(val < 10 ? 1 : 0) + ' ' + suffix;
}

export function humanizeDuration(dur: number) {
  if (dur === 0) {
    return '0s';
  }

  if (dur < 0.001) {
    // smaller than a microsecond, print nanoseconds
    return Math.trunc(dur * 1000000) + 'ns';
  }
  if (dur < 1) {
    // smaller than a millisecond, print microseconds
    return toFixedNoTrailingZerosTrunc(dur * 1000, 2) + 'µs';
  }
  if (dur < 1000) {
    // duration is smaller than a second
    return toFixedNoTrailingZerosTrunc(dur, 2) + 'ms';
  }

  let result = toFixedNoTrailingZerosTrunc((dur % 60000) / 1000, dur > 60000 ? 0 : 2) + 's';
  let rem = Math.trunc(dur / 60000);
  if (rem < 1) {
    // less than a minute
    return result;
  }
  result = (rem % 60) + 'm' + result;
  rem = Math.trunc(rem / 60);
  if (rem < 1) {
    // less than an hour
    return result;
  }
  return rem + 'h' + result;
}

export function roundTwoDecimalPlaces(val: number) {
  return Math.round((val + Number.EPSILON) * 100) / 100;
}

function toFixedNoTrailingZeros(val: number, prec: number) {
  return parseFloat(val.toFixed(prec)).toString();
}

function toFixedNoTrailingZerosTrunc(val: number, prec: number) {
  const mult = Math.pow(10, prec);
  return toFixedNoTrailingZeros(Math.trunc(mult * val) / mult, prec);
}
