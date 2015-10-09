import Another from './another';

const MyLibrary = {
  anotherFn: Another.anotherFn,
  mainFn() {
    return 'hello';
  }
};

export var fibonacci = {
  [Symbol.iterator]: function*() {
    let pre = 0, cur = 1;
    for (;;) {
      let temp = pre;
      pre = cur;
      cur += temp;
      yield cur;
    }
  }
};

export default MyLibrary;
