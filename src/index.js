import Another from './another';

const MyLibrary = {
  anotherFn: Another.anotherFn,
  mainFn() {
    return 'hello';
  }
};

var fibonacci = {
  [Symbol.iterator]: function*() {
    var pre = 0, cur = 1;
    for (;;) {
      var temp = pre;
      pre = cur;
      cur += temp;
      yield cur;
    }
  }
}

export default MyLibrary;
