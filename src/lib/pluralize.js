export function pluralize(count, one, other) {
  return Number(count) === 1 ? one : other;
}
