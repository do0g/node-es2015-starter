export default function*() {
  let cur = 0, next = 1;
  for (;;) {
    yield cur;
    [cur, next] = [next, cur + next];
  }
}
