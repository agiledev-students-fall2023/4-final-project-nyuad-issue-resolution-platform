import chai from 'chai';
import { expect } from 'chai';

describe('Sample Test Suite', () => {
    it('should pass this test', () => {
        expect(1 + 1).to.equal(2);
    });

    it('should fail this test', () => {
        expect(2 * 2).to.equal(5);
    });
});