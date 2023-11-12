Keep all the test files in this directory. Name your test files with the `.test.js` suffix, matching the module or file you want to test. 

Before running the integration testing start the backend server with

```
npm run dev
```

Run tests with 
```
npm test
```
inside the back-end directory.

We are following Test-Driven Development (TDD) style guide for test codes. This guide emphasizes using `assert`-style assertions. For example:

```
import chai, { assert } from "chai";
import { yourFunctionToTest } from "../src/yourModule.js";

describe("Your Module Test Suite", () => {
  it("should perform a specific action", () => {
    const result = yourFunctionToTest();
    assert.equal(result, expectedValue);
  });

  it("should handle edge cases", () => {
    // Add your edge case tests here
  });
});
```

For reference [Official Assert Documentation](https://www.chaijs.com/api/assert/)


Use [`sinon`](https://www.npmjs.com/package/sinon) for stubs, mocks, and fakes. Use [`chaihttp`](https://www.chaijs.com/plugins/chai-http/) to simplify testing of express.js routes.

Also checkout the [dummy test file](./dummy.test.js) as working example of test file. 
