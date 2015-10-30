import fibonacci from '../../src/fibonacci';

describe('fibonacci', () => {
  let fib;
  beforeEach(() => {
    fibonacci.__Rewire__('throws', () => {});
    fib = fibonacci();
  });

  it('should return the correct sequence', () => {
    let [a, b, c, d, e, f, g] = fib;
    expect(a).to.eq(0);
    expect(b).to.eq(1);
    expect(c).to.eq(1);
    expect(d).to.eq(2);
    expect(e).to.eq(3);
    expect(f).to.eq(5);
    expect(g).to.eq(8);
  });

});
