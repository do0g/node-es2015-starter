import throws from './throws';

export default function*() {
  throws();

  let cur = 0, next = 1;
  for (;;) {
    yield cur;
    [cur, next] = [next, cur + next];
  }
}
