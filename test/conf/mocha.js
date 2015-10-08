import chai      from 'chai';
import sinon     from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

global.expect = chai.expect;

let sandbox;

beforeEach(() => {
  sandbox = sinon.sandbox.create();
  global.stub = sandbox.stub.bind(sandbox);
  global.spy  = sandbox.spy.bind(sandbox);
});

afterEach(() => {
  delete global.stub;
  delete global.spy;
  sandbox.restore();
});
