import { AccountNumberValidator } from '../accountNumberValidator';
import { BankAccount } from '../bankAccount';
const chai = require('chai');

describe('validator suite', () => {
  describe('validate()', () => {
    const fakeAccountNumbers = [
      '9420, 417 23 85',
    ];
    const expectations = <BankAccount[]>[
      { account_number: '4172385', clearing_number: '9420' }
    ];

    it('should validate correct account numbers', () => {
      fakeAccountNumbers.forEach((accountNumber, i) => {
        const result = AccountNumberValidator.validate(accountNumber);

        let expect = expectations[i];
        chai.assert.strictEqual(expect.clearing_number, result.clearing_number);
        chai.assert.strictEqual(expect.account_number, result.account_number);
      });
    });
  });
});
